import { Skeleton } from '@/shared/components/ui/Skeleton';
import { Container } from '@/shared/components/ui/Container';

export function NewsSkeleton() {
  return (
    <section className="py-[var(--section-gap)] bg-bg-secondary">
      <Container>
        <Skeleton className="h-8 w-32 mb-2" />
        <Skeleton className="h-4 w-48 mb-6" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          <div className="lg:col-span-7">
            <Skeleton className="w-full aspect-[16/10] rounded-[var(--radius-default)]" />
            <Skeleton className="h-5 w-20 mt-4 rounded-[var(--radius-badge)]" />
            <Skeleton className="h-7 w-full mt-3" />
            <Skeleton className="h-7 w-3/4 mt-1" />
            <Skeleton className="h-4 w-24 mt-3" />
          </div>
          <div className="lg:col-span-5 flex flex-col gap-5">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex gap-4 pb-5 border-b border-[var(--border-color)] last:border-0">
                <Skeleton className="w-28 h-20 shrink-0 rounded-[var(--radius-default)]" />
                <div className="flex-1">
                  <Skeleton className="h-3 w-12 mb-2 rounded-[var(--radius-badge)]" />
                  <Skeleton className="h-5 w-full mb-1" />
                  <Skeleton className="h-5 w-2/3" />
                  <Skeleton className="h-3 w-20 mt-2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
