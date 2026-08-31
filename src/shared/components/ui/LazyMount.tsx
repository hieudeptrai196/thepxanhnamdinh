'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

type Props = {
  children: ReactNode;
  /** Rendered in place of the children until the block scrolls into view. */
  fallback?: ReactNode;
  /** How early to mount, relative to the viewport edge. */
  rootMargin?: string;
  className?: string;
};

/**
 * Defers mounting its children until they are about to enter the viewport.
 * Use it for anything expensive below the fold — third-party iframes above all,
 * so their network requests and scripts never run on initial page load.
 */
export function LazyMount({
  children,
  fallback = null,
  rootMargin = '200px',
  className,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMounted(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div ref={ref} className={className}>
      {mounted ? children : fallback}
    </div>
  );
}
