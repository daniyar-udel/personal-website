"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";

const ROLES = ["ML Engineer", "AI Engineer", "Data Scientist", "LLM Builder"];

const PHOTOS = [
  { src: "/hackathon/team.png", caption: "Team TreeRoute @ NYU Tandon" },
  { src: "/hackathon/presentation.png", caption: "Presenting our architecture to the audience" },
  { src: "/hackathon/group1.png", caption: "Google Build With AI Hackathon 2026" },
  { src: "/hackathon/group2.png", caption: "All participants @ NYU Tandon" },
];

export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [text, setText] = useState("");
  const [erasing, setErasing] = useState(false);
  const [photoIdx, setPhotoIdx] = useState(0);

  // Typing animation
  useEffect(() => {
    const target = ROLES[roleIdx];
    let timer: ReturnType<typeof setTimeout>;
    if (!erasing) {
      if (text.length < target.length) {
        timer = setTimeout(() => setText(target.slice(0, text.length + 1)), 80);
      } else {
        timer = setTimeout(() => setErasing(true), 2400);
      }
    } else {
      if (text.length > 0) {
        timer = setTimeout(() => setText(text.slice(0, -1)), 45);
      } else {
        setRoleIdx((i) => (i + 1) % ROLES.length);
        setErasing(false);
      }
    }
    return () => clearTimeout(timer);
  }, [text, erasing, roleIdx]);

  // Auto-advance photos
  useEffect(() => {
    const t = setInterval(() => setPhotoIdx((i) => (i + 1) % PHOTOS.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <section
      id="home"
      className="min-h-screen flex items-center pt-16"
      style={{
        background:
          "linear-gradient(135deg, #162419 0%, #1e3320 40%, #243d28 100%)",
      }}
    >
      <div className="w-full max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* LEFT — Hero text */}
        <div>
          <h1 className="font-bold leading-tight mb-3">
            <span className="block text-4xl sm:text-5xl text-gray-300 font-normal">
              Hi There,
            </span>
            <span className="block text-5xl sm:text-6xl mt-1 text-white">
              I&apos;m{" "}
              <span className="text-green-400">Daniyar</span>
            </span>
          </h1>

          <p className="text-lg text-gray-300 mb-3 min-h-[2rem]">
            I am all about{" "}
            <span className="font-bold text-white">
              {text}
              <span className="animate-pulse text-green-400">|</span>
            </span>
          </p>

          <div className="inline-flex items-center gap-1.5 border border-green-500/40 text-green-400 text-xs font-bold tracking-widest px-3 py-1.5 rounded mb-6">
            <span className="text-green-500">&gt;_</span>
            ML / AI ENGINEER
          </div>

          <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-sm">
            I don&apos;t just prototype AI — I ship it to production with
            measurable impact. Multi-agent systems, RAG pipelines, full-stack
            LLM products.{" "}
            <span className="text-green-400 font-medium">Google Hackathon Winner</span>{" "}
            | 2+ yrs FinTech ML | M.S. @ UDel | Open to full-time roles.
          </p>

          <div className="flex flex-wrap gap-3 mb-8">
            <a
              href="#about"
              className="flex items-center gap-2 px-5 py-2.5 bg-green-500 hover:bg-green-400 text-white text-sm font-semibold rounded-full transition-colors"
            >
              About Me
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </a>
            <a
              href="https://drive.google.com/file/d/1klg1gomYqvfe5h2dxIAGG58IbPVx_yow/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 border border-white/25 text-white/80 text-sm font-semibold rounded-full hover:border-green-400 hover:text-green-400 transition-colors"
            >
              Resume
            </a>
          </div>

          <div className="flex gap-5">
            <a
              href="https://www.linkedin.com/in/daniyarabykhanov/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-green-400 transition-colors"
              aria-label="LinkedIn"
            >
              <FaLinkedin size={20} />
            </a>
            <a
              href="https://github.com/daniyar-udel"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-green-400 transition-colors"
              aria-label="GitHub"
            >
              <FaGithub size={20} />
            </a>
            <a
              href="mailto:daniyar@udel.edu"
              className="text-gray-500 hover:text-green-400 transition-colors"
              aria-label="Email"
            >
              <FaEnvelope size={20} />
            </a>
          </div>
        </div>

        {/* RIGHT — Hackathon featured */}
        <div>
          {/* Header */}
          <div className="mb-4">
            <p className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-1">
              Featured Achievement
            </p>
            <h3 className="text-white text-lg font-bold">
              Google Build With AI Hackathon 2026
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-base">🏆</span>
              <span className="text-green-400 text-sm font-semibold">
                1st Place Winner @ NYU Tandon, New York
              </span>
            </div>
          </div>

          {/* Photo carousel */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gray-900"
               style={{ aspectRatio: "16/10" }}>
            {PHOTOS.map((photo, i) => (
              <div
                key={photo.src}
                className={`absolute inset-0 transition-opacity duration-700 ${
                  i === photoIdx ? "opacity-100" : "opacity-0"
                }`}
              >
                <Image
                  src={photo.src}
                  alt={photo.caption}
                  fill
                  className="object-cover"
                  priority={i === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <p className="absolute bottom-3 left-0 right-0 text-center text-white text-xs font-medium px-6">
                  {photo.caption}
                </p>
              </div>
            ))}

            {/* Arrows */}
            <button
              onClick={() => setPhotoIdx((i) => (i - 1 + PHOTOS.length) % PHOTOS.length)}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white rounded-full w-8 h-8 flex items-center justify-center transition-colors z-10 text-lg leading-none"
              aria-label="Previous"
            >
              ‹
            </button>
            <button
              onClick={() => setPhotoIdx((i) => (i + 1) % PHOTOS.length)}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white rounded-full w-8 h-8 flex items-center justify-center transition-colors z-10 text-lg leading-none"
              aria-label="Next"
            >
              ›
            </button>

            {/* Dots */}
            <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-1.5 z-10">
              {PHOTOS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPhotoIdx(i)}
                  className={`w-1.5 h-1.5 rounded-full transition-colors ${
                    i === photoIdx ? "bg-white" : "bg-white/35"
                  }`}
                  aria-label={`Photo ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
