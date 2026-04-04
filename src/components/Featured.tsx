"use client";
import { useState } from "react";
import Image from "next/image";

// Add your hackathon photos to /public/hackathon/
// Name them: photo1.jpg, photo2.jpg, photo3.jpg, etc.
// Update this array with your actual photo filenames and captions
const photos: { src: string; caption: string }[] = [
  // Example (replace with your actual photos):
  // { src: "/hackathon/photo1.jpg", caption: "Team TreeRoute at NYU Tandon" },
  // { src: "/hackathon/photo2.jpg", caption: "Presenting to judges" },
  // { src: "/hackathon/photo3.jpg", caption: "Winner announcement" },
];

const PLACEHOLDER = photos.length === 0;

export default function Featured() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + photos.length) % photos.length);
  const next = () => setCurrent((c) => (c + 1) % photos.length);

  return (
    <section id="featured" className="py-24 px-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <p className="text-blue-600 font-semibold text-sm uppercase tracking-widest mb-2">
          Recognition
        </p>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Featured Achievement
        </h2>
        <p className="text-gray-500 mb-12 text-sm">Award & community spotlight</p>

        {/* Award card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-10">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">🏆</span>
              <span className="text-white font-bold text-xl">
                1st Place — Google Build With AI Hackathon 2026
              </span>
            </div>
            <p className="text-blue-100 text-sm font-medium">
              @ NYU Tandon School of Engineering, New York
            </p>
          </div>

          <div className="px-8 py-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <p className="text-gray-700 leading-relaxed text-sm mb-4">
                  Built{" "}
                  <span className="font-semibold text-gray-900">TreeRoute</span> — a
                  multimodal agentic route planner helping allergy-sensitive New Yorkers
                  find safer walking routes by analyzing real-time pollen, weather, and
                  NYC tree census data using Gemini 2.5 Flash with tool-calling.
                </p>
                <p className="text-gray-700 leading-relaxed text-sm">
                  The system ranked 2-3 walking routes by predicted pollen exposure,
                  generated grounded AI explanations, and supported voice-enabled
                  planning through Google Maps, Routes, Pollen, and Weather APIs.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                {[
                  { label: "Event", value: "Google Build With AI Hackathon 2026" },
                  { label: "Location", value: "NYU Tandon, New York" },
                  { label: "Stack", value: "Gemini 2.5 Flash, Next.js, TypeScript, Docker" },
                  { label: "Result", value: "1st Place Winner" },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-start gap-3 text-sm">
                    <span className="text-gray-400 w-20 shrink-0">{label}</span>
                    <span className="text-gray-800 font-medium">{value}</span>
                  </div>
                ))}
                <a
                  href="https://treeroute-501252220143.us-central1.run.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg font-semibold hover:bg-blue-700 transition-colors w-fit"
                >
                  Live Demo
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Photo carousel */}
        {PLACEHOLDER ? (
          <div className="rounded-2xl border-2 border-dashed border-gray-200 h-64 flex flex-col items-center justify-center text-gray-400 gap-2">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-sm font-medium">Add your hackathon photos to /public/hackathon/</p>
            <p className="text-xs">Update the photos array in Featured.tsx</p>
          </div>
        ) : (
          <div className="relative rounded-2xl overflow-hidden bg-gray-100">
            <div className="relative h-80 sm:h-96">
              <Image
                src={photos[current].src}
                alt={photos[current].caption}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <p className="absolute bottom-4 left-0 right-0 text-center text-white text-sm font-medium">
                {photos[current].caption}
              </p>
            </div>

            {photos.length > 1 && (
              <>
                <button
                  onClick={prev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full w-9 h-9 flex items-center justify-center shadow transition-colors"
                  aria-label="Previous photo"
                >
                  ‹
                </button>
                <button
                  onClick={next}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full w-9 h-9 flex items-center justify-center shadow transition-colors"
                  aria-label="Next photo"
                >
                  ›
                </button>
                <div className="absolute bottom-12 left-0 right-0 flex justify-center gap-1.5">
                  {photos.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrent(i)}
                      className={`w-1.5 h-1.5 rounded-full transition-colors ${
                        i === current ? "bg-white" : "bg-white/50"
                      }`}
                      aria-label={`Photo ${i + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
