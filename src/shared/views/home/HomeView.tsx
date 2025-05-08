import HomeDailyChecker from '@/shared/views/home/HomeDailyChecker';
import HomeReport from '@/shared/views/home/HomeReport';
import HomeTopic from '@/shared/views/home/HomeTopic';
import HomePosts from '@/shared/views/home/HomePosts';
import ReportProvider from '@/user/domain/report/components/ReportProvider';

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
