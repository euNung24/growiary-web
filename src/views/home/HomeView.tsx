import HomeDailyChecker from '@/views/home/HomeDailyChecker';
import HomeReport from '@/views/home/HomeReport';
import HomeTopic from '@/views/home/HomeTopic';
import HomePosts from '@/views/home/HomePosts';
import ReportProvider from '@/components/providers/ReportProvider';

const HomeView = () => {
  return (
    <div className="space-y-[72px] max-w-[960px] mb-[72px] mx-auto">
      <HomeDailyChecker />
      <HomePosts />
      <HomeTopic />
      <ReportProvider>
        <HomeReport />
      </ReportProvider>
    </div>
  );
};

export default HomeView;
