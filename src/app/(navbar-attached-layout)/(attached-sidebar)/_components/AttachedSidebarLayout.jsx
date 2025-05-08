"use client";

import useSidebarContext from "@/hooks/useSidebarContext";
import AttachedSidebar from "../../_components/AttachedSidebar";

const AttachedSidebarLayout = ({ children }) => {
  const { sidebarCollapsed } = useSidebarContext();
  const sidebarWidth = sidebarCollapsed ? 85 : 240;
  return (
    <div className="flex min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)]">
      <AttachedSidebar />
      <section
        style={{
          width: `calc(100vw - ${sidebarWidth}px)`,
          transform: `translateX(${sidebarWidth - 5}px)`,
        }}
        className={`transition-all h-auto `}
      >
        {children}
      </section>
    </div>
  );
};

export default AttachedSidebarLayout;
