import type { Metadata } from 'next';
import Sidebar from '@/components/dashboard/Sidebar';
import DashboardNavbar from '@/components/dashboard/DashboardNavbar';

export const metadata: Metadata = {
  title: "Dashboard | Ad Pilot",
  description: "Manage your advertising campaigns, track analytics, and generate AI insights.",
   icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userPlan: 'free' | 'pro' = 'free'; 
  const isMetaConnected = false;
  const userName = "Sehar Ajmal";

  return (
    <div className="min-h-screen bg-[var(--bg-surface)] flex">
      <Sidebar userPlan={userPlan} />

      <div className="flex-1 flex flex-col min-w-0 md:ml-64">
        <DashboardNavbar 
          isMetaConnected={isMetaConnected} 
          userName={userName} 
          userRole="User"
        />

        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}