import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Copy,
  Check,
  Send,
  Sparkles,
  FileText,
  ExternalLink,
} from 'lucide-react';
import { PORTFOLIO_DATA } from '@/data/portfolioData';
import { sendContactMessage, isWeb3FormsConfigured } from '@/lib/contact';
import { GithubIcon } from '@/components/ui/Icons';
import { useLanguage } from '@/context/LanguageContext';

const QUICK_TEMPLATES = [
  {
    id: 'sde-role',
    label: '💼 SDE Opportunity',
    topic: 'Full-time role',
    message:
      "Hi Aniket, I came across your portfolio and was impressed by your full-stack engineering work on NexPOS and NexLearn AI. I'd love to discuss a Software Engineer / Full-Stack Developer role with you.",
  },
  {
    id: 'freelance',
    label: '🚀 Project / Freelance',
    topic: 'Freelance project',
    message:
      "Hi Aniket, I have a high-performance web platform in mind and would love your engineering expertise on architecture and implementation. Let's schedule a call.",
  },
  {
    id: 'collab',
    label: '🤝 Collaboration',
    topic: 'Collaboration',
    message:
      "Hey Aniket, your generative AI tools and trading terminal architectures look incredible. I'd love to connect, brainstorm, and collaborate on cutting-edge engineering.",
  },
  {
    id: 'chat',
    label: '☕ Coffee Chat',
    topic: 'Just saying hi',
    message:
      "Hey Aniket, just wanted to say hi! Your portfolio UI/UX and system design standards are outstanding. Let's stay connected on LinkedIn & GitHub.",
  },
];

const TOPICS = [
  'Full-time role',
  'Freelance project',
  'Collaboration',
  'Technical Consultation',
  'Just saying hi',
];

