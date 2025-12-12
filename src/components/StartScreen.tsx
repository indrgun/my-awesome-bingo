interface StartScreenProps {
  onStart: () => void;
}

export function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-full p-6 bg-black overflow-hidden">
      {/* Floating stars - decorative ambient elements */}
      <div 
        className="absolute top-[15%] left-[20%] w-1 h-1 bg-white rounded-full opacity-40 animate-[float_8s_ease-in-out_infinite]"
        aria-hidden="true"
        style={{ animationDelay: '0s' }}
      />
      <div 
        className="absolute top-[25%] right-[15%] w-1.5 h-1.5 bg-white rounded-full opacity-30 animate-[float_12s_ease-in-out_infinite]"
        aria-hidden="true"
        style={{ animationDelay: '2s' }}
      />
      <div 
        className="absolute bottom-[30%] left-[10%] w-1 h-1 bg-white rounded-full opacity-50 animate-[float_10s_ease-in-out_infinite]"
        aria-hidden="true"
        style={{ animationDelay: '4s' }}
      />
      <div 
        className="absolute bottom-[20%] right-[25%] w-2 h-2 bg-white rounded-full opacity-30 animate-[float_15s_ease-in-out_infinite]"
        aria-hidden="true"
        style={{ animationDelay: '1s' }}
      />
      <div 
        className="absolute top-[40%] right-[35%] w-1 h-1 bg-white rounded-full opacity-40 animate-[float_11s_ease-in-out_infinite]"
        aria-hidden="true"
        style={{ animationDelay: '6s' }}
      />

      {/* Main content - centered vertical stack */}
      <div className="text-center max-w-md">
        {/* Title with subtle glow */}
        <h1 
          className="text-6xl md:text-7xl font-light text-white mb-4"
          style={{ 
            textShadow: '0 0 10px rgba(6, 182, 212, 0.4)',
            letterSpacing: '0.02em'
          }}
        >
          Soc Ops
        </h1>
        
        {/* Subtitle with generous letter-spacing */}
        <p className="text-lg md:text-xl text-gray-400 tracking-wide mb-8">
          Social Bingo
        </p>
        
        {/* Gradient divider */}
        <div 
          className="h-px w-24 mx-auto mb-8"
          style={{
            background: 'linear-gradient(90deg, #06b6d4 0%, #fbbf24 100%)'
          }}
        />
        
        {/* Tagline */}
        <p className="text-base md:text-lg text-gray-300 mb-12 font-light">
          Connect. Discover. Win.
        </p>
        
        {/* Single feature line */}
        <p className="text-sm md:text-base text-gray-400 mb-16 max-w-sm mx-auto leading-relaxed">
          Tap squares as you meet people who match{' '}
          <span className="text-nebula-violet">the questions</span>.
        </p>
        
        {/* Singular CTA button */}
        <button
          onClick={onStart}
          className="px-16 py-5 text-white text-lg font-light tracking-wide bg-transparent border-2 border-nebula-cyan rounded-sm transition-all duration-300 hover:border-[#22d3ee] hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] hover:scale-[1.02]"
        >
          Begin
        </button>
      </div>

      {/* Footer hint */}
      <div className="absolute bottom-8 left-0 right-0 text-center">
        <p className="text-xs text-gray-500 opacity-50">
          5×5 grid • 25 questions
        </p>
      </div>
    </div>
  );
}
