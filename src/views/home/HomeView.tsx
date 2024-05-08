import HomeDailyChecker from '@/views/home/HomeDailyChecker';
import HomeReport from '@/views/home/HomeReport';
import HomeTopic from '@/views/home/HomeTopic';
import HomePosts from '@/views/home/HomePosts';
import ReportProvider from '@/components/providers/ReportProvider';
import UserProvider from '@/components/providers/UserProvider';

const HomeView = () => {
  return (
    <UserProvider showNav={true}>
      <div className="space-y-[72px] mt-[72px]">
        <HomeDailyChecker />
        <HomePosts />
        <HomeTopic />
        <ReportProvider>
          <HomeReport />
        </ReportProvider>
      </div>
    </UserProvider>
  );
};

export default HomeView;
