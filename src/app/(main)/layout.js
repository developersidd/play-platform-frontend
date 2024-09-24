import { Navbar } from "@/components/common/Navbar";
import UserInitializer from "@/components/User-initializer/UserInitializer";
import { SidebarProvider } from "@/providers/SidebarProvider";
import UserProvider from "@/providers/UserProvider";
import Sidebar from "./_components/Sidebar";

export default function MainLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <UserProvider>
          <SidebarProvider>
            <UserInitializer />
            <Navbar />
            <div class="relative flex min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)]">
              <Sidebar />
              {children}
            </div>
          </SidebarProvider>
        </UserProvider>
      </body>
    </html>
  );
}
