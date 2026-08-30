import { Skeleton } from '@/shared/components/ui/Skeleton';
import { Container } from '@/shared/components/ui/Container';

export function MatchCenterSkeleton() {
  return (
    <section className="bg-dark-navy py-[var(--section-gap)]">
      <Container>
        <Skeleton variant="dark" className="h-8 w-56 mb-2" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-white/10 rounded-[var(--radius-default)] overflow-hidden mt-6">
          {[0, 1].map((i) => (
            <div key={i} className={`${i === 0 ? 'bg-dark-navy' : 'bg-charcoal'} p-6 lg:p-8`}>
              <Skeleton variant="dark" className="h-4 w-32 mb-6" />
              <Skeleton variant="dark" className="h-3 w-full mb-4" />
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Skeleton variant="dark" className="size-12 rounded-full" />
                  <Skeleton variant="dark" className="h-5 w-16" />
                </div>
                <Skeleton variant="dark" className="h-10 w-20" />
                <div className="flex items-center gap-3">
                  <Skeleton variant="dark" className="h-5 w-16" />
                  <Skeleton variant="dark" className="size-12 rounded-full" />
                </div>
              </div>
              <Skeleton variant="dark" className="h-px w-full mt-4 mb-3" />
              <Skeleton variant="dark" className="h-3 w-full" />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
