import sys
sys.stdout.reconfigure(encoding='utf-8')

from docx import Document
from docx.shared import Pt, Inches, RGBColor, Emu
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.oxml.ns import qn
from docx.oxml import OxmlElement
from docx.opc.constants import RELATIONSHIP_TYPE as RT

# ── helpers ──────────────────────────────────────────────────────────────────

BODY_PT   = 9.5   # all body text
HDR_PT    = 10.0  # section headers
COMP_PT   = 10.0  # company name in table
NAME_PT   = 20.0  # name

COL0 = Emu(4754880)
COL1 = Emu(2103120)

# Bullet hanging indent (matching original)
BULL_LEFT   = Emu(155575)
BULL_HANG   = Emu(-109855)


def set_table_no_borders(table):
    tbl  = table._tbl
    tblPr = tbl.find(qn('w:tblPr'))
    if tblPr is None:
        tblPr = OxmlElement('w:tblPr')
        tbl.insert(0, tblPr)
    ex = tblPr.find(qn('w:tblBorders'))
    if ex is not None:
        tblPr.remove(ex)
    borders = OxmlElement('w:tblBorders')
    for name in ('top','left','bottom','right','insideH','insideV'):
        b = OxmlElement(f'w:{name}')
        b.set(qn('w:val'), 'none'); b.set(qn('w:sz'), '0')
        b.set(qn('w:space'), '0'); b.set(qn('w:color'), 'auto')
        borders.append(b)
    tblPr.append(borders)


def xml_spacing(para, before_twips, after_twips):
    """Set paragraph spacing precisely via XML (1 pt = 20 twips)."""
    pPr = para._p.get_or_add_pPr()
    for old in pPr.findall(qn('w:spacing')):
        pPr.remove(old)
    sp = OxmlElement('w:spacing')
    sp.set(qn('w:before'), str(before_twips))
    sp.set(qn('w:after'),  str(after_twips))
    sp.set(qn('w:line'),   '240')
    sp.set(qn('w:lineRule'), 'auto')
    pPr.append(sp)


def add_section_header(doc, text):
    """Bold section header with bottom border."""
    p = doc.add_paragraph()
    pPr = p._p.get_or_add_pPr()

    pPr.append(OxmlElement('w:keepNext'))

    bdr = OxmlElement('w:pBdr')
    bot = OxmlElement('w:bottom')
    bot.set(qn('w:val'), 'single'); bot.set(qn('w:sz'), '6')
    bot.set(qn('w:space'), '2');    bot.set(qn('w:color'), '000000')
    bdr.append(bot); pPr.append(bdr)

    xml_spacing(p, before_twips=60, after_twips=20)  # 3 pt / 1 pt

    r = p.add_run(text)
    r.bold = True
    r.font.size = Pt(HDR_PT)
    r.font.color.rgb = RGBColor(0, 0, 0)
    return p


def add_job_table(doc, company, dates, role, location):
    table = doc.add_table(rows=2, cols=2)
    set_table_no_borders(table)
    for row in table.rows:
        row.cells[0].width = COL0
        row.cells[1].width = COL1

    # row 0 — company | dates
    p00 = table.rows[0].cells[0].paragraphs[0]
    xml_spacing(p00, before_twips=50, after_twips=0)   # 2.5 pt before
    r = p00.add_run(company); r.bold = True; r.font.size = Pt(COMP_PT)

    p01 = table.rows[0].cells[1].paragraphs[0]
    p01.alignment = WD_ALIGN_PARAGRAPH.RIGHT
    xml_spacing(p01, before_twips=50, after_twips=0)
    p01.add_run(dates).font.size = Pt(BODY_PT)

    # row 1 — role | location
    p10 = table.rows[1].cells[0].paragraphs[0]
    xml_spacing(p10, before_twips=0, after_twips=0)
    p10.add_run(role).font.size = Pt(BODY_PT)

    p11 = table.rows[1].cells[1].paragraphs[0]
    p11.alignment = WD_ALIGN_PARAGRAPH.RIGHT
    xml_spacing(p11, before_twips=0, after_twips=0)
    p11.add_run(location).font.size = Pt(BODY_PT)

    return table


def bullet(doc, segments, last=False):
    """
    segments = list of (text, bold).
    First segment must start with '•  '.
    """
    p = doc.add_paragraph()
    pf = p.paragraph_format
    pf.left_indent       = BULL_LEFT
    pf.first_line_indent = BULL_HANG
    after = 16 if last else 0   # 0.8 pt gap only after last bullet in a group
    xml_spacing(p, before_twips=0, after_twips=after)
    for text, bold in segments:
        r = p.add_run(text)
        r.font.size = Pt(BODY_PT)
        if bold:
            r.bold = True
            r.font.color.rgb = RGBColor(0, 0, 0)
    return p


