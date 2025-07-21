import HomeDailyChecker from '@/user/features/post/components/home/HomeDailyChecker';
import HomeReport from '@/user/features/report/components/home/HomeReport';
import HomeTopic from '@/user/features/topic/components/home/HomeTopic';
import HomePosts from '@user/post/components/home/HomeHistory';
import ReportProvider from '@/user/features/report/providers/ReportProvider';
import Preview from '@/shared/components/Preview';
import ServerTopics from '@/shared/layouts/server/ServerTopics';

export default async function Home() {
  return (
    <>
      <div className="space-y-[72px]">
        <HomeDailyChecker />
        <ServerTopics>
          <HomePosts />
          <HomeTopic />
        </ServerTopics>
        <ReportProvider>
          <HomeReport />
        </ReportProvider>
      </div>
      <Preview />
    </>
  );
}
