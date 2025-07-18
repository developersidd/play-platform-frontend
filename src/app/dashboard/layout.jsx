import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import UserProvider from "@/providers/UserProvider";
import DashboardHeader from "./_components/DashboardHeader";
import DashboardSidebar from "./_components/DashboardSidebar";

export const metadata = {
  title: "Dashboard - Play",
  description: "Your personalized video platform",
};

async function DashboardLayout({ children }) {
  return (
    <SidebarProvider defaultOpen={false}>
      <DashboardSidebar />
      <SidebarInset>
        <UserProvider>
          <DashboardHeader />
          {children}
        </UserProvider>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default DashboardLayout;
