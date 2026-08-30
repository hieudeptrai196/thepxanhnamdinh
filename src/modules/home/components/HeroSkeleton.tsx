import { Skeleton } from '@/shared/components/ui/Skeleton';
import { Container } from '@/shared/components/ui/Container';

export function HeroSkeleton() {
  return (
    <section className="bg-dark-navy pt-6 lg:pt-10">
      <Container>
        <Skeleton variant="dark" className="w-full aspect-[16/10]" />
        <div className="py-10 lg:py-14">
          <Skeleton variant="dark" className="h-4 w-48 mb-3" />
          <Skeleton variant="dark" className="h-10 w-80 mb-6" />
          <Skeleton variant="dark" className="h-12 w-40 rounded-[var(--radius-default)]" />
        </div>
      </Container>
    </section>
  );
}
