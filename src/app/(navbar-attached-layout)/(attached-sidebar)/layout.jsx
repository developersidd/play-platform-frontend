import { Navbar } from "@/components/common/navbar/Navbar";
import UserInitializer from "@/components/User-initializer/UserInitializer";
import { SidebarProvider } from "@/providers/SidebarProvider";
import UserProvider from "@/providers/UserProvider";
import AttachedSidebar from "../_components/AttachedSidebar";
import AttachedSidebarLayout from "./_components/AttachedSidebarLayout";

export default function MainAttachedSidebarLayout({ children }) {
  //console.log("NavbarSidebarAttachedLayout");
  return (
    <html lang="en">
      <body>
        <UserProvider>
          <SidebarProvider>
            <UserInitializer />
            <Navbar />
            <AttachedSidebarLayout>
              {children}
            </AttachedSidebarLayout>
          </SidebarProvider>
        </UserProvider>
      </body>
    </html>
  );
}
