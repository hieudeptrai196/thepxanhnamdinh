'use client';

import { useEffect, useState } from 'react';

type Props = {
  end: number;
  duration?: number;
  suffix?: string;
  active: boolean;
};

export function CountUp({ end, duration = 1500, suffix = '', active }: Props) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;

    let start = 0;
    const startTime = performance.now();

    function step(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * end);

      if (current !== start) {
        setCount(current);
        start = current;
      }

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }, [active, end, duration]);

  return (
    <span className="animate-count-pulse">
      {count.toLocaleString()}{suffix}
    </span>
  );
}
