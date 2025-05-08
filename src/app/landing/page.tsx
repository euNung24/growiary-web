import LandingInitEffects from '@/user/features/landing/components/LandingInitEffects';
import StartButton from '@/user/features/landing/components/StartButton';
import LandingView from '@/user/features/landing/components/LandingView';

export default function Home() {
  return (
    <>
      <LandingView>
        <StartButton />
      </LandingView>
      <LandingInitEffects />
    </>
  );
}
