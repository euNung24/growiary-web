import ReportView from '@user/report/components/ReportView';
import Preview from '@/shared/views/common/Preview';
import ReportAcc from '@user/report/components/ReportAcc';

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
