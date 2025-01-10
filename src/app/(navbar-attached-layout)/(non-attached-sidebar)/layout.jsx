import { Navbar } from "@/components/common/navbar/Navbar";
import UserInitializer from "@/components/User-initializer/UserInitializer";
import { SidebarProvider } from "@/providers/SidebarProvider";
import UserProvider from "@/providers/UserProvider";
import NonAttachedSidebar from "./_components/NonAttachedSidebar";

export default function NonAttachedSidebarLayout({ children }) {
  console.log("NonAttachedSidebarLayout:", NonAttachedSidebarLayout);
  return (
    <html lang="en">
      <body>
        <UserProvider>
          <SidebarProvider>
            <UserInitializer />
            <Navbar />
            <div className="flex items-start  w-full min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)]">
              <NonAttachedSidebar />
              {children}
            </div>
          </SidebarProvider>
        </UserProvider>
      </body>
    </html>
  );
}
