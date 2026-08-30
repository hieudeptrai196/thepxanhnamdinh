import { Skeleton } from '@/shared/components/ui/Skeleton';
import { Container } from '@/shared/components/ui/Container';

export function StandingsSkeleton() {
  return (
    <section className="py-[var(--section-gap)] bg-bg-primary">
      <Container>
        <Skeleton className="h-8 w-40 mb-2" />
        <Skeleton className="h-4 w-32 mb-6" />
        <div className="space-y-0">
          <Skeleton className="h-10 w-full mb-1" />
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-14 w-full mb-1" />
          ))}
        </div>
      </Container>
    </section>
  );
}
