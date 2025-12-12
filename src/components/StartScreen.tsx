import { useEffect, useRef, useState } from 'react';

interface StartScreenProps {
  onStart: () => void;
}

interface FeatureCardProps {
  icon: string;
  heading: string;
  description: string;
  stat: string;
  index: number;
}

function FeatureCard({ icon, heading, description, stat, index }: FeatureCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => setIsVisible(true), index * 150);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [index]);

  return (
    <div
      ref={cardRef}
      className={`group relative backdrop-blur-md bg-white/10 border-2 border-nebula-cyan/30 rounded-2xl p-6 transition-all duration-300 will-change-transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } hover:border-cosmic-gold hover:shadow-[0_0_30px_rgba(255,215,0,0.3)] hover:-translate-y-1`}
      style={{ contain: 'layout style paint' }}
    >
      <div className="text-5xl mb-4" role="img" aria-label={heading}>
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-3">{heading}</h3>
      <p className="text-gray-300 text-sm leading-relaxed mb-4">{description}</p>
      <div className="inline-block px-3 py-1 bg-nebula-cyan/20 border border-nebula-cyan/40 rounded-full text-xs text-nebula-cyan font-semibold">
        {stat}
      </div>
    </div>
  );
}

export function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className="min-h-full bg-gradient-to-br from-deep-space via-stellar-purple/20 to-deep-space overflow-y-auto">
      {/* Compact Header - 20% viewport */}
      <header className="flex flex-col items-center justify-center min-h-[20vh] p-6 text-center">
        <h1 
          className="text-5xl md:text-6xl font-bold text-white mb-2 animate-pulse drop-shadow-[0_0_20px_rgba(0,212,255,0.8)]"
          style={{
            animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
          }}
        >
          Soc Ops
        </h1>
        <p className="text-2xl text-nebula-cyan font-semibold mb-2">Social Bingo</p>
        <p className="text-gray-400 text-sm">Break the ice, make connections, have fun!</p>
      </header>

      {/* Feature Grid - 50% viewport */}
      <section className="min-h-[50vh] px-6 py-8" aria-labelledby="features-heading">
        <h2 id="features-heading" className="sr-only">Game Features</h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard
            icon="🎯"
            heading="Interactive Grid"
            description="Tap squares on your 5×5 board as you meet people matching each prompt. Every game is unique with shuffled questions."
            stat="25 questions"
            index={0}
          />
          <FeatureCard
            icon="👥"
            heading="Break the Ice"
            description="Transform awkward small talk into engaging conversations. Perfect for team events, conferences, and social mixers."
            stat="5×5 board"
            index={1}
          />
          <FeatureCard
            icon="🏆"
            heading="Win Together"
            description="Race to complete 5 in a row—horizontal, vertical, or diagonal. Multiple ways to win means everyone stays engaged!"
            stat="12 win patterns"
            index={2}
          />
        </div>
      </section>

      {/* How It Works Section */}
      <section className="px-6 py-8" aria-labelledby="how-it-works-heading">
        <h2 id="how-it-works-heading" className="text-2xl font-bold text-white text-center mb-8">
          How It Works
        </h2>
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center relative">
              <div className="w-12 h-12 rounded-full bg-nebula-cyan text-deep-space font-bold text-xl flex items-center justify-center mb-3 shadow-[0_0_20px_rgba(0,212,255,0.6)]">
                1
              </div>
              <div className="text-4xl mb-2">👆</div>
              <p className="text-white font-semibold text-sm">Tap squares</p>
              <p className="text-gray-400 text-xs mt-1">Mark matches you find</p>
            </div>

            {/* Connector 1 */}
            <div className="hidden md:block w-16 h-0.5 bg-gradient-to-r from-nebula-cyan via-aurora-green to-cosmic-gold opacity-60" />
            <div className="md:hidden w-0.5 h-8 bg-gradient-to-b from-nebula-cyan via-aurora-green to-cosmic-gold opacity-60" />

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center relative">
              <div className="w-12 h-12 rounded-full bg-aurora-green text-deep-space font-bold text-xl flex items-center justify-center mb-3 shadow-[0_0_20px_rgba(0,255,136,0.6)]">
                2
              </div>
              <div className="text-4xl mb-2">🔍</div>
              <p className="text-white font-semibold text-sm">Find matches</p>
              <p className="text-gray-400 text-xs mt-1">Meet and mingle</p>
            </div>

            {/* Connector 2 */}
            <div className="hidden md:block w-16 h-0.5 bg-gradient-to-r from-aurora-green to-cosmic-gold opacity-60" />
            <div className="md:hidden w-0.5 h-8 bg-gradient-to-b from-aurora-green to-cosmic-gold opacity-60" />

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center relative">
              <div className="w-12 h-12 rounded-full bg-cosmic-gold text-deep-space font-bold text-xl flex items-center justify-center mb-3 shadow-[0_0_20px_rgba(255,215,0,0.6)]">
                3
              </div>
              <div className="text-4xl mb-2">🎉</div>
              <p className="text-white font-semibold text-sm">Get BINGO!</p>
              <p className="text-gray-400 text-xs mt-1">Complete 5 in a row</p>
            </div>
          </div>
        </div>
      </section>

      {/* Dual Call-to-Action */}
      <section className="px-6 py-8" aria-labelledby="cta-heading">
        <h2 id="cta-heading" className="sr-only">Start Playing</h2>
        <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-center">
          <button
            onClick={onStart}
            className="relative px-8 py-4 bg-gradient-to-r from-cosmic-gold to-yellow-500 text-deep-space font-bold text-lg rounded-xl transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,215,0,0.6)] hover:scale-105 active:scale-95 flex-1 sm:flex-initial shadow-[0_0_20px_rgba(255,215,0,0.4)]"
            style={{
              animation: 'pulse-glow 2s ease-in-out infinite'
            }}
            aria-label="Start playing Social Bingo game"
          >
            Start Playing
          </button>
          <button
            onClick={() => {
              // Placeholder for view rules functionality
              // Could toggle an expandable section or navigate
            }}
            className="px-6 py-4 bg-transparent border-2 border-nebula-cyan text-nebula-cyan font-semibold text-base rounded-xl transition-all duration-300 hover:bg-nebula-cyan/10 hover:shadow-[0_0_20px_rgba(0,212,255,0.4)] active:scale-95 flex-1 sm:flex-initial"
            aria-label="View game rules"
          >
            View Rules
          </button>
        </div>
      </section>

      {/* Footer Stats Bar */}
      <footer className="px-6 py-6 mt-8">
        <div className="max-w-4xl mx-auto backdrop-blur-sm bg-white/5 border border-white/10 rounded-lg py-4 px-6">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-gray-300">
            <span>5 minute games</span>
            <span className="hidden sm:inline text-cosmic-gold">•</span>
            <span>Perfect for 10-50 people</span>
            <span className="hidden sm:inline text-cosmic-gold">•</span>
            <span>No signup required</span>
          </div>
        </div>
      </footer>

      {/* Custom animations */}
      <style>{`
        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(255, 215, 0, 0.4);
          }
          50% {
            box-shadow: 0 0 40px rgba(255, 215, 0, 0.8), 0 0 60px rgba(255, 215, 0, 0.4);
          }
        }
      `}</style>
    </div>
  );
}
