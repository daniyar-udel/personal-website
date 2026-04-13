const jobs = [
  {
    company: "TreeRoute",
    role: "Technical Co-Founder",
    period: "Mar 2026 – Present",
    location: "New York / Remote",
    current: true,
    bullets: [
      "Won Google Build With AI Hackathon 2026 at NYU Tandon and continued development of the winning route-planning product into a production-ready AI application.",
      "Built a Gemini 2.5 Flash agent with tool-calling across 4 real-time APIs (Maps, Routes, Pollen, Weather) and integrated NYC tree census data for grounded recommendations.",
      "Led end-to-end AI product development, owning agent architecture, backend infrastructure, and production integration.",
    ],
  },
  {
    company: "University of Delaware",
    role: "Research Assistant",
    period: "Aug 2024 – Present",
    location: "Newark, Delaware",
    current: true,
    bullets: [
      "Developed and optimized a distance-aware GATv2 imputation pipeline in PyTorch Geometric for CMIP6 climate data, achieving 62% lower RMSE vs kriging (0.144K vs 0.378K) across 2,664 grid cells.",
      "Ran ablation experiments across 9 GATv2 architectures, narrowing the gap to GraphEM to 1% and identifying land-ocean features and multi-head attention as the most impactful design choices.",
      "Optimized GPU inference to reduce runtime from 3,745s to 1.06s per ensemble, enabling near-real-time climate reconstruction.",
    ],
  },
  {
    company: "Bank CenterCredit",
    role: "Machine Learning Engineer",
    period: "Dec 2022 – Aug 2024",
    location: "Almaty, Kazakhstan",
    current: false,
    bullets: [
      "Lifted 10–15% Gini and 5–10% KPI by owning end-to-end ML product delivery — scoping, feature engineering, training, validation, and production deployment of credit scoring systems.",
      "Cut 40–60% ML iteration time by building an automated pipeline (Python, SQL, LightGBM, SHAP, Airflow) from raw data to monitored production models.",
      "Shipped a multi-agent LangChain system with tool-augmented retrieval that reduced call center knowledge lookup time by 30–50%; deployed as an internal product used daily by staff.",
      "Reduced 25–45% manual review time by productionizing an LLM document summarization agent over high-volume internal document flows.",
    ],
  },
  {
    company: "Kazakhtelecom",
    role: "Data Science Intern",
    period: "Jun 2022 – Dec 2022",
    location: "Almaty, Kazakhstan",
    current: false,
    bullets: [
      "Built a decision tree model on 120K+ customer records to identify the top 5 drivers of churn, informing retention actions that reduced customer churn by 8%.",
      "Built customer profiling datasets in SQL by joining production tables and engineering segmentation features for targeted marketing campaigns.",
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
