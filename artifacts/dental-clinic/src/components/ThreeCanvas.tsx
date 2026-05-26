import { Suspense, lazy, useState, useEffect } from 'react';

function isWebGLAvailable(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}

const ThreeScene = lazy(() =>
  import('@/components/ThreeScene').then((m) => ({ default: m.ThreeScene }))
);

export function CSSFallbackOrb() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="relative w-72 h-72">
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400/20 via-blue-500/15 to-purple-600/20 blur-3xl animate-pulse" />
        <div
          className="absolute inset-4 rounded-full border border-cyan-400/30 bg-gradient-to-br from-white/5 to-cyan-400/5 backdrop-blur-sm"
          style={{
            animation: 'spin 12s linear infinite',
            boxShadow: '0 0 60px rgba(6,182,212,0.3)',
          }}
        />
        <div
          className="absolute inset-12 rounded-full border border-cyan-300/20"
          style={{
            animation: 'spin 8s linear infinite reverse',
            background: 'linear-gradient(135deg, rgba(103,232,249,0.1), rgba(255,255,255,0.1))',
            boxShadow: '0 0 30px rgba(6,182,212,0.5)',
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            <div className="absolute inset-0 blur-xl rounded-full scale-150" style={{ background: 'rgba(6,182,212,0.35)' }} />
            <svg
              viewBox="0 0 80 100"
              className="w-24 h-24 relative z-10"
              style={{
                filter: 'drop-shadow(0 0 20px rgba(6,182,212,0.9))',
                animation: 'float 4s ease-in-out infinite',
              }}
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M40 5 C22 5, 8 18, 8 36 C8 50, 15 60, 22 70 C27 77, 30 87, 34 93 C36 96, 38 97, 40 97 C42 97, 44 96, 46 93 C50 87, 53 77, 58 70 C65 60, 72 50, 72 36 C72 18, 58 5, 40 5 Z"
                fill="url(#toothGrad)"
                stroke="rgba(6,182,212,0.5)"
                strokeWidth="1.5"
              />
              <path
                d="M28 22 C28 22, 34 18, 40 20 C46 18, 52 22, 52 22"
                stroke="rgba(186,230,253,0.6)"
                strokeWidth="1"
                fill="none"
              />
              <defs>
                <linearGradient id="toothGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.97)" />
                  <stop offset="40%" stopColor="rgba(224,242,254,0.93)" />
                  <stop offset="100%" stopColor="rgba(186,230,253,0.88)" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
        <div
          className="absolute rounded-full border border-cyan-400/15"
          style={{ inset: '-1rem', animation: 'ping 3s ease-in-out infinite' }}
        />
        <div
          className="absolute rounded-full border border-cyan-400/8"
          style={{ inset: '-2.5rem', animation: 'ping 3s ease-in-out infinite 0.7s' }}
        />
      </div>
    </div>
  );
}

export function ThreeCanvas() {
  const [webglAvailable, setWebglAvailable] = useState<boolean | null>(null);

  useEffect(() => {
    setWebglAvailable(isWebGLAvailable());
  }, []);

  if (webglAvailable === null) return <CSSFallbackOrb />;
  if (!webglAvailable) return <CSSFallbackOrb />;

  return (
    <Suspense fallback={<CSSFallbackOrb />}>
      <ThreeScene />
    </Suspense>
  );
}
