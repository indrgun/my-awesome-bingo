import { useEffect, useState } from 'react';

interface StartScreenProps {
  onStart: () => void;
}

export function StartScreen({ onStart }: StartScreenProps) {
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);

    // Trigger entrance animations
    setIsVisible(true);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;

    // Throttled mouse tracking for parallax
    let frameId: number;
    const handleMouseMove = (e: MouseEvent) => {
      if (frameId) return;
      
      frameId = requestAnimationFrame(() => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        setMousePos({ x, y });
        frameId = 0;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [prefersReducedMotion]);

  // Parallax offsets for different star layers
  const layer1Offset = { x: (mousePos.x - 0.5) * 40, y: (mousePos.y - 0.5) * 40 };
  const layer2Offset = { x: (mousePos.x - 0.5) * 25, y: (mousePos.y - 0.5) * 25 };
  const layer3Offset = { x: (mousePos.x - 0.5) * 15, y: (mousePos.y - 0.5) * 15 };

  return (
    <div className="relative min-h-full overflow-hidden bg-space-black">
      {/* Nebula Burst Background */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: 'radial-gradient(ellipse at center, var(--color-nebula-cyan) 0%, var(--color-nebula-violet) 50%, transparent 70%)',
          animation: prefersReducedMotion ? 'none' : 'nebulaPulse 5s ease-in-out infinite',
        }}
      />

      {/* Star Clusters - Layer 1 (Background) */}
      <div 
        className="absolute top-[10%] left-[15%] opacity-60"
        style={{
          transform: prefersReducedMotion ? 'none' : `translate(${layer3Offset.x}px, ${layer3Offset.y}px)`,
          animation: prefersReducedMotion ? 'none' : 'float 6s ease-in-out infinite',
        }}
        aria-hidden="true"
      >
        <div className="flex gap-2">
          <div className="w-2 h-2 bg-star-white rounded-full" style={{ boxShadow: '0 0 10px var(--color-star-white)' }} />
          <div className="w-1 h-1 bg-star-white rounded-full" style={{ boxShadow: '0 0 6px var(--color-star-white)' }} />
        </div>
      </div>

      {/* Star Clusters - Layer 2 (Middle) */}
      <div 
        className="absolute top-[60%] right-[20%] opacity-70"
        style={{
          transform: prefersReducedMotion ? 'none' : `translate(${layer2Offset.x}px, ${layer2Offset.y}px)`,
          animation: prefersReducedMotion ? 'none' : 'float 7s ease-in-out infinite 1s',
        }}
        aria-hidden="true"
      >
        <div className="flex flex-col gap-2">
          <div className="w-1.5 h-1.5 bg-nebula-cyan rounded-full" style={{ boxShadow: '0 0 12px var(--color-nebula-cyan)' }} />
          <div className="w-2 h-2 bg-nebula-cyan rounded-full" style={{ boxShadow: '0 0 15px var(--color-nebula-cyan)' }} />
          <div className="w-1 h-1 bg-nebula-cyan rounded-full" style={{ boxShadow: '0 0 8px var(--color-nebula-cyan)' }} />
        </div>
      </div>

      {/* Star Clusters - Layer 3 (Foreground) */}
      <div 
        className="absolute top-[30%] right-[10%] opacity-80"
        style={{
          transform: prefersReducedMotion ? 'none' : `translate(${layer1Offset.x}px, ${layer1Offset.y}px)`,
          animation: prefersReducedMotion ? 'none' : 'float 8s ease-in-out infinite 2s',
        }}
        aria-hidden="true"
      >
        <div className="flex gap-3">
          <div className="w-2 h-2 bg-nebula-violet rounded-full" style={{ boxShadow: '0 0 16px var(--color-nebula-violet)' }} />
          <div className="w-1.5 h-1.5 bg-nebula-violet rounded-full" style={{ boxShadow: '0 0 12px var(--color-nebula-violet)' }} />
        </div>
      </div>

      {/* Main Content Container */}
      <div className="relative flex flex-col items-center justify-center min-h-full p-6">
        {/* Hero Section - 70vh */}
        <div className="flex flex-col items-center justify-center text-center" style={{ minHeight: '70vh' }}>
          {/* Title with dramatic glow */}
          <h1 
            className={`text-6xl sm:text-7xl md:text-8xl font-bold text-star-white mb-6 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{
              textShadow: `
                0 0 20px var(--color-nebula-cyan),
                0 0 40px var(--color-nebula-cyan),
                0 0 60px var(--color-nebula-violet),
                0 0 10px var(--color-star-white)
              `,
              animation: prefersReducedMotion ? 'none' : 'typewriterGlow 2s ease-out',
              transitionDelay: '0.3s',
            }}
          >
            Soc Ops
          </h1>

          {/* Tagline with staggered word animation */}
          <div 
            className={`text-lg sm:text-xl md:text-2xl text-nebula-cyan mb-12 transition-opacity duration-700 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ transitionDelay: '0.6s' }}
          >
            <span 
              className="inline-block"
              style={{ 
                animation: prefersReducedMotion ? 'none' : 'fadeInWord 0.6s ease-out 0.8s both',
              }}
            >
              Break the ice.
            </span>{' '}
            <span 
              className="inline-block"
              style={{ 
                animation: prefersReducedMotion ? 'none' : 'fadeInWord 0.6s ease-out 1.0s both',
              }}
            >
              Make connections.
            </span>{' '}
            <span 
              className="inline-block"
              style={{ 
                animation: prefersReducedMotion ? 'none' : 'fadeInWord 0.6s ease-out 1.2s both',
              }}
            >
              Win together.
            </span>
          </div>

          {/* Feature Badges */}
          <div 
            className={`flex flex-wrap gap-4 justify-center mb-16 transition-opacity duration-700 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ transitionDelay: '0.9s' }}
          >
            <div 
              className="glass-badge group"
              style={{ 
                animation: prefersReducedMotion ? 'none' : 'fadeInBadge 0.5s ease-out 1.1s both',
              }}
            >
              <svg className="w-5 h-5 text-nebula-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
              </svg>
              <span className="text-star-white text-sm font-medium">5×5 Grid</span>
            </div>

            <div 
              className="glass-badge group"
              style={{ 
                animation: prefersReducedMotion ? 'none' : 'fadeInBadge 0.5s ease-out 1.3s both',
              }}
            >
              <svg className="w-5 h-5 text-cosmic-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-star-white text-sm font-medium">25 Questions</span>
            </div>

            <div 
              className="glass-badge group"
              style={{ 
                animation: prefersReducedMotion ? 'none' : 'fadeInBadge 0.5s ease-out 1.5s both',
              }}
            >
              <svg className="w-5 h-5 text-nebula-violet" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-star-white text-sm font-medium">Find Winners</span>
            </div>
          </div>

          {/* Launch Button */}
          <button
            onClick={onStart}
            className={`cosmic-button transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '1.2s' }}
            aria-label="Launch the game"
          >
            Launch Game
          </button>
        </div>
      </div>

      {/* Inline Styles for Animations */}
      <style>{`
        @keyframes nebulaPulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.05); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }

        @keyframes typewriterGlow {
          0% { 
            opacity: 0;
            text-shadow: 0 0 0 transparent;
          }
          50% {
            opacity: 0.5;
            text-shadow: 
              0 0 30px var(--color-nebula-cyan),
              0 0 60px var(--color-nebula-cyan),
              0 0 90px var(--color-nebula-violet);
          }
          100% {
            opacity: 1;
            text-shadow: 
              0 0 20px var(--color-nebula-cyan),
              0 0 40px var(--color-nebula-cyan),
              0 0 60px var(--color-nebula-violet),
              0 0 10px var(--color-star-white);
          }
        }

        @keyframes fadeInWord {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInBadge {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes pulseRing {
          0% {
            box-shadow: 0 0 0 0 var(--color-cosmic-gold);
          }
          100% {
            box-shadow: 0 0 0 8px transparent;
          }
        }

        .glass-badge {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.25rem;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 9999px;
          transition: all 0.3s ease;
          cursor: default;
        }

        .glass-badge:hover {
          transform: scale(1.05);
          background: rgba(255, 255, 255, 0.15);
          box-shadow: 0 0 20px rgba(0, 217, 255, 0.3);
        }

        .cosmic-button {
          position: relative;
          padding: 1rem 3rem;
          font-size: 1.125rem;
          font-weight: 600;
          color: var(--color-space-black);
          background: linear-gradient(135deg, var(--color-cosmic-gold) 0%, #f59e0b 100%);
          border: none;
          border-radius: 0.75rem;
          cursor: pointer;
          overflow: hidden;
          transition: all 0.3s ease;
          animation: pulseRing 2s infinite;
        }

        .cosmic-button::before {
          content: '';
          position: absolute;
          inset: -2px;
          background: linear-gradient(135deg, var(--color-cosmic-gold), #f59e0b);
          border-radius: 0.75rem;
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: -1;
          filter: blur(10px);
        }

        .cosmic-button:hover {
          transform: scale(1.05);
          box-shadow: 
            0 0 30px var(--color-cosmic-gold),
            0 0 60px rgba(251, 191, 36, 0.5);
        }

        .cosmic-button:hover::before {
          opacity: 1;
        }

        .cosmic-button:active {
          transform: scale(0.98);
          background: radial-gradient(circle at center, #fbbf24 0%, #f59e0b 50%, #d97706 100%);
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation: none !important;
            transition: none !important;
          }
        }

        @media (max-width: 640px) {
          .glass-badge {
            padding: 0.5rem 1rem;
          }
        }
      `}</style>
    </div>
  );
}
