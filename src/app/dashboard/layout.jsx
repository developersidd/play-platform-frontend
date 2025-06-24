import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { retrieveCurrentUser } from "@/server-actions/user.action";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
//import { redirect } from "next/dist/server/api-utils";
import DashboardHeader from "./_components/DashboardHeader";
import DashboardSidebar from "./_components/DashboardSidebar";

export const metadata = {
  title: "Dashboard - Play",
  description: "Your personalized video platform",
};

const adminRoutes = ["/dashboard/admin/users", "/dashboard/admin/videos"];

async function DashboardLayout({ children }) {
  const { data } = await retrieveCurrentUser();
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "/";
  const isAdmin = data?.role?.toLowerCase() === "admin";
  const isAdminRoute = adminRoutes.some((route) => pathname.startsWith(route));
  if (!isAdmin && isAdminRoute)  {
    return redirect("/dashboard");
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
