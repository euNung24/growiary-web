import LandingTracking from '@/views/landing/LandingTracking';
import StartButton from '@/views/landing/StartButton';
import LandingView from '@/views/LandingView';

export default async function Home() {
  return (
    <>
      <LandingView>
        <StartButton />
      </LandingView>
      <LandingTracking />
    </>
  );
}
