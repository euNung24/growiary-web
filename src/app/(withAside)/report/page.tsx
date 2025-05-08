import ReportView from '@/domain/report/components/ReportView';
import Preview from '@/views/common/Preview';
import ReportAcc from '@/domain/report/components/ReportAcc';

export default function Home() {
  return (
    <div className="space-y-9">
      <ReportAcc />
      <hr className="border-gray-50o border-4" />
      <ReportView />
      <Preview />
    </div>
  );
}
