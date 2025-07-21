import HistoryView from '@/user/features/history/components/HistoryView';
import Preview from '@/shared/components/Preview';
import ServerTopics from '@/shared/layouts/server/ServerTopics';

export default function Home() {
  return (
    <>
      <ServerTopics>
        <HistoryView />
      </ServerTopics>
      <Preview />
    </>
  );
}
