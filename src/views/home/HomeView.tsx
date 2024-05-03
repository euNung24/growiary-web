import HomeDailyChecker from '@/views/home/HomeDailyChecker';
import HomeHistory from '@/views/home/HomeHistory';
import HomeTopic from '@/views/home/HomeTopic';
import HomePosts from '@/views/home/HomePosts';

const HomeView = () => {
  return (
    <div className="space-y-[72px] max-w-[960px] mx-auto">
      <HomeDailyChecker />
      <HomePosts />
      <HomeHistory />
      <HomeTopic />
    </div>
  );
};

export default HomeView;
