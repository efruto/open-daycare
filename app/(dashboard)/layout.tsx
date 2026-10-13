import Sidebar from "@/components/Sidebar";
import MobileHeader from "@/app/components/mobile-header";
import PostProvider from "@/components/PostProvider";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <PostProvider>
      <MobileHeader />
      <div className="flex">
        <Sidebar />
        <main className="min-w-0 flex-1 lg:h-screen lg:overflow-y-auto">
          {children}
        </main>
      </div>
    </PostProvider>
  );
}
