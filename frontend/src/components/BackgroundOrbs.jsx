export function BackgroundOrbs() {
  return (
    <>
      <div
        className="fixed rounded-full pointer-events-none z-0 animate-float-orb"
        style={{
          width: 240, height: 240,
          top: 40, left: -40,
          background: 'var(--orb-1)',
          filter: 'blur(60px)',
          opacity: 0.9,
        }}
      />
      <div
        className="fixed rounded-full pointer-events-none z-0 animate-float-orb"
        style={{
          width: 280, height: 280,
          top: 120, right: -80,
          background: 'var(--orb-2)',
          filter: 'blur(70px)',
          opacity: 0.85,
          animationDelay: '1.5s',
        }}
      />
      <div
        className="fixed rounded-full pointer-events-none z-0 animate-float-orb"
        style={{
          width: 200, height: 200,
          bottom: 30, left: '18%',
          background: 'var(--orb-3)',
          filter: 'blur(60px)',
          opacity: 0.8,
          animationDelay: '3s',
        }}
      />
    </>
  );
}
