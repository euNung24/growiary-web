import LandingInitEffects from '@/shared/views/landing/LandingInitEffects';
import StartButton from '@/shared/views/landing/StartButton';
import LandingView from '@/shared/views/LandingView';

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
