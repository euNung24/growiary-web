import TopicView from '@/user/features/topic/components/TopicView';
import Preview from '@/shared/components/Preview';
import ServerTopics from '@/shared/layouts/server/ServerTopics';
export default function Home() {
  return (
    <>
      <ServerTopics>
        <TopicView />
      </ServerTopics>
      <Preview />
    </>
  );
}
