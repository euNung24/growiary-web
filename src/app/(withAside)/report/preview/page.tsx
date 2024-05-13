import ReportView from '@/views/report/ReportView';
import Preview from '@/views/common/Preview';
import ReportAcc from '@/views/report/ReportAcc';

export default function Home() {
  return (
    <div className="space-y-9">
      <ReportAcc isPreview />
      <hr className="border-gray-50o border-4" />
      <ReportView isPreview />
      <Preview />
    </div>
  );
}
