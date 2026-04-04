import Image from "next/image";

const skills = [
  { category: "ML / AI", items: ["LangGraph", "LangChain", "PyTorch", "RAG", "Agentic AI", "Transformers", "NLP", "XGBoost", "LightGBM", "scikit-learn"] },
  { category: "Languages & Data", items: ["Python", "TypeScript", "SQL", "Pandas", "NumPy"] },
  { category: "Frontend", items: ["React", "Next.js", "Tailwind CSS"] },
  { category: "Deployment & Infra", items: ["FastAPI", "Docker", "Airflow", "MLflow", "AWS", "Google Cloud", "CI/CD"] },
];

export default function About() {
  return (
    <section id="about" className="py-24 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <p className="text-green-600 font-semibold text-sm uppercase tracking-widest mb-2">
          About me
        </p>
        <h2 className="text-3xl font-bold text-gray-900 mb-10">
          Who I am
        </h2>

        {/* Top: photo + bio */}
        <div className="grid md:grid-cols-2 gap-12 mb-10 items-center">
          {/* Bio */}
          <div>
            <p className="text-gray-600 leading-relaxed mb-4">
              ML/AI Engineer specializing in{" "}
              <span className="font-semibold text-gray-800">multi-agent systems</span> with
              planning, tool use, and{" "}
              <span className="font-semibold text-gray-800">RAG</span> — shipped to production,
              measurable business impact.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              Pursuing an M.S. in Data Science at the{" "}
              <span className="font-semibold text-gray-800">University of Delaware</span> (GPA 3.7,
              graduating May 2026). Previously a Machine Learning Engineer in FinTech — owned
              end-to-end ML product delivery from credit scoring to LLM-powered internal tools.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Stack:{" "}
              <span className="font-semibold text-gray-800">
                Python, TypeScript, LangGraph, LangChain, PyTorch, FastAPI, React/Next.js
              </span>.
            </p>
          </div>

          {/* Photo */}
          <div className="flex justify-center md:justify-end">
            <div className="relative w-56 h-56 rounded-2xl overflow-hidden shadow-lg ring-4 ring-green-100">
              <Image
                src="/profile.png"
                alt="Daniyar Abykhanov"
                fill
                className="object-cover object-top"
              />
            </div>
          </div>
        </div>

        {/* Highlights */}
        <div className="mb-12">
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
            Highlights
          </p>
          <ul className="grid sm:grid-cols-2 gap-2">
            {[
              "🏆 Google Build With AI Hackathon 2026 Winner @ NYU Tandon",
              "🎓 M.S. Data Science — University of Delaware, GPA 3.7",
              "💼 2+ years production ML at FinTech",
              "🔬 Research Assistant — climate ML with PyTorch Geometric",
              "🚀 Open to ML Engineer / AI Engineer / Data Scientist roles",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-gray-700 text-sm">
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Skills grid */}
        <div>
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-6">
            Tech Stack
          </p>
          <div className="grid sm:grid-cols-2 gap-6">
            {skills.map((group) => (
              <div key={group.category}>
                <p className="text-xs font-bold text-green-600 uppercase tracking-widest mb-3">
                  {group.category}
                </p>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
