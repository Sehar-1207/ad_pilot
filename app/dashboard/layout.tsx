import Sidebar from '@/components/dashboard/Sidebar';
import DashboardNavbar from '@/components/dashboard/DashboardNavbar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userPlan: 'free' | 'pro' = 'free'; 
  const isMetaConnected = false;
  const userName = "Sehar Ajmal";

  return (
    <div className="min-h-screen bg-[#F1F5F9] flex flex-col">
      <DashboardNavbar 
        isMetaConnected={isMetaConnected} 
        userName={userName} 
        userRole="User"
      />

      <div className="flex-1 flex min-w-0">
        <Sidebar userPlan={userPlan} />
        <main className="flex-1 p-6 md:p-8 md:ml-64 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}