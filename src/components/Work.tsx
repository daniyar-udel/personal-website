const jobs = [
  {
    company: "TreeRoute",
    role: "Technical Co-Founder",
    period: "Mar 2026 – Present",
    location: "New York / Remote",
    current: true,
    bullets: [
      "Shipped a production AI application in 18 hours - won Google Build With AI Hackathon 2026 at NYU Tandon (150 teams, 600 participants) and co-founded TreeRoute from the winning prototype.",
      "Built a Gemini 2.5 Flash agentic pipeline using Google ADK and GenAI SDK, accelerated with Claude Code and Codex; grounded recommendations on 700K+ NYC tree records with real-time tool-calling across Maps, Routes, Pollen, and Weather.",
      "Achieved sub-2-second response times in production by designing agent architecture and deploying backend on Google Cloud.",
    ],
  },
  {
    company: "University of Delaware",
    role: "Research Assistant",
    period: "Aug 2024 – Present",
    location: "Newark, Delaware",
    current: true,
    bullets: [
      "Cut GPU inference runtime from 3,745s to 1.06s per ensemble (3,500x speedup), enabling near-real-time climate reconstruction.",
      "Achieved 62% lower RMSE vs kriging (0.144K vs 0.378K) by developing a distance-aware GATv2 imputation pipeline in PyTorch Geometric for CMIP6 climate data across 2,664 grid cells.",
      "Ran ablation experiments across 9 GATv2 architectures, narrowing the gap to GraphEM to 1% and identifying land-ocean features and multi-head attention as the most impactful design choices.",
    ],
  },
  {
    company: "Bank CenterCredit",
    role: "Machine Learning Engineer",
    period: "Dec 2022 – Aug 2024",
    location: "Almaty, Kazakhstan",
    current: false,
    bullets: [
      "Built and deployed a customer-facing Voice AI Agent automating 90% of debt collection outbound calls; gathered operator feedback, presented results to stakeholders, and led technical demos for partner banks that adopted the solution.",
      "Lifted credit scoring Gini 10-15% and KPI 5-10% by owning end-to-end ML delivery across production deployments.",
      "Reduced customer query resolution time 30-50% by building and deploying a LangGraph AI Agent with RAG, memory, and tool-calling, used by 250+ operators bank-wide during live customer calls.",
      "Cut manual review time 25-45% by productionizing an LLM document summarization agent across high-volume internal flows.",
    ],
  },
  {
    company: "Kazakhtelecom",
    role: "Data Science Intern",
    period: "Jun 2022 – Dec 2022",
    location: "Almaty, Kazakhstan",
    current: false,
    bullets: [
      "Reduced customer churn by 8% by building a decision tree on 120K+ customer records to identify the top 5 drivers of churn.",
      "Engineered customer-profiling datasets in BigQuery SQL across production tables, enabling targeted marketing campaigns that increased response rates by 15%.",
    ],
  },
];

export default function Work() {
  return (
    <section id="experience" className="py-24 px-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <p className="text-green-600 font-semibold text-sm uppercase tracking-widest mb-2">
          Experience
        </p>
        <h2 className="text-3xl font-bold text-gray-900 mb-10">Work History</h2>

        <div className="relative border-l-2 border-gray-100 pl-8 space-y-12">
          {jobs.map((job, i) => (
            <div key={i} className="relative">
              <div
                className={`absolute -left-[41px] w-4 h-4 rounded-full border-2 border-white ring-2 ${
                  job.current
                    ? "bg-green-600 ring-green-100"
                    : "bg-gray-300 ring-gray-100"
                }`}
              />

              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-3">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{job.company}</h3>
                  <p className="text-gray-600 text-sm font-medium">{job.role}</p>
                  <p className="text-gray-500 text-sm">{job.location}</p>
                </div>
                <div className="shrink-0 flex items-center gap-2">
                  <span className="text-sm text-gray-500">{job.period}</span>
                  {job.current && (
                    <span className="px-2 py-0.5 bg-green-50 text-green-700 text-xs font-semibold rounded-full">
                      Current
                    </span>
                  )}
                </div>
              </div>

              <ul className="space-y-2">
                {job.bullets.map((b, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="w-1 h-1 rounded-full bg-gray-400 shrink-0 mt-2" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