def add_hyperlink(para, text, url, bold=False, font_size_pt=BODY_PT):
    """Append a blue-underline hyperlink run to an existing paragraph."""
    r_id = para.part.relate_to(url, RT.HYPERLINK, is_external=True)
    hl = OxmlElement('w:hyperlink')
    hl.set('{http://schemas.openxmlformats.org/officeDocument/2006/relationships}id', r_id)

    run_e = OxmlElement('w:r')
    rPr   = OxmlElement('w:rPr')

    col = OxmlElement('w:color')
    col.set(qn('w:val'), '0563C1')
    rPr.append(col)

    u = OxmlElement('w:u')
    u.set(qn('w:val'), 'single')
    rPr.append(u)

    sz = OxmlElement('w:sz')
    sz.set(qn('w:val'), str(int(font_size_pt * 2)))
    rPr.append(sz)

    if bold:
        rPr.append(OxmlElement('w:b'))

    run_e.append(rPr)
    t = OxmlElement('w:t')
    t.text = text
    run_e.append(t)
    hl.append(run_e)
    para._p.append(hl)
    return hl


def plain_run(para, text, bold=False, size_pt=BODY_PT, color=None):
    r = para.add_run(text)
    r.font.size = Pt(size_pt)
    if bold:
        r.bold = True
    if color:
        r.font.color.rgb = color
    return r


# ── build ─────────────────────────────────────────────────────────────────────

doc = Document()

# page margins
sec = doc.sections[0]
sec.left_margin   = Inches(0.50)
sec.right_margin  = Inches(0.50)
sec.top_margin    = Inches(0.35)
sec.bottom_margin = Inches(0.35)

doc.styles['Normal'].font.name = 'Arial'
doc.styles['Normal'].font.size = Pt(BODY_PT)

# ── NAME ──────────────────────────────────────────────────────────────────────
p = doc.add_paragraph()
xml_spacing(p, 0, 0)
r = p.add_run('Daniyar Abykhanov')
r.bold = True; r.font.size = Pt(NAME_PT); r.font.color.rgb = RGBColor(0,0,0)

# ── CONTACT ───────────────────────────────────────────────────────────────────
p = doc.add_paragraph()
xml_spacing(p, before_twips=16, after_twips=10)

plain_run(p, '+1 302 722 1995  |  daniyar@udel.edu  |  ', size_pt=BODY_PT)
add_hyperlink(p, 'LinkedIn',  'https://www.linkedin.com/in/daniyarabykhanov/')
plain_run(p, '  |  ', size_pt=BODY_PT)
add_hyperlink(p, 'GitHub',    'https://github.com/daniyar-udel')
plain_run(p, '  |  ', size_pt=BODY_PT)
add_hyperlink(p, 'Portfolio', 'https://personal-website-nu-three-23.vercel.app')

# ── SUMMARY ───────────────────────────────────────────────────────────────────
add_section_header(doc, 'Summary')

p = doc.add_paragraph()
xml_spacing(p, before_twips=0, after_twips=0)
for text, bold in [
    ('ML/AI Engineer with 2+ years building and shipping production ML systems - ', False),
    ('credit modeling, LLM pipelines, and automated ML workflows', True),
    ('. Delivered measurable impact across all systems: ', False),
    ('+10-15% Gini, -30-50% lookup time, -40-60% iteration time', True),
    ('. Google Build With AI Hackathon 2026 Winner. ', False),
    ('Python, PyTorch, SQL, FastAPI', True),
    (', and modern LLM orchestration.', False),
]:
    r = p.add_run(text)
    r.font.size = Pt(BODY_PT)
    if bold:
        r.bold = True; r.font.color.rgb = RGBColor(0,0,0)

# ── WORK EXPERIENCE ───────────────────────────────────────────────────────────
add_section_header(doc, 'Work Experience')

# --- TreeRoute ---
tree_tbl = add_job_table(doc, 'TreeRoute', 'Jan 2026 - Present', 'Technical Co-Founder', 'New York / Remote')
p_company = tree_tbl.rows[0].cells[0].paragraphs[0]
plain_run(p_company, '  |  ', size_pt=BODY_PT)
add_hyperlink(p_company, 'Live Demo',
              'https://treeroute-501252220143.us-central1.run.app/',
              font_size_pt=BODY_PT)

bullet(doc, [
    ('•  ', False),
    ('Won Google Build With AI Hackathon 2026 @ NYU Tandon', True),
    (' - building the winning app into a production-grade AI product.', False),
])
bullet(doc, [
    ('•  ', False),
    ('Built a tool-calling LLM pipeline', True),
    (' (Gemini 2.5 Flash) integrating 4 real-time APIs (Maps, Routes, Pollen, Weather)'
     ' for pollen-aware route scoring and grounded recommendations.', False),
])
bullet(doc, [
    ('•  ', False),
    ('Led end-to-end AI product development', True),
    (' as Technical Co-Founder - agent orchestration, backend infrastructure,'
     ' and production deployment.', False),
], last=True)

# --- University of Delaware - Research Assistant ---
add_job_table(doc, 'University of Delaware', 'Aug 2024 - Present',
              'Research Assistant', 'Newark, Delaware')
