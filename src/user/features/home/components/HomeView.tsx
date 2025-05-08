import HomeDailyChecker from '@/user/features/home/components/HomeDailyChecker';
import HomeReport from '@/user/features/home/components/HomeReport';
import HomeTopic from '@/user/features/home/components/HomeTopic';
import HomePosts from '@/user/features/home/components/HomeHistory';
import ReportProvider from '@user/report/providers/ReportProvider';

const HomeView = () => {
  return (
    <div className="space-y-[72px]">
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
