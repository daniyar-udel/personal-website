"use client";
import { useState } from "react";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import emailjs from "@emailjs/browser";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await emailjs.send(
        "service_hq2hjmo",
        "template_7izwdw3",
        {
          from_name: form.name,
          from_email: form.email,
          message: form.message,
        },
        "ZYRgDatEEw57ZSedf"
      );
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-24 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <p className="text-green-600 font-semibold text-sm uppercase tracking-widest mb-2">
          Contact
        </p>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Get in touch</h2>
        <p className="text-gray-500 mb-12 max-w-lg">
          Open to ML Engineer, AI Engineer, and Data Scientist roles. Feel free to reach out — I&apos;ll get back to you quickly.
        </p>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Your name"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="your@email.com"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Tell me about the opportunity..."
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition resize-none"
              />
            </div>
            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full py-3 bg-green-600 text-white rounded-lg font-semibold text-sm hover:bg-blue-700 transition-colors disabled:opacity-60"
            >
              {status === "sending" ? "Sending..." : status === "sent" ? "Message sent!" : status === "error" ? "Error — try again" : "Send Message"}
            </button>
          </form>

          {/* Contact info */}
          <div className="flex flex-col justify-center gap-8">
            <div>
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
                Direct contact
              </p>
              <div className="space-y-3">
                <a
                  href="mailto:daniyar@udel.edu"
                  className="flex items-center gap-3 text-gray-700 hover:text-green-600 transition-colors text-sm"
                >
                  <FaEnvelope className="text-gray-400 w-4 h-4" />
                  daniyar@udel.edu
                </a>
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
                Find me on
              </p>
              <div className="flex gap-4">
                <a
                  href="https://www.linkedin.com/in/daniyarabykhanov/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 hover:border-green-600 hover:text-green-600 transition-colors"
                >
                  <FaLinkedin className="w-4 h-4" />
                  LinkedIn
                </a>
                <a
                  href="https://github.com/daniyar-udel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 hover:border-gray-900 hover:text-gray-900 transition-colors"
                >
                  <FaGithub className="w-4 h-4" />
                  GitHub
                </a>
              </div>
            </div>

            <div className="p-4 bg-green-50 rounded-xl">
              <p className="text-sm text-green-800 font-medium mb-1">Currently available</p>
              <p className="text-xs text-green-600">
                Graduating May 2026 · Open to full-time ML/AI Engineer roles
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-4xl mx-auto mt-20 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-400">
        <p>© 2026 Daniyar Abykhanov</p>
        <p>Built with Next.js + Tailwind CSS</p>
      </div>
    </section>
  );
}
