'use client';

import { useState, useEffect, type ReactNode } from 'react';
import { Skeleton } from './Skeleton';

type Props = {
  children: ReactNode;
  count?: number;
  skeleton?: 'card' | 'row';
  className?: string;
};

function CardSkeleton() {
  return (
    <div className="bg-bg-secondary rounded-[var(--radius-default)] border border-[var(--border-color)] p-4 sm:p-5">
      <Skeleton className="w-full aspect-[3/4] mb-4" />
      <Skeleton className="h-5 w-3/4 mb-2" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  );
}

function RowSkeleton() {
  return (
    <div className="bg-bg-secondary rounded-[var(--radius-default)] border border-[var(--border-color)] p-4 sm:p-5">
      <div className="flex items-center gap-4">
        <Skeleton className="size-10 rounded-full shrink-0" />
        <div className="flex-1">
          <Skeleton className="h-5 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/2" />
        </div>
        <Skeleton className="h-8 w-16" />
      </div>
    </div>
  );
}

export function ContentLoader({ children, count = 6, skeleton = 'card', className }: Props) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    const SkeletonItem = skeleton === 'card' ? CardSkeleton : RowSkeleton;
    return (
      <div className={className ?? 'grid gap-4 sm:grid-cols-2 lg:grid-cols-3'}>
        {Array.from({ length: count }).map((_, i) => (
          <SkeletonItem key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className={className ?? 'grid gap-4 sm:grid-cols-2 lg:grid-cols-3'}>
      {children}
    </div>
  );
}
