'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const CREST_DELAY = 300;
const PROGRESS_DELAY = 600;
const PROGRESS_DURATION = 1400;
const GATE_OPEN_DELAY = 2500;
const GATE_OPEN_DURATION = 800;

export function LoadingScreen() {
  const [phase, setPhase] = useState<
    'closed' | 'crest' | 'progress' | 'opening' | 'done'
  >('closed');

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase('crest'), CREST_DELAY),
      setTimeout(() => setPhase('progress'), PROGRESS_DELAY),
      setTimeout(() => setPhase('opening'), GATE_OPEN_DELAY),
      setTimeout(() => setPhase('done'), GATE_OPEN_DELAY + GATE_OPEN_DURATION),
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  if (phase === 'done') return null;

  const gatesOpening = phase === 'opening';
  const showContent = phase !== 'closed' && !gatesOpening;

  return (
    <div
      className="fixed inset-0 z-[100] overflow-hidden"
      aria-hidden="true"
    >
      {/* Top panel — starts closed (translateY(0)) */}
      <div
        className="absolute inset-x-0 top-0 h-1/2 bg-dark-navy"
        style={{
          transform: gatesOpening ? 'translateY(-100%)' : 'translateY(0)',
          transition: gatesOpening
            ? `transform ${GATE_OPEN_DURATION}ms cubic-bezier(0.65, 0, 0.35, 1)`
            : 'none',
        }}
      >
        <div className="absolute inset-0 loading-grain" />
      </div>

      {/* Bottom panel — starts closed (translateY(0)) */}
      <div
        className="absolute inset-x-0 bottom-0 h-1/2 bg-dark-navy"
        style={{
          transform: gatesOpening ? 'translateY(100%)' : 'translateY(0)',
          transition: gatesOpening
            ? `transform ${GATE_OPEN_DURATION}ms cubic-bezier(0.65, 0, 0.35, 1)`
            : 'none',
        }}
      >
        <div className="absolute inset-0 loading-grain" />
      </div>

      {/* Center content — crest + progress */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
        style={{
          opacity: gatesOpening ? 0 : showContent ? 1 : 0,
          transition: gatesOpening
            ? 'opacity 300ms ease-out'
            : 'opacity 400ms ease-in',
        }}
      >
        {/* Club crest */}
        <div
          style={{
            opacity: showContent ? 1 : 0,
            transform: showContent ? 'scale(1)' : 'scale(0.8)',
            transition: 'all 500ms ease-out',
          }}
        >
          <Image
            src="/images/logo.png"
            alt=""
            width={120}
            height={120}
            className="size-[120px]"
            priority
          />
        </div>

        {/* Progress bar */}
        <div className="mt-8 w-48 h-[2px] bg-white/10 overflow-hidden">
          <div
            className="h-full bg-club-blue"
            style={{
              width:
                phase === 'progress' || phase === 'opening' ? '100%' : '0%',
              transition:
                phase === 'progress'
                  ? `width ${PROGRESS_DURATION}ms ease-in-out`
                  : 'none',
            }}
          />
        </div>
      </div>
    </div>
  );
}
