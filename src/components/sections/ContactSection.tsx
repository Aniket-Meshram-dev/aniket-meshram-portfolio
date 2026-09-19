import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Magnetic } from '@/components/ui/Magnetic';
import confetti from 'canvas-confetti';

interface ContactSectionProps {
  onNavigate?: (route: string) => void;
}

const TOPICS = [
  '🚀 Project Inquiry',
  '💼 Hire / Full-time Role',
  '🤝 Collaboration',
  '☕ Just Saying Hi',
];

export const ContactSection: React.FC<ContactSectionProps> = ({ onNavigate }) => {
  // Quick Copy Email state
  const [copied, setCopied] = useState<boolean>(false);
  const emailAddress = 'aniketmeshram445@gmail.com';

  // Magnetic Ripple Aura mouse position tracking inside button
  const [ripplePos, setRipplePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isHoveredBtn, setIsHoveredBtn] = useState<boolean>(false);

  // Terminal / Mini Message Box Mode state
  const [isTerminalOpen, setIsTerminalOpen] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [topic, setTopic] = useState<string>(TOPICS[0]);
  const [message, setMessage] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const btnRef = useRef<HTMLButtonElement>(null);

  // Handle Quick Copy
  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(emailAddress);
      setCopied(true);

      // Micro celebration confetti spark
      confetti({
        particleCount: 24,
        spread: 45,
        origin: { y: 0.8 },
        colors: ['#10b981', '#34d399', '#6ee7b7'],
      });

      setTimeout(() => {
        setCopied(false);
      }, 2600);
    } catch {
      // fallback
    }
  };

  // Handle Magnetic Liquid Ripple mouse move
  const handleBtnMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setRipplePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // Handle Mini Message Box Form Submission
  const handleMessageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);

      // Full celebratory confetti
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#d4547e', '#3b82f6', '#10b981', '#f59e0b'],
      });

      // Auto-collapse and reset after 4.5 seconds
      setTimeout(() => {
        setIsSuccess(false);
        setName('');
        setEmail('');
        setMessage('');
        setIsTerminalOpen(false);
      }, 4500);
    }, 800);
  };

  return (
    <section id="contact" className="relative py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="contact-cta-header mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-[var(--color-text)]"
          >
            Ready to Connect?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-3 text-lg text-[var(--color-text-secondary)]"
          >
            Let's turn your next idea into something real
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 h-1 w-16 rounded-full bg-primary"
          />
        </div>

        {/* CTA Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="contact-cta-card relative rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] overflow-hidden py-16 md:py-24 px-6 transition-[border-color,box-shadow] duration-500 hover:border-primary/30 hover:shadow-[0_0_80px_-20px] hover:shadow-primary/20"
        >
          {/* Radial Glow */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-700"
            style={{
              background: 'radial-gradient(circle, var(--color-primary-glow) 0%, transparent 70%)',
            }}
          />

          {/* Aurora Drifts */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
            <div
              className="absolute -top-1/3 -left-1/4 w-3/4 h-2/3 rounded-full opacity-[0.06] dark:opacity-[0.08] blur-3xl bg-primary"
              style={{
                animation: '14s ease-in-out 0s infinite normal none running cta-aurora-drift',
              }}
            />
            <div
              className="absolute -bottom-1/4 -right-1/4 w-2/3 h-1/2 rounded-full opacity-[0.04] dark:opacity-[0.06] blur-3xl bg-primary-dark"
              style={{
                animation: '18s ease-in-out 0s infinite normal none running cta-aurora-drift-alt',
              }}
            />
          </div>

          {/* Floating Particle Accents */}
          <div className="absolute inset-0 pointer-events-none">
            <div
              className="absolute top-[20%] left-[15%] w-2 h-2 rounded-full bg-primary/15 dark:bg-primary/20 blur-[1px]"
              style={{ opacity: 0.6 }}
            />
            <div
              className="absolute top-[65%] left-[80%] w-1.5 h-1.5 rounded-full bg-primary/15 dark:bg-primary/20 blur-[1px]"
              style={{ opacity: 0.9 }}
            />
            <div
              className="absolute top-[45%] left-[90%] w-2.5 h-2.5 rounded-full bg-primary-dark/10 dark:bg-primary-dark/15 blur-[1px]"
              style={{ opacity: 0.8 }}
            />
            <div
              className="absolute top-[75%] left-[10%] w-1 h-1 rounded-full bg-primary/20 dark:bg-primary/25"
              style={{ opacity: 0.9 }}
            />
          </div>

          {/* Noise Overlay */}
          <div
            className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03] pointer-events-none mix-blend-overlay rounded-2xl"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
            }}
          />

          <div className="relative z-10 text-center max-w-3xl mx-auto">
            {/* Headline */}
            <h2 className="contact-cta-headline text-3xl sm:text-4xl md:text-6xl font-black tracking-tight leading-[1.1]">
              <span className="text-[var(--color-text)]">FROM IDEA TO </span>
              <span
                className="bg-clip-text inline-block"
                style={{
                  backgroundImage:
                    'linear-gradient(135deg, var(--color-primary-dark) 0%, var(--color-primary) 35%, var(--color-primary-200) 65%, var(--color-primary-50) 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                IMPACT
              </span>
            </h2>

            {/* Subline */}
            <p className="contact-cta-subline mt-4 text-lg sm:text-xl md:text-2xl font-bold text-[var(--color-text-secondary)] tracking-tight">
              LET'S BUILD SOMETHING REAL.
            </p>

            {/* Main Action Buttons: Get in Touch + Quick Copy Email */}
            <div className="contact-cta-actions mt-9 flex flex-wrap items-center justify-center gap-4">
              {/* 1. Primary CTA Button with Magnetic Liquid Ripple Aura */}
              <Magnetic strength={0.35} innerParallax>
                <div className="relative group/btn-wrap">
                  {/* Concentric Magnetic Sonar Pulse Aura on Hover */}
                  <div
                    className={`absolute -inset-2 rounded-full pointer-events-none transition-opacity duration-500 ${
                      isHoveredBtn ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <div className="absolute inset-0 rounded-full bg-primary/25 animate-ping opacity-35" />
                    <div className="absolute -inset-1 rounded-full bg-primary/20 blur-md" />
                  </div>

                  <button
                    ref={btnRef}
                    onClick={() => {
                      onNavigate?.('/contact');
                    }}
                    onMouseMove={handleBtnMouseMove}
                    onMouseEnter={() => setIsHoveredBtn(true)}
                    onMouseLeave={() => setIsHoveredBtn(false)}
                    className="group/btn relative inline-flex items-center gap-3 px-8 py-4 rounded-full border border-[var(--color-border)] bg-[var(--color-card)] overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_60px_-10px] hover:shadow-primary/35 cursor-pointer z-10"
                    data-cursor="pointer"
                  >
                    {/* Rotating conic border */}
                    <div
                      className="absolute inset-0 rounded-full opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={
                        {
                          animation: '3.5s linear 0s infinite normal none running rotate-border',
                          background:
                            'conic-gradient(from var(--border-angle, 0deg), transparent 20%, #d4547e 35%, #e07a9c 50%, #d4547e 65%, transparent 80%)',
                          mask: 'linear-gradient(rgb(255, 255, 255) 0px, rgb(255, 255, 255) 0px) content-box xor, linear-gradient(rgb(255, 255, 255) 0px, rgb(255, 255, 255) 0px)',
                          WebkitMask:
                            'linear-gradient(rgb(255, 255, 255) 0px, rgb(255, 255, 255) 0px) content-box xor, linear-gradient(rgb(255, 255, 255) 0px, rgb(255, 255, 255) 0px)',
                          padding: '1.5px',
                        } as React.CSSProperties
                      }
                    />

                    {/* Mouse-Tracking Liquid Magnetic Radial Aura */}
                    <div
                      className="absolute inset-0 pointer-events-none rounded-full transition-opacity duration-200"
                      style={{
                        opacity: isHoveredBtn ? 1 : 0,
                        background: `radial-gradient(110px circle at ${ripplePos.x}px ${ripplePos.y}px, rgba(212, 84, 126, 0.45), transparent 75%)`,
                      }}
                    />

                    {/* Shimmer sweep */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 pointer-events-none rounded-full"
                      style={{
                        background:
                          'linear-gradient(105deg, transparent 40%, rgba(255, 255, 255, 0.08) 45%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.08) 55%, transparent 60%) 0% 0% / 200% 100%',
                        animation: '2s ease-in-out 0s infinite normal none running cta-shimmer',
                      }}
                    />

                    <span className="relative z-[1] text-base font-semibold text-[var(--color-text)] transition-colors duration-300 group-hover/btn:text-primary-light">
                      Get in Touch
                    </span>
                    <svg
                      className="relative z-[1] w-5 h-5 text-[var(--color-text-secondary)] transition-all duration-300 group-hover/btn:translate-x-1 group-hover/btn:text-primary-light rtl:rotate-180 rtl:group-hover/btn:-translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </button>
                </div>
              </Magnetic>

              {/* 2. Interactive "Quick Copy Email" Pill with Tactile Laser Feedback */}
              <button
                type="button"
                onClick={handleCopyEmail}
                className={`group relative flex items-center gap-2.5 px-6 py-4 rounded-full border transition-all duration-300 cursor-pointer shadow-lg select-none ${
                  copied
                    ? 'border-emerald-500/80 bg-emerald-500/15 text-emerald-300 shadow-[0_0_30px_rgba(16,185,129,0.45)] ring-2 ring-emerald-400/40 scale-105'
                    : 'border-[var(--color-border)] bg-[var(--color-card)]/80 hover:bg-[var(--color-card)] hover:border-primary/40 text-[var(--color-text)] hover:shadow-primary/20'
                }`}
                title="Click to copy email address"
                data-cursor="pointer"
              >
                {copied ? (
                  <>
                    {/* Emerald Check Icon with Ripple Pulse */}
                    <span className="relative flex h-4 w-4 items-center justify-center">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <svg
                        className="w-4 h-4 text-emerald-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <span className="text-sm font-semibold tracking-wide text-emerald-200">
                      Copied to Clipboard!
                    </span>
                  </>
                ) : (
                  <>
                    {/* Mail Envelope Icon */}
                    <svg
                      className="w-4 h-4 text-primary/80 group-hover:text-primary transition-colors shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>

                    <span className="text-sm font-mono text-[var(--color-text-secondary)] group-hover:text-white transition-colors">
                      {emailAddress}
                    </span>

                    {/* Copy Tag */}
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-white/5 border border-white/10 group-hover:border-primary/30 group-hover:text-primary text-zinc-400 transition-colors ml-1">
                      Copy
                    </span>
                  </>
                )}
              </button>
            </div>

            {/* 3. Interactive Terminal Mode / Mini Message Box Toggle */}
            <div className="mt-5 flex justify-center">
              <button
                type="button"
                onClick={() => setIsTerminalOpen((prev) => !prev)}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 hover:bg-black/60 border border-white/10 hover:border-primary/40 text-xs font-mono text-zinc-300 hover:text-white transition-all cursor-pointer shadow-md"
                data-cursor="pointer"
              >
                <span className="text-primary font-bold">&gt;_</span>
                <span>{isTerminalOpen ? 'Hide Mini Message Box' : 'Open Mini Message Box (1-Click)'}</span>
                <svg
                  className={`w-3 h-3 transition-transform duration-300 ${
                    isTerminalOpen ? 'rotate-180 text-primary' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>

            {/* Inline Mini Message Terminal Box */}
            <AnimatePresence>
              {isTerminalOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0, scale: 0.96 }}
                  animate={{ opacity: 1, height: 'auto', scale: 1 }}
                  exit={{ opacity: 0, height: 0, scale: 0.96 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="mt-6 overflow-hidden text-left"
                >
                  <div className="rounded-2xl bg-zinc-950/90 backdrop-blur-xl border border-white/15 p-5 md:p-6 shadow-2xl relative">
                    {/* Terminal Title Bar */}
                    <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/10">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                        <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                        <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                        <span className="ml-2 text-xs font-mono text-zinc-400">
                          direct-dispatch.sh — Fast Message Box
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => setIsTerminalOpen(false)}
                        className="text-zinc-500 hover:text-white text-xs p-1 transition-colors cursor-pointer"
                        title="Close"
                      >
                        ✕
                      </button>
                    </div>

                    {isSuccess ? (
                      /* Success State Banner */
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="py-8 text-center"
                      >
                        <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/50 text-emerald-400 flex items-center justify-center mx-auto mb-3 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                          <svg
                            className="w-6 h-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="3"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </div>
                        <h3 className="text-lg font-bold text-white mb-1">
                          Message Dispatched!
                        </h3>
                        <p className="text-sm text-zinc-300 max-w-md mx-auto">
                          Thank you for reaching out, {name || 'friend'}! Aniket has received your ping and will get back to you shortly.
                        </p>
                      </motion.div>
                    ) : (
                      /* The Inline Form */
                      <form onSubmit={handleMessageSubmit} className="space-y-4">
                        {/* Topic Selector Chips */}
                        <div>
                          <label className="block text-[11px] font-mono font-semibold uppercase text-zinc-400 mb-2">
                            Select Objective:
                          </label>
                          <div className="flex flex-wrap gap-2">
                            {TOPICS.map((t) => (
                              <button
                                key={t}
                                type="button"
                                onClick={() => setTopic(t)}
                                className={`px-3 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer border ${
                                  topic === t
                                    ? 'bg-primary/20 text-white border-primary shadow-[0_0_12px_rgba(212,84,126,0.3)] font-medium'
                                    : 'bg-white/5 text-zinc-400 border-white/10 hover:border-white/20 hover:text-white'
                                }`}
                                data-cursor="pointer"
                              >
                                {t}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Name & Email inputs in 2 columns */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[11px] font-mono text-zinc-400 mb-1">
                              Your Name
                            </label>
                            <input
                              type="text"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              placeholder="Alex Rivera"
                              required
                              className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-zinc-600 text-xs sm:text-sm focus:outline-none focus:border-primary/60 transition-all font-mono"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-mono text-zinc-400 mb-1">
                              Your Email
                            </label>
                            <input
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="alex@example.com"
                              required
                              className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-zinc-600 text-xs sm:text-sm focus:outline-none focus:border-primary/60 transition-all font-mono"
                            />
                          </div>
                        </div>

                        {/* Message */}
                        <div>
                          <label className="block text-[11px] font-mono text-zinc-400 mb-1">
                            Message Brief
                          </label>
                          <textarea
                            rows={3}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Tell me about your project, timeline, or idea..."
                            required
                            className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-zinc-600 text-xs sm:text-sm focus:outline-none focus:border-primary/60 transition-all font-mono resize-none"
                          />
                        </div>

                        {/* Submit Row */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                          <span className="text-[11px] text-zinc-500 font-mono">
                            ⚡ Instant transmission to Aniket's inbox
                          </span>

                          <div className="flex items-center gap-3">
                            <button
                              type="button"
                              onClick={() => setIsTerminalOpen(false)}
                              className="px-4 py-2 rounded-xl text-xs font-mono text-zinc-400 hover:text-white transition-colors cursor-pointer"
                            >
                              Cancel
                            </button>

                            <button
                              type="submit"
                              disabled={isSubmitting || !name.trim() || !email.trim() || !message.trim()}
                              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-primary to-primary-light text-white text-xs font-mono font-semibold shadow-md hover:shadow-primary/30 active:scale-95 disabled:opacity-40 disabled:pointer-events-none transition-all cursor-pointer"
                              data-cursor="pointer"
                            >
                              {isSubmitting ? (
                                <>
                                  <svg
                                    className="animate-spin -ml-1 mr-1 h-3.5 w-3.5 text-white"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                  >
                                    <circle
                                      className="opacity-25"
                                      cx="12"
                                      cy="12"
                                      r="10"
                                      stroke="currentColor"
                                      strokeWidth="4"
                                    />
                                    <path
                                      className="opacity-75"
                                      fill="currentColor"
                                      d="M4 12a8 8 0 018-8v8H4z"
                                    />
                                  </svg>
                                  <span>Transmitting...</span>
                                </>
                              ) : (
                                <>
                                  <span>Transmit Message ↵</span>
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      </form>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Availability */}
            <p className="contact-cta-availability mt-6 text-sm text-[var(--color-text-tertiary)]">
              Open to full-time roles &amp; freelance projects
            </p>

            {/* Desc */}
            <p className="contact-cta-desc mt-4 text-sm text-[var(--color-text-tertiary)] max-w-md mx-auto leading-relaxed">
              I build high-performance applications that turn complex ideas into seamless user experiences.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