interface ContactPageProps {
  onNavigate?: (route: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const { t, isHindi } = useLanguage();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('Full-time role');
  const [timeline, setTimeline] = useState('Immediate / Flexible');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Copy status
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  // Live Local Time in India (IST)
  const [istTime, setIstTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      setIstTime(new Intl.DateTimeFormat('en-US', options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopy = (text: string, type: 'email' | 'phone') => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(text);
      if (type === 'email') {
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2000);
      } else {
        setCopiedPhone(true);
        setTimeout(() => setCopiedPhone(false), 2000);
      }
    }
  };

  const handleApplyTemplate = (tmpl: (typeof QUICK_TEMPLATES)[0]) => {
    setTopic(tmpl.topic);
    setMessage(tmpl.message);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    setIsSubmitting(true);
    setErrorMessage(null);

    const fullMessage = `[Timeline: ${timeline}]\n\n${message}`;

    const result = await sendContactMessage({
      name,
      email,
      topic,
      message: fullMessage,
    });

    setIsSubmitting(false);

    if (result.success) {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ec4899', '#3b82f6', '#10b981', '#f59e0b'],
      });

      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setName('');
        setEmail('');
        setMessage('');
      }, 6000);
    } else {
      setErrorMessage(result.message);
    }
  };

  return (
    <div className="relative min-h-screen py-24 md:py-32 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto selection:bg-primary/30">
      {/* ── Soft Ambient Glow ── */}
      <div className="fixed top-12 left-1/2 -translate-x-1/2 w-[90vw] max-w-[850px] h-[350px] pointer-events-none -z-10 blur-[130px] opacity-25 bg-[radial-gradient(ellipse_at_center,#ec4899_0%,transparent_70%)]" />

      {/* ── Breadcrumb Bar ── */}
      <div className="flex items-center justify-center gap-2 text-xs font-mono text-zinc-500 mb-5">
        <button
          type="button"
          onClick={() => onNavigate?.('/')}
          className="hover:text-primary transition-colors cursor-pointer"
        >
          {t.nav.home}
        </button>
        <span>/</span>
        <span className="text-zinc-300">{t.nav.contact}</span>
      </div>

      {/* ── Header ── */}
      <div className="text-center mb-12 sm:mb-16">
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs font-semibold uppercase tracking-[0.25em] text-primary mb-3 font-mono inline-flex items-center gap-2"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{t.contact.sectionBadge}</span>
          <Sparkles className="w-3.5 h-3.5" />
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="text-4xl md:text-6xl font-black tracking-tight text-white mb-4"
        >
          {t.contact.heading}{' '}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-rose-400 to-amber-300">
            {t.contact.headingAccent}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="text-sm sm:text-base text-zinc-300 max-w-xl mx-auto leading-relaxed"
        >
          {t.contact.subtitle}
        </motion.p>
      </div>

      {/* ── Two-Column Interactive Layout ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* ═══════════════════════════════════════════════════════════
         *  LEFT COLUMN: Direct Contact, Fast Guarantee & Availability
         * ═══════════════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-5 space-y-6"
        >
          {/* Availability Card with Live Radar Ring */}
          <div className="p-6 rounded-3xl bg-[#0d0f17] border border-white/10 shadow-xl relative overflow-hidden">
            <div className="flex items-center gap-3 mb-4">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
              </span>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
                Available for New Opportunities
              </span>
            </div>

            <h3 className="text-lg font-bold text-white mb-2">
              Ready to create immediate engineering impact
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-4">
              Specialized in high-velocity full-stack development, modern React 19/Next.js architectures,
              Spring Boot enterprise backends, and low-latency WebSockets.
            </p>

            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 pt-3 border-t border-white/10">
              <Clock className="w-3.5 h-3.5 text-primary" />
              <span>Typical Response Time: &lt; 2 Hours</span>
            </div>
          </div>

          {/* Direct Contact Methods with 1-Click Copy */}
          <div className="p-6 rounded-3xl bg-[#0d0f17] border border-white/10 shadow-xl space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-400 font-semibold mb-3">
              Direct Contact Details
            </h4>

            {/* Email Card */}
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/15 transition-all">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-pink-500/15 text-pink-400 flex items-center justify-center shrink-0 border border-pink-500/25">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase block">Email</span>
                  <a
                    href={`mailto:${PORTFOLIO_DATA.personal.email}`}
                    className="text-xs sm:text-sm font-mono text-white hover:text-primary transition-colors truncate block"
                  >
                    {PORTFOLIO_DATA.personal.email}
                  </a>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleCopy(PORTFOLIO_DATA.personal.email, 'email')}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/15 text-zinc-400 hover:text-white transition-colors cursor-pointer shrink-0 ml-2"
                title="Copy email to clipboard"
              >
                {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Phone Card */}
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/15 transition-all">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/25">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase block">Phone / WhatsApp</span>
                  <a
                    href={`tel:${PORTFOLIO_DATA.personal.phone.replace(/\s+/g, '')}`}
                    className="text-xs sm:text-sm font-mono text-white hover:text-emerald-400 transition-colors truncate block"
                  >
                    {PORTFOLIO_DATA.personal.phone}
                  </a>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleCopy(PORTFOLIO_DATA.personal.phone, 'phone')}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/15 text-zinc-400 hover:text-white transition-colors cursor-pointer shrink-0 ml-2"
                title="Copy phone to clipboard"
              >
                {copiedPhone ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Location & Timezone Clock */}
            <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/25">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase block">Location</span>
                  <p className="text-xs sm:text-sm font-medium text-white truncate">
                    {PORTFOLIO_DATA.personal.location}
                  </p>
                  <p className="text-[11px] font-mono text-amber-400/90 mt-1 flex items-center gap-1.5">
                    <span>Local Time (IST):</span>
                    <span className="font-bold text-white">{istTime || '18:55 PM'}</span>
                    <span className="text-zinc-500">• Open to Relocation &amp; Remote</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Resume Quick Action */}
            <a
              href={PORTFOLIO_DATA.personal.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3.5 rounded-2xl bg-primary/15 hover:bg-primary/25 border border-primary/30 text-white transition-all group"
            >
              <div className="flex items-center gap-3">
                <FileText className="w-4 h-4 text-primary" />
                <span className="text-xs sm:text-sm font-semibold">Download Verified Resume (PDF)</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-primary group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>

          {/* Social Profiles Row */}
          <div className="p-6 rounded-3xl bg-[#0d0f17] border border-white/10 shadow-xl">
            <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-400 font-semibold mb-3">
              Professional Profiles &amp; Networks
            </h4>
            <div className="flex flex-wrap items-center gap-2.5">
              <a
                href={PORTFOLIO_DATA.personal.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-zinc-300 hover:text-[#0077b5] border border-white/10 text-xs font-mono transition-all hover:scale-105"
              >
                <span>LinkedIn</span>
              </a>

              <a
                href={PORTFOLIO_DATA.personal.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-zinc-300 hover:text-white border border-white/10 text-xs font-mono transition-all hover:scale-105"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>

              <a
                href={PORTFOLIO_DATA.personal.socials.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-zinc-300 hover:text-[#FFA116] border border-white/10 text-xs font-mono transition-all hover:scale-105"
              >
                <span>LeetCode</span>
              </a>

              <a
                href={PORTFOLIO_DATA.personal.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-zinc-300 hover:text-pink-400 border border-white/10 text-xs font-mono transition-all hover:scale-105"
              >
                <span>Instagram</span>
              </a>
            </div>
          </div>

          {/* Quick Portfolio Shortcuts */}
          {onNavigate && (
            <div className="p-6 rounded-3xl bg-[#0d0f17] border border-white/10 shadow-xl space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-400 font-semibold">
                Explore Other Pages
              </h4>
              <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
                <button
                  type="button"
                  onClick={() => onNavigate('/projects')}
                  className="p-2.5 rounded-2xl bg-white/[0.03] hover:bg-primary/20 text-zinc-300 hover:text-white border border-white/10 hover:border-primary/40 transition-all cursor-pointer flex flex-col items-center gap-1"
                >
                  <span className="text-base">🚀</span>
                  <span>Projects</span>
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('/blog')}
                  className="p-2.5 rounded-2xl bg-white/[0.03] hover:bg-primary/20 text-zinc-300 hover:text-white border border-white/10 hover:border-primary/40 transition-all cursor-pointer flex flex-col items-center gap-1"
                >
                  <span className="text-base">📖</span>
                  <span>Journal</span>
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('/wall')}
                  className="p-2.5 rounded-2xl bg-white/[0.03] hover:bg-primary/20 text-zinc-300 hover:text-white border border-white/10 hover:border-primary/40 transition-all cursor-pointer flex flex-col items-center gap-1"
                >
                  <span className="text-base">🎨</span>
                  <span>The Wall</span>
                </button>
              </div>
            </div>
          )}
        </motion.div>

        {/* ═══════════════════════════════════════════════════════════
         *  RIGHT COLUMN: High-Conversion Interactive Form + Quick Fill
         * ═══════════════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.25 }}
          className="lg:col-span-7"
        >
          <div className="p-6 sm:p-9 rounded-3xl bg-[#0d0f17] border border-white/15 shadow-2xl relative">
            {/* Quick Fill Templates Ribbon */}
            <div className="mb-6 pb-5 border-b border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                <span className="text-xs font-mono uppercase tracking-wider text-zinc-300 font-semibold">
                  Quick Message Templates (1-Click Fill)
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {QUICK_TEMPLATES.map((tmpl) => (
                  <button
                    key={tmpl.id}
                    type="button"
                    onClick={() => handleApplyTemplate(tmpl)}
                    className="px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-zinc-300 hover:text-white border border-white/10 text-xs font-medium transition-all cursor-pointer hover:scale-105 active:scale-95"
                  >
                    {tmpl.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Main Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name & Email Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5 font-mono">
                    {t.contact.formName} *
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={isHindi ? 'जैसे: साराह कॉनर' : 'e.g. Sarah Connor'}
                    required
                    className="w-full px-4 py-3 rounded-2xl bg-white/[0.04] border border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:border-primary/60 transition-all text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5 font-mono">
                    {t.contact.formEmail} *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="sarah@company.com"
                    required
                    className="w-full px-4 py-3 rounded-2xl bg-white/[0.04] border border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:border-primary/60 transition-all text-sm"
                  />
                </div>
              </div>

              {/* Topic Selector */}
              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2 font-mono">
                  Primary Topic
                </label>
                <div className="flex flex-wrap gap-2">
                  {TOPICS.map((t) => (
                    <button
                      type="button"
                      key={t}
                      onClick={() => setTopic(t)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer border ${
                        topic === t
                          ? 'bg-primary/25 text-white border-primary shadow-[0_0_15px_rgba(236,72,153,0.3)]'
                          : 'bg-white/[0.03] text-zinc-400 border-white/10 hover:border-white/25 hover:text-white'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Timeline / Urgency Selector */}
              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5 font-mono">
                  Timeline / Start Date
                </label>
                <select
                  value={timeline}
                  onChange={(e) => setTimeline(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-2xl bg-[#141622] border border-white/10 text-white focus:outline-none focus:border-primary/60 text-xs sm:text-sm font-mono cursor-pointer"
                >
                  <option value="Immediate / ASAP">⚡ Immediate / ASAP</option>
                  <option value="Within 1 to 2 Weeks">Within 1 to 2 Weeks</option>
                  <option value="Next Month">Next Month</option>
                  <option value="Flexible / Exploratory">Flexible / Exploratory</option>
                </select>
              </div>

              {/* Message Area */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider font-mono">
                    {t.contact.formMessage} *
                  </label>
                  <span className="text-[10.5px] font-mono text-zinc-500">
                    {message.length} {isHindi ? 'वर्ण' : 'characters'}
                  </span>
                </div>
                <textarea
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={isHindi ? 'अपनी भूमिका, इंजीनियरिंग आवश्यकताओं या प्रश्नों का विवरण साझा करें...' : 'Share details regarding your role, engineering requirements, or questions...'}
                  required
                  className="w-full px-4 py-3 rounded-2xl bg-white/[0.04] border border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:border-primary/60 transition-all resize-none text-sm leading-relaxed"
                />
              </div>

              {/* Error Message Alert */}
              {errorMessage && (
                <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-mono">
                  ⚠️ {errorMessage}
                </div>
              )}

              {/* Action Button & Status */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting || !name.trim() || !email.trim() || !message.trim()}
                  className="flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-primary hover:brightness-110 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-pink-500/30 transition-all cursor-pointer hover:scale-105 active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                      <span>{t.contact.sending}</span>
                    </>
                  ) : (
                    <>
                      <span>{t.contact.sendMessage}</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>

                <div>
                  {submitted ? (
                    <span className="text-xs font-bold text-emerald-400 animate-pulse font-mono flex items-center gap-1.5">
                      ✓ {t.contact.sentSuccess}
                    </span>
                  ) : (
                    <span className="text-[11px] font-mono text-zinc-500">
                      {isWeb3FormsConfigured ? (
                        <span className="text-emerald-400/80">⚡ Direct Gmail Delivery Active</span>
                      ) : (
                        <span className="text-zinc-500">{isHindi ? 'सुरक्षित एन्क्रिप्टेड ट्रांसमिशन' : 'Encrypted transmission'}</span>
                      )}
                    </span>
                  )}
                </div>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