bullet(doc, [
    ('•  ', False),
    ('Developed and optimized a GATv2-based imputation pipeline', True),
    (' in PyTorch Geometric on CMIP6 spatio-temporal data - ', False),
    ('62% lower RMSE vs kriging', True),
    (' (0.144K vs 0.378K).', False),
])
bullet(doc, [
    ('•  ', False),
    ('Ran ablation experiments across 9 architectures', True),
    (' to identify highest-impact modeling choices - narrowed gap to GraphEM'
     ' to within 1%; land-ocean features and multi-head attention most impactful.', False),
])
bullet(doc, [
    ('•  ', False),
    ('Optimized GPU inference', True),
    (' to reduce runtime from ', False),
    ('3,745s to 1.06s per ensemble (3,533x)', True),
    (', enabling near-real-time climate field reconstruction.', False),
], last=True)

# --- Bank CenterCredit ---
bcc_tbl = add_job_table(doc, 'Bank CenterCredit', 'Dec 2022 - Aug 2024',
              'Machine Learning Engineer', 'Almaty, Kazakhstan')
plain_run(bcc_tbl.rows[0].cells[0].paragraphs[0],
          ' (largest bank in Central Asia)', size_pt=BODY_PT - 0.5)
bullet(doc, [
    ('•  ', False),
    ('Owned end-to-end ML delivery', True),
    (' - lifted credit scoring ', False),
    ('Gini 10-15%', True),
    (' and KPI 5-10% across production deployments.', False),
])
bullet(doc, [
    ('•  ', False),
    ('Built automated ML pipeline', True),
    (' (LightGBM, SHAP, Airflow, MLflow) - cut iteration time ', False),
    ('40-60%', True),
    (' from raw data to monitored production models.', False),
])
bullet(doc, [
    ('•  ', False),
    ('Built and productionized an internal LLM retrieval system', True),
    (' with tool-calling workflows - reduced call center lookup time ', False),
    ('30-50%', True),
    (' across daily operations.', False),
])
bullet(doc, [
    ('•  ', False),
    ('Productionized LLM document summarization agent', True),
    (' - freed up ', False),
    ('25-45%', True),
    (' of manual review time across high-volume internal flows.', False),
], last=True)


# ── EDUCATION ─────────────────────────────────────────────────────────────────
add_section_header(doc, 'Education')
add_job_table(doc, 'University of Delaware', 'Aug 2024 - May 2026',
              'Master of Science, Data Science  |  GPA: 3.7', 'Newark, Delaware')

# ── PROJECTS ──────────────────────────────────────────────────────────────────
add_section_header(doc, 'Projects')

# Knowledge Copilot
p = doc.add_paragraph()
xml_spacing(p, before_twips=40, after_twips=8)
plain_run(p, 'Knowledge Copilot', bold=True, size_pt=BODY_PT)

bullet(doc, [
    ('•  ', False),
    ('Built an end-to-end LLM Q&A system', True),
    (' - hybrid retrieval (vector + BM25), streaming answers,'
     ' and grounded source citations with full traceability over PDFs.', False),
])
bullet(doc, [
    ('•  ', False),
    ('Instrumented evaluation pipeline', True),
    (': feedback capture, latency tracking, and metrics dashboard'
     ' (top queries, response quality); deployed via Docker Compose.', False),
], last=True)

# Financial Planning Advisor
p = doc.add_paragraph()
xml_spacing(p, before_twips=40, after_twips=8)
plain_run(p, 'Financial Planning Advisor', bold=True, size_pt=BODY_PT)
plain_run(p, '  |  ', size_pt=BODY_PT)
add_hyperlink(p, 'Live Demo',
              'https://vivacious-imagination-production-f472.up.railway.app/invest',
              bold=False)

bullet(doc, [
    ('•  ', False),
    ('Built a full-stack AI investment system', True),
    (' - LangGraph orchestration with risk profiling, KMeans market-regime detection,'
     ' and 10K Monte Carlo simulations.', False),
])
bullet(doc, [
    ('•  ', False),
    ('React + TypeScript frontend with FastAPI backend', True),
    (' - JWT auth, SQLite, live market data, and streamed tool-use traces.', False),
], last=True)

# ── SKILLS ────────────────────────────────────────────────────────────────────
add_section_header(doc, 'Skills')

for label, value in [
    ('Languages: ',          'Python, SQL, TypeScript'),
    ('ML / AI: ',            'PyTorch, scikit-learn, LightGBM, XGBoost, Transformers,'
                              ' LangGraph, LangChain, RAG, NLP, PyTorch Geometric'),
    ('Deployment / MLOps: ', 'FastAPI, Docker, Airflow, MLflow, CI/CD, AWS, Google Cloud'),
    ('Data / Analytics: ',   'Pandas, NumPy'),
    ('Frontend: ',           'React, Next.js, Tailwind CSS'),
    ('Methods: ',            'Feature engineering, model validation, A/B testing,'
                              ' anomaly detection, experiment design, time series'),
]:
    p = doc.add_paragraph()
    xml_spacing(p, before_twips=0, after_twips=0)
    plain_run(p, '• ' + label, bold=True, size_pt=BODY_PT, color=RGBColor(0,0,0))
    plain_run(p, value, size_pt=BODY_PT)

doc.save('Daniyar_Abykhanov_CV_v7.docx')
print('Saved: Daniyar_Abykhanov_CV_v7.docx')
