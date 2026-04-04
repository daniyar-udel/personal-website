export default function Education() {
  return (
    <section id="education" className="py-24 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <p className="text-green-600 font-semibold text-sm uppercase tracking-widest mb-2">
          Education
        </p>
        <h2 className="text-3xl font-bold text-gray-900 mb-10">Academic Background</h2>

        <div className="relative border-l-2 border-gray-100 pl-8 space-y-10">
          {/* M.S. */}
          <div className="relative">
            <div className="absolute -left-[41px] w-4 h-4 rounded-full bg-green-600 border-2 border-white ring-2 ring-green-100" />
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-2">
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  University of Delaware
                </h3>
                <p className="text-gray-600 text-sm font-medium">
                  Master of Science, Data Science
                </p>
                <p className="text-gray-500 text-sm">Newark, Delaware</p>
              </div>
              <div className="text-right shrink-0">
                <span className="text-sm text-gray-500">Aug 2024 – May 2026</span>
                <div className="mt-1">
                  <span className="inline-block px-3 py-0.5 bg-green-50 text-green-700 text-xs font-semibold rounded-full">
                    GPA: 3.7
                  </span>
                </div>
              </div>
            </div>
            <ul className="text-sm text-gray-600 space-y-1 mt-3">
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-gray-400 shrink-0" />
                Focus: Multi-agent systems, RAG, deep learning, statistical modeling
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-gray-400 shrink-0" />
                Research: Spatio-temporal climate imputation with Graph Neural Networks
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
