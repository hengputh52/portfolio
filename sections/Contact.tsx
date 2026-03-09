"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { profile } from "@/data/portfolioData";
import { useMotionConfig } from "@/hooks/useMotionConfig";

const FIELDS = [
  {
    id: "name" as const,
    prompt: "> Your Name:",
    placeholder: "Enter your name",
    type: "text" as const,
    inputMode: "text" as const,
    autoComplete: "name",
    autoCapitalize: "words" as const,
    enterKeyHint: "next" as const,
  },
  {
    id: "email" as const,
    prompt: "> Your Email:",
    placeholder: "your@email.com",
    type: "email" as const,
    inputMode: "email" as const,
    autoComplete: "email",
    autoCapitalize: "off" as const,
    enterKeyHint: "next" as const,
  },
  {
    id: "message" as const,
    prompt: "> Your Message:",
    placeholder: "What would you like to build together?",
    type: "textarea" as const,
    inputMode: "text" as const,
    autoComplete: "off",
    autoCapitalize: "sentences" as const,
    enterKeyHint: "send" as const,
  },
] as const;

type FieldId = (typeof FIELDS)[number]["id"];
type FormData = Record<FieldId, string>;

export function Contact() {
  const { disabled, transition } = useMotionConfig();
  const [step, setStep]           = useState(0);
  const [data, setData]           = useState<FormData>({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const inputRef    = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const field = FIELDS[step];

  useEffect(() => {
    const t = setTimeout(() => {
      if (field.type === "textarea") {
        textareaRef.current?.focus();
      } else {
        inputRef.current?.focus();
      }
    }, 150);
    return () => clearTimeout(t);
  }, [step, field.type]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = data[field.id].trim();
    if (!val) return;
    if (step < FIELDS.length - 1) {
      setStep((s) => s + 1);
    } else {
      setSubmitted(true);
    }
  };

  const baseInputClass =
    "w-full bg-transparent border-0 border-b " +
    "font-mono text-base py-3 px-1 " +
    "focus:outline-none transition-colors duration-200";

  return (
    <section id="contact" className="section-padding" aria-label="Contact">
      {/* Section header */}
      <motion.div
        className="mb-10 sm:mb-14"
        initial={disabled ? {} : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={transition}
      >
        <p
          className="font-mono text-[10px] tracking-widest uppercase mb-2"
          style={{ color: "rgba(5,150,105,0.55)" }}
        >
          Signal Relay: 05 {" // "} Open Channel
        </p>
        <h2
          className="font-display uppercase leading-none"
          style={{ fontSize: "clamp(1.875rem, 5vw + 0.5rem, 5rem)", letterSpacing: "0.08em", color: "#064e3b" }}
        >
          CONTACT
        </h2>
        <div className="h-px w-24 mt-4" style={{ background: "linear-gradient(90deg, #059669, #0891B2)" }} />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-20 items-start">
        {/* Terminal form */}
        <motion.div
          className="glass-card p-6 sm:p-8"
          initial={disabled ? {} : { opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={transition}
        >
          {/* Window chrome */}
          <div
            className="flex items-center gap-2 pb-5 mb-6"
            style={{ borderBottom: "1px solid rgba(5,150,105,0.15)" }}
          >
            <span className="w-3 h-3 rounded-full" style={{ background: "rgba(249,115,22,0.7)" }} />
            <span className="w-3 h-3 rounded-full" style={{ background: "rgba(249,115,22,0.4)" }} />
            <span className="w-3 h-3 rounded-full" style={{ background: "rgba(5,150,105,0.6)" }} />
            <span
              className="ml-3 font-mono text-[9px] tracking-widest uppercase"
              style={{ color: "rgba(6,78,59,0.35)" }}
            >
              Signal Terminal // Secure Channel
            </span>
          </div>

          {/* Status */}
          <div
            className="flex items-center gap-2 mb-5 font-mono text-[10px] tracking-widest uppercase"
            style={{ color: "rgba(5,150,105,0.6)" }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse-hud"
              style={{ background: "#059669" }}
            />
            Solar Channel Active — Ready to Connect
          </div>

          {/* Completed fields log */}
          <div className="space-y-2 mb-5">
            {FIELDS.slice(0, step).map((f) => (
              <div key={f.id} className="font-mono text-[0.8rem]">
                <span style={{ color: "rgba(5,150,105,0.4)" }}>{f.prompt} </span>
                <span style={{ color: "#0891B2" }}>{data[f.id]}</span>
              </div>
            ))}
          </div>

          {/* Active input or success */}
          {!submitted ? (
            <AnimatePresence mode="wait">
              <motion.form
                key={step}
                onSubmit={handleSubmit}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <label
                  className="block font-mono text-[0.8rem] mb-2"
                  style={{ color: "rgba(5,150,105,0.65)" }}
                >
                  {field.prompt}
                </label>

                {field.type === "textarea" ? (
                  <textarea
                    ref={textareaRef}
                    className={`${baseInputClass} resize-none min-h-[5rem]`}
                    style={{
                      borderBottomColor: "rgba(5,150,105,0.3)",
                      color:             "#064e3b",
                      caretColor:        "#059669",
                    }}
                    placeholder={field.placeholder}
                    inputMode={field.inputMode}
                    autoComplete={field.autoComplete}
                    autoCapitalize={field.autoCapitalize}
                    autoCorrect="off"
                    spellCheck={false}
                    rows={4}
                    value={data.message}
                    onChange={(e) =>
                      setData((d) => ({ ...d, message: e.target.value }))
                    }
                    required
                  />
                ) : (
                  <input
                    ref={inputRef}
                    className={baseInputClass}
                    style={{
                      borderBottomColor: "rgba(5,150,105,0.3)",
                      color:             "#064e3b",
                      caretColor:        "#059669",
                    }}
                    type={field.type}
                    placeholder={field.placeholder}
                    inputMode={field.inputMode}
                    enterKeyHint={field.enterKeyHint}
                    autoComplete={field.autoComplete}
                    autoCapitalize={field.autoCapitalize}
                    autoCorrect="off"
                    spellCheck={false}
                    value={data[field.id]}
                    onChange={(e) =>
                      setData((d) => ({ ...d, [field.id]: e.target.value }))
                    }
                    required
                  />
                )}

                {/* Blinking cursor */}
                <span
                  className="inline-block w-2 h-[1em] animate-blink align-middle ml-1"
                  style={{ background: "#059669" }}
                  aria-hidden="true"
                />

                {/* Submit / next */}
                <button
                  type="submit"
                  className="chromatic block w-full sm:w-auto mt-6
                             font-mono text-[10px] tracking-widest uppercase
                             px-8 py-3 min-h-[48px]
                             transition-colors duration-200"
                  style={{
                    border:     "1px solid rgba(5,150,105,0.4)",
                    color:      "#059669",
                    background: "rgba(5,150,105,0.05)",
                  }}
                >
                  {step < FIELDS.length - 1
                    ? "[ CONTINUE → ]"
                    : "[ SEND MESSAGE ]"}
                </button>
              </motion.form>
            </AnimatePresence>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-2"
            >
              <p className="font-mono text-[0.875rem]" style={{ color: "#059669" }}>
                [ Message Received — Signal Routed ]
              </p>
              <p className="font-mono text-[10px] tracking-wider" style={{ color: "rgba(6,78,59,0.5)" }}>
                Connection established. Expect a response within 24 hours.
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* Links sidebar */}
        <motion.div
          className="space-y-6"
          initial={disabled ? {} : { opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ ...transition, delay: disabled ? 0 : 0.2 }}
        >
          <p
            className="font-mono text-[10px] tracking-widest uppercase"
            style={{ color: "rgba(5,150,105,0.5)" }}
          >
            Direct Channels:
          </p>
          {[
            { label: "Email",    value: profile.email,                     href: `mailto:${profile.email}` },
            { label: "GitHub",   value: "github.com/yourusername",         href: profile.github },
            { label: "LinkedIn", value: "linkedin.com/in/yourusername",    href: profile.linkedin },
          ].map((link) => (
            <div key={link.label}>
              <p
                className="font-mono text-[9px] tracking-widest uppercase mb-1"
                style={{ color: "rgba(5,150,105,0.4)" }}
              >
                {link.label}
              </p>
              <a
                href={link.href}
                className="font-mono text-[0.8rem] break-all transition-colors duration-200"
                style={{ color: "rgba(8,145,178,0.75)" }}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
              >
                {link.value}
              </a>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
