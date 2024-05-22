'use client';

import ConfettiExplosion from 'confetti-explosion-react';

export default function Confetti({ amount }: { amount: number }) {
  return (
    <ConfettiExplosion
      force={0.4}
      duration={2000}
      particleCount={amount}
      height={1600}
      width={1600}
      particleSize={20}
    />
  );
}
