import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import {
  X,
  ExternalLink,
  Download,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Award,
  Maximize2
} from 'lucide-react';
import { Achievement } from '../../data/portfolioData';

interface HolographicCertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  certificate: Achievement | null;
  certificates?: Achievement[];
  onSelectCertificate?: (cert: Achievement) => void;
}

export const HolographicCertificateModal: React.FC<HolographicCertificateModalProps> = ({
  isOpen,
  onClose,
  certificate,
  certificates = [],
  onSelectCertificate,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showFoilEffect, setShowFoilEffect] = useState(true);

  // 3D Motion values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring physics for weighted feel
  const springConfig = { damping: 24, stiffness: 220, mass: 0.8 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Rotation ranges: -16deg to +16deg
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-16, 16]);
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [14, -14]);

  // Dynamic light glare positions (opposite to tilt)
  const glareX = useTransform(smoothX, [-0.5, 0.5], [85, 15]);
  const glareY = useTransform(smoothY, [-0.5, 0.5], [85, 15]);

  // Diagonal glass beam reflection transform (top-level hook)
  const glassBeamTransform = useTransform(
    [smoothX, smoothY],
    ([x, y]: number[]) => `translate(${x * 120}%, ${y * 120}%) rotate(32deg)`
  );

  // Prismatic foil gradient angle
  const [foilAngle, setFoilAngle] = useState(135);

  // Handle ESC key and keyboard arrows
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight' && certificates.length > 0 && certificate) {
        const currIndex = certificates.findIndex((c) => c.id === certificate.id);
        if (currIndex < certificates.length - 1 && onSelectCertificate) {
          onSelectCertificate(certificates[currIndex + 1]);
        }
      } else if (e.key === 'ArrowLeft' && certificates.length > 0 && certificate) {
        const currIndex = certificates.findIndex((c) => c.id === certificate.id);
        if (currIndex > 0 && onSelectCertificate) {
          onSelectCertificate(certificates[currIndex - 1]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    // Prevent body scroll when modal is active
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, certificate, certificates, onClose, onSelectCertificate]);

  // Handle mouse movement for 3D perspective
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    mouseX.set(x);
    mouseY.set(y);

    // Calculate angle in degrees for rotating iridescent foil
    const angle = Math.atan2(y, x) * (180 / Math.PI) + 180;
    setFoilAngle(Math.round(angle));
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleResetTilt = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleCopyId = () => {
    if (!certificate?.certificateId) return;
    navigator.clipboard.writeText(certificate.certificateId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!certificate) return null;

  const currentIndex = certificates.findIndex((c) => c.id === certificate.id);
  const totalCertificates = certificates.length;

  const isGoldFoil = certificate.featured || certificate.grade?.includes('Outstanding') || certificate.color === '#f59e0b';
  const foilAccentColor = isGoldFoil ? '#f59e0b' : certificate.color || '#3b82f6';

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-5 md:p-8 overflow-y-auto bg-black/85 backdrop-blur-xl selection:bg-amber-500/30"
          onClick={onClose}
        >
          {/* Ambient Cosmic Background Aura */}
          <div
            className="absolute inset-0 pointer-events-none opacity-40 transition-opacity duration-700"
            style={{
              background: `radial-gradient(circle at 50% 50%, ${foilAccentColor}22 0%, transparent 65%)`,
            }}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="relative w-full max-w-4xl bg-[#09090b]/95 border border-white/10 rounded-2xl md:rounded-3xl shadow-2xl shadow-black/80 overflow-hidden flex flex-col max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar: Header & Controls */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10 bg-white/[0.02]">
              <div className="flex items-center gap-3 min-w-0">
                {/* Holographic Seal Badge */}
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border border-white/10"
                  style={{
                    background: `linear-gradient(135deg, ${foilAccentColor}30, ${foilAccentColor}08)`,
                    color: foilAccentColor,
                  }}
                >
                  <Award className="w-5 h-5" />
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-sm md:text-base font-bold text-white truncate">
                      {certificate.title}
                    </h3>
                    {/* Real-time Verification Badge */}
                    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                      </span>
                      <span>Verified Credential</span>
                      <ShieldCheck className="w-3 h-3 text-emerald-400" />
                    </div>
                  </div>

                  <p className="text-xs text-white/50 truncate">
                    {certificate.organization} · {certificate.date}
                  </p>
                </div>
              </div>

              {/* Navigation & Close */}
              <div className="flex items-center gap-1.5 shrink-0 ml-2">
                {totalCertificates > 1 && (
                  <div className="hidden sm:flex items-center gap-1 mr-2 px-2 py-1 rounded-lg bg-white/5 border border-white/10 text-xs text-white/60">
                    <button
                      onClick={() => currentIndex > 0 && onSelectCertificate?.(certificates[currentIndex - 1])}
                      disabled={currentIndex === 0}
                      className="hover:text-white disabled:opacity-30 disabled:hover:text-white/60 transition-colors p-0.5 cursor-pointer"
                      title="Previous (Left Arrow)"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-[11px] font-mono px-1">
                      {currentIndex + 1}/{totalCertificates}
                    </span>
                    <button
                      onClick={() => currentIndex < totalCertificates - 1 && onSelectCertificate?.(certificates[currentIndex + 1])}
                      disabled={currentIndex === totalCertificates - 1}
                      className="hover:text-white disabled:opacity-30 disabled:hover:text-white/60 transition-colors p-0.5 cursor-pointer"
                      title="Next (Right Arrow)"
                    >
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
                  title="Close (Esc)"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Main 3D Holographic Stage */}
            <div
              className="certificate-3d-stage relative flex-1 flex items-center justify-center p-4 sm:p-6 md:p-8 overflow-hidden bg-radial from-white/[0.02] to-transparent"
              data-cursor="drag"
              style={{ perspective: 1200 }}
              onMouseMove={handleMouseMove}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {/* Interactive 3D Card Chassis */}
              <motion.div
                ref={cardRef}
                style={{
                  rotateX,
                  rotateY,
                  transformStyle: 'preserve-3d',
                }}
                className="relative max-w-2xl w-full rounded-xl md:rounded-2xl overflow-hidden select-none transition-shadow duration-300"
              >
                {/* 3D Deep Dynamic Shadow */}
                <div
                  className="absolute -inset-4 rounded-3xl -z-10 pointer-events-none transition-all duration-300"
                  style={{
                    boxShadow: isHovered
                      ? `0 35px 70px -15px rgba(0, 0, 0, 0.9), 0 0 50px -10px ${foilAccentColor}45`
                      : '0 25px 50px -15px rgba(0, 0, 0, 0.8)',
                  }}
                />

                {/* Outer Holographic Edge Border */}
                <div
                  className="absolute inset-0 rounded-xl md:rounded-2xl pointer-events-none z-30 transition-opacity duration-300"
                  style={{
                    padding: '2px',
                    background: `linear-gradient(${foilAngle}deg, ${foilAccentColor}99, rgba(255,255,255,0.7), ${foilAccentColor}40, rgba(255,255,255,0.9), ${foilAccentColor}80)`,
                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude',
                    opacity: isHovered ? 1 : 0.6,
                  }}
                />

                {/* Certificate High-Res Image Canvas */}
                <div className="relative bg-[#0d0d12] rounded-xl md:rounded-2xl overflow-hidden">
                  <img
                    src={certificate.previewImage || (certificate.pdfUrl ? certificate.pdfUrl.replace('.pdf', '.png') : '')}
                    alt={certificate.title}
                    className="w-full h-auto object-contain block select-none pointer-events-none"
                    loading="eager"
                  />

                  {/* Holographic Iridescent Security Foil Overlay */}
                  {showFoilEffect && (
                    <div
                      className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-300"
                      style={{
                        mixBlendMode: 'color-dodge',
                        opacity: isHovered ? 0.65 : 0.28,
                        background: `
                          radial-gradient(
                            circle at ${glareX.get()}% ${glareY.get()}%,
                            rgba(255, 255, 255, 0.7) 0%,
                            rgba(255, 255, 255, 0.2) 30%,
                            transparent 60%
                          ),
                          linear-gradient(
                            ${foilAngle}deg,
                            rgba(255, 0, 128, 0.15) 0%,
                            rgba(255, 215, 0, 0.3) 22%,
                            rgba(0, 255, 128, 0.2) 42%,
                            rgba(0, 220, 255, 0.28) 62%,
                            rgba(180, 0, 255, 0.22) 82%,
                            rgba(255, 0, 128, 0.15) 100%
                          )
                        `,
                      }}
                    />
                  )}

                  {/* High-Speed Diagonal Glass Reflection Beam */}
                  <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
                    <motion.div
                      className="w-[200%] h-full absolute -top-1/2 -left-1/2 pointer-events-none"
                      style={{
                        transform: glassBeamTransform,
                        background:
                          'linear-gradient(90deg, transparent 20%, rgba(255,255,255,0.08) 45%, rgba(255,255,255,0.38) 50%, rgba(255,255,255,0.08) 55%, transparent 80%)',
                      }}
                    />
                  </div>

                  {/* Embossed Official Hologram Seal Watermark */}
                  <div
                    className="absolute bottom-3 right-3 z-30 pointer-events-none px-2.5 py-1 rounded-lg border border-white/20 backdrop-blur-md flex items-center gap-1.5 shadow-lg"
                    style={{
                      background: `linear-gradient(135deg, ${foilAccentColor}35, rgba(0,0,0,0.5))`,
                    }}
                  >
                    <Sparkles
                      className="w-3 h-3 animate-spin"
                      style={{ color: foilAccentColor, animationDuration: '8s' }}
                    />
                    <span className="text-[10px] font-black tracking-wider uppercase text-white/90">
                      {certificate.grade || 'OFFICIAL CREDENTIAL'}
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* 3D Tilt Helper Hint */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 pointer-events-none px-3 py-1 rounded-full bg-black/60 border border-white/10 backdrop-blur-md flex items-center gap-1.5 text-[11px] text-white/60">
                <RotateCcw className="w-3 h-3 text-white/40" />
                <span>Move cursor to tilt 3D holographic foil</span>
              </div>
            </div>

            {/* Bottom Meta & Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3 border-t border-white/10 bg-white/[0.02]">
              {/* Credential ID with 1-Click Copy */}
              <div className="flex items-center gap-2">
                {certificate.certificateId ? (
                  <button
                    onClick={handleCopyId}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-white/80 hover:text-white transition-all cursor-pointer group"
                    title="Click to copy Credential ID"
                  >
                    <span>ID: {certificate.certificateId}</span>
                    {copied ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5 text-white/40 group-hover:text-white/80" />
                    )}
                    {copied && <span className="text-emerald-400 font-sans text-[11px]">Copied!</span>}
                  </button>
                ) : (
                  <span className="text-xs text-white/40 font-mono">Verified Institutional Credential</span>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 flex-wrap ml-auto">
                <button
                  onClick={() => setShowFoilEffect(!showFoilEffect)}
                  className={`px-2.5 py-1.5 rounded-lg border text-xs transition-all flex items-center gap-1 cursor-pointer ${
                    showFoilEffect
                      ? 'border-amber-500/40 bg-amber-500/10 text-amber-300'
                      : 'border-white/10 bg-white/5 text-white/50'
                  }`}
                  title="Toggle 3D Holographic Foil Reflection"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>Foil {showFoilEffect ? 'ON' : 'OFF'}</span>
                </button>

                <button
                  onClick={handleResetTilt}
                  className="px-2.5 py-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-xs text-white/70 hover:text-white transition-all flex items-center gap-1 cursor-pointer"
                  title="Reset 3D tilt orientation"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset Tilt</span>
                </button>

                {certificate.verificationUrl && (
                  <a
                    href={certificate.verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 text-xs font-semibold text-emerald-300 transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    <span>Verify Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}

                {certificate.pdfUrl && (
                  <a
                    href={certificate.pdfUrl}
                    download
                    className="px-3 py-1.5 rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 text-xs font-semibold text-white/90 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer"
                    title="Download original certificate document"
                  >
                    <Download className="w-3 h-3" />
                    <span>Download</span>
                  </a>
                )}

                {certificate.pdfUrl && (
                  <a
                    href={certificate.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-1.5 rounded-lg font-semibold text-xs text-white transition-all flex items-center gap-1.5 cursor-pointer shadow-md hover:brightness-110"
                    style={{
                      backgroundColor: foilAccentColor,
                    }}
                  >
                    <span>Open PDF</span>
                    <Maximize2 className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
