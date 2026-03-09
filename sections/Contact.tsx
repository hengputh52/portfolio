"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { profile } from "@/data/portfolioData";
import { useMotionConfig } from "@/hooks/useMotionConfig";

const FIELDS = [
  {
    id: "name" as const,
    prompt: "> IDENTIFY YOURSELF:",
    placeholder: "OPERATOR_NAME",
    type: "text" as const,
    inputMode: "text" as const,
    autoComplete: "name",
    autoCapitalize: "words" as const,
    enterKeyHint: "next" as const,
  },
  {
    id: "email" as const,
    prompt: "> TRANSMISSION VECTOR:",
    placeholder: "SIGNAL_ADDRESS",
    type: "email" as const,
    inputMode: "email" as const,
    autoComplete: "email",
    autoCapitalize: "off" as const,
    enterKeyHint: "next" as const,
  },
  {
    id: "message" as const,
    prompt: "> ENCODE MESSAGE:",
    placeholder: "PAYLOAD...",
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

  // Separate refs for input and textarea
  const inputRef    = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const field = FIELDS[step];

  // Delay auto-focus slightly to avoid iOS keyboard layout jump
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
      // TODO: integrate with your preferred API / form service
    }
  };

  /*
    CRITICAL mobile rule:
    text-base (1rem = 16px) on all inputs prevents iOS Safari from
    auto-zooming the viewport when the user taps an input field.
  */
  const baseInputClass =
    "w-full bg-transparent border-0 border-b border-k-orange/25 " +
    "font-mono text-base text-k-orange caret-k-orange " +
    "py-3 px-1 placeholder:text-k-orange/15 " +
    "focus:outline-none focus:border-k-orange transition-colors duration-200";

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
        <p className="font-mono text-[10px] tracking-widest uppercase text-k-orange/50 mb-2">
          SYS_MODULE: 05 // SIGNAL_RELAY
        </p>
        <h2
          className="font-display uppercase text-white leading-none"
          style={{ fontSize: "clamp(1.875rem, 5vw + 0.5rem, 5rem)", letterSpacing: "0.15em" }}
        >
          CONTACT
        </h2>
        <div className="h-px w-24 bg-k-orange/50 mt-4" />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-20 items-start">
        {/* Terminal form */}
        <motion.div
          className="border border-k-orange/15 bg-fog/40 p-6 sm:p-8"
          initial={disabled ? {} : { opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={transition}
        >
          {/* Window chrome */}
          <div className="flex items-center gap-2 pb-5 mb-6 border-b border-k-orange/10">
            <span className="w-3 h-3 rounded-full bg-red-500/50" />
            <span className="w-3 h-3 rounded-full bg-yellow-400/50" />
            <span className="w-3 h-3 rounded-full bg-green-400/50" />
            <span className="ml-3 font-mono text-[9px] text-white/20 tracking-widest uppercase">
              TERMINAL v2049.1 // SECURE_CHANNEL
            </span>
          </div>

          {/* Status */}
          <div className="flex items-center gap-2 mb-5 font-mono text-[10px] tracking-widest uppercase text-k-orange/50">
            <span className="w-1.5 h-1.5 rounded-full bg-k-orange animate-pulse-hud" />
            SYSTEM ONLINE — AWAITING TRANSMISSION
          </div>

          {/* Completed fields log */}
          <div className="space-y-2 mb-5">
            {FIELDS.slice(0, step).map((f) => (
              <div key={f.id} className="font-mono text-[0.8rem]">
                <span className="text-k-orange/35">{f.prompt} </span>
                <span className="text-dune-gold">{data[f.id]}</span>
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
                <label className="block font-mono text-[0.8rem] text-k-orange/55 mb-2">
                  {field.prompt}
                </label>

                {field.type === "textarea" ? (
                  <textarea
                    ref={textareaRef}
                    className={`${baseInputClass} resize-none min-h-[5rem]`}
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
                  className="inline-block w-2 h-[1em] bg-k-orange animate-blink align-middle ml-1"
                  aria-hidden="true"
                />

                {/* Submit / next */}
                <button
                  type="submit"
                  className="chromatic block w-full sm:w-auto mt-6
                             font-mono text-[10px] tracking-widest uppercase
                             border border-k-orange/35 text-k-orange
                             px-8 py-3 min-h-[48px]
                             hover:bg-k-orange/10 active:bg-k-orange/20
                             transition-colors duration-200"
                >
                  {step < FIELDS.length - 1
                    ? "[ CONTINUE → ]"
                    : "[ TRANSMIT ]"}
                </button>
              </motion.form>
            </AnimatePresence>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-2"
            >
              <p className="font-mono text-[0.875rem] text-k-orange">
                [ TRANSMISSION RECEIVED — SIGNAL LOCKED ]
              </p>
              <p className="font-mono text-[10px] tracking-wider text-white/35">
                Response vector established. Expect contact within 24 cycles.
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
          <p className="font-mono text-[10px] tracking-widest uppercase text-k-orange/40">
            DIRECT_CHANNELS:
          </p>
          {[
            { label: "EMAIL_VECTOR", value: profile.email, href: `mailto:${profile.email}` },
            { label: "GITHUB_NODE", value: "github.com/yourusername", href: profile.github },
            { label: "LINKEDIN_SIG", value: "linkedin.com/in/yourusername", href: profile.linkedin },
          ].map((link) => (
            <div key={link.label}>
              <p className="font-mono text-[9px] tracking-widest uppercase text-k-orange/30 mb-1">
                {link.label}
              </p>
              <a
                href={link.href}
                className="font-mono text-[0.8rem] text-dune-gold/70 hover:text-dune-gold
                           transition-colors duration-200 break-all"
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
