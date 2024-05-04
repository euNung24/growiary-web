import HomeDailyChecker from '@/views/home/HomeDailyChecker';
import HomeReport from '@/views/home/HomeReport';
import HomeTopic from '@/views/home/HomeTopic';
import HomePosts from '@/views/home/HomePosts';

const HomeView = () => {
  return (
    <div className="space-y-[72px] max-w-[960px] mx-auto">
      <HomeDailyChecker />
      <HomePosts />
      <HomeTopic />
      <HomeReport />
    </div>
  );
};

export default HomeView;
