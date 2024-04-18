import Sidebar from '@/views/common/Sidebar';

export default async function asLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-w-full flex">
      <Sidebar />
      <main className="mx-auto my-[72px] space-y-[72px]">{children}</main>
    </div>
  );
}
