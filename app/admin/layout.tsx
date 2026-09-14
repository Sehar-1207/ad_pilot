import AdminSidebar from '@/components/admin/AdminSidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        backgroundColor: 'var(--bg-primary)',
        color: 'var(--text-primary)',
      }}
      className="flex flex-col md:flex-row h-screen w-screen overflow-hidden font-sans transition-colors duration-300"
    >
      <AdminSidebar />

      <div className="flex-1 flex flex-col min-w-0 min-h-0 h-full overflow-hidden">
        <main className="p-4 sm:p-6 lg:p-8 flex-1 min-h-0 min-w-0 overflow-y-auto md:overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}