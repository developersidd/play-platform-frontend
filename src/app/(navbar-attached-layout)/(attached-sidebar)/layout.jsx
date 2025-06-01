import { Navbar } from "@/components/common/navbar/Navbar";
import UserInitializer from "@/components/User-initializer/UserInitializer";
import { SidebarProvider } from "@/providers/SidebarProvider";
import AttachedSidebarLayout from "./_components/AttachedSidebarLayout";

export default function MainAttachedSidebarLayout({ children }) {
  return (
    <SidebarProvider>
      <UserInitializer />
      <Navbar />
      <AttachedSidebarLayout>{children}</AttachedSidebarLayout>
    </SidebarProvider>
  );
}
