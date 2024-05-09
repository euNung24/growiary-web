import HomeDailyChecker from '@/views/home/HomeDailyChecker';
import HomeReport from '@/views/home/HomeReport';
import HomeTopic from '@/views/home/HomeTopic';
import HomePosts from '@/views/home/HomePosts';
import ReportProvider from '@/components/providers/ReportProvider';

const HomeView = () => {
  return (
    <div className="space-y-[72px] mb-[72px] mx-2.5">
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
