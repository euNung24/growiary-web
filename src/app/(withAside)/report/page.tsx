import ReportView from '@/views/report/ReportView';
import Preview from '@/views/common/Preview';
import ReportProvider from '@/components/providers/ReportProvider';
import ReportAcc from '@/views/report/ReportAcc';

export default function Home() {
  return (
    <>
      <ReportProvider>
        <ReportAcc />
      </ReportProvider>
      <ReportView />
      <Preview />
    </>
  );
}
