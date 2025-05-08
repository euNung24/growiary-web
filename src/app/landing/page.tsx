import LandingInitEffects from '@/app/landing/comonents/LandingInitEffects';
import StartButton from '@/app/landing/comonents/StartButton';
import LandingView from '@/app/landing/comonents/LandingView';

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
