import LandingInitEffects from '@/views/landing/LandingInitEffects';
import StartButton from '@/views/landing/StartButton';
import LandingView from '@/views/LandingView';

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
