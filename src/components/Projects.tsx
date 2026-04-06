import Image from "next/image";

const projects = [
  {
    title: "TreeRoute",
    tagline: "Hackathon Winner — Google Build With AI 2026",
    description:
      "Allergy-aware walking route planner for New York City. Ranks routes by pollen exposure using NYC street tree census data, real-time weather/wind, and Gemini 2.5 Flash for natural-language explanations. Supports voice input and audio route summaries.",
    tech: ["Next.js", "TypeScript", "Gemini 2.5 Flash", "Google Maps API", "Docker", "Cloud Run"],
    github: "https://github.com/daniyar-udel/treeroute",
    live: "https://treeroute-501252220143.us-central1.run.app/",
    badge: "🏆 1st Place",
    image: "/projects/treeroute.gif",
  },
  {
    title: "Knowledge Copilot",
    tagline: "RAG system for PDF Q&A",
    description:
      "Full-stack document intelligence platform. Upload PDFs, ask questions, get streamed answers with source citations and page references. Hybrid retrieval (vector search + BM25), analytics dashboard, and feedback loop for answer quality tracking.",
    tech: ["FastAPI", "LangChain", "Chroma", "Ollama", "Next.js", "Tailwind CSS"],
    github: "https://github.com/daniyar-udel/knowledge-copilot",
    live: null,
    badge: null,
    image: "/projects/knowledge-copilot.svg",
  },
  {
    title: "AI Investment Advisor",
    tagline: "ML + LLM financial planning system",
    description:
      "Personalized investment strategy engine. Classifies risk profiles, detects market regimes via KMeans clustering, runs 10,000 Monte Carlo simulations for goal-probability estimates, and offers a LangGraph-powered AI copilot for follow-up questions.",
    tech: ["FastAPI", "LangGraph", "LangChain", "scikit-learn", "React", "Docker"],
    github: "https://github.com/daniyar-udel/Financial-Planning-Advisor",
    live: "https://vivacious-imagination-production-f472.up.railway.app",
    badge: null,
    image: "/projects/financial-advisor.png",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <p className="text-green-600 font-semibold text-sm uppercase tracking-widest mb-2">
          Projects
        </p>
        <h2 className="text-3xl font-bold text-gray-900 mb-10">What I&apos;ve Built</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => (
            <div
              key={p.title}
              className="flex flex-col border border-gray-100 rounded-2xl overflow-hidden hover:border-green-200 hover:shadow-md transition-all duration-200"
            >
              {/* Project image */}
              <div className="relative w-full h-44 bg-gray-50">
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  className="object-cover"
                  unoptimized={p.image.endsWith(".gif") || p.image.endsWith(".svg")}
                />
              </div>

              {/* Card content */}
              <div className="flex flex-col flex-1 p-6">
                {/* Badge */}
                {p.badge && (
                  <span className="self-start mb-3 px-2.5 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-full">
                    {p.badge}
                  </span>
                )}

                {/* Title */}
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg font-bold text-gray-900">{p.title}</h3>
                  {p.live && (
                    <a
                      href={p.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs font-semibold text-green-600 hover:text-green-500 transition-colors"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      Website
                    </a>
                  )}
                </div>
                <p className="text-xs text-gray-400 font-medium mb-3">{p.tagline}</p>

                {/* Description */}
                <p className="text-sm text-gray-600 leading-relaxed flex-1 mb-4">
                  {p.description}
                </p>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {p.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full font-medium"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-3 mt-auto">
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm font-semibold text-gray-700 hover:text-green-600 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
