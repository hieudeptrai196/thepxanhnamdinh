import {
  HeroSkeleton,
  MatchCenterSkeleton,
  StandingsSkeleton,
  NewsSkeleton,
} from '@/modules/home';

export default function HomeLoading() {
  return (
    <>
      <HeroSkeleton />
      <MatchCenterSkeleton />
      <StandingsSkeleton />
      <NewsSkeleton />
    </>
  );
}
