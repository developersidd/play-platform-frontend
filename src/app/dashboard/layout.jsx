import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { retrieveCurrentUser } from "@/server-actions/user.action";
import DashboardHeader from "./_components/DashboardHeader";
import DashboardSidebar from "./_components/DashboardSidebar";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Dashboard - Play",
  description: "Your personalized video platform",
};

async function DashboardLayout({ children }) {
  const {data} = await retrieveCurrentUser() || {};
  console.log(" data?.role:", data?.role)
  if(data?.role?.toLowerCase() !== "admin") {
    return redirect("/")
  }
  return (
    <SidebarProvider defaultOpen={false}>
      <DashboardSidebar />
      <SidebarInset>
        <DashboardHeader />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}

export default DashboardLayout;
