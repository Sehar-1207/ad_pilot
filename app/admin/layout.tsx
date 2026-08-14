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
      className="flex flex-col md:flex-row min-h-screen font-sans transition-colors duration-300"
    >
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        <main className="p-4 sm:p-6 lg:p-8 flex-1 overflow-y-auto min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
}