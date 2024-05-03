import HomeDailyChecker from '@/views/home/HomeDailyChecker';
import HomeHistory from '@/views/home/HomeHistory';
import HomeTopic from '@/views/home/HomeTopic';
import HomePosts from '@/views/home/HomePosts';

export default async function Home() {
  return (
    <div className="space-y-[72px] max-w-[960px] mx-auto">
      <HomeDailyChecker />
      <HomeHistory />
      <HomeTopic />
      <HomePosts />
    </div>
  );
}
