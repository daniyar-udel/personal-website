const jobs = [
  {
    company: "University of Delaware",
    role: "Research Assistant",
    period: "Aug 2024 – Present",
    location: "Newark, Delaware",
    current: true,
    bullets: [
      "Delivered 22% lower RMSE on held-out regions by building a GAT/GATv2 imputation pipeline in PyTorch Geometric for CMIP-style spatio-temporal climate data.",
      "Improved prediction quality by 27% (CE: 0.62 → 0.79) over GCN/GraphConv baselines across random, shared, and ensemble missingness regimes.",
      "Reduced seed-to-seed variance by 35% under 30–70% missingness by adding elevation, land/ocean features, and seasonal normalization.",
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
      "Built a customer profiling dataset in SQL by joining production tables and engineering segmentation features used for more targeted marketing campaigns.",
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
