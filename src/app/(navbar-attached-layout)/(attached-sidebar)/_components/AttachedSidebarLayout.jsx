"use client";

import useSidebarContext from "@/hooks/useSidebarContext";
import AttachedSidebar from "../../_components/AttachedSidebar";

const AttachedSidebarLayout = ({ children }) => {
  const { sidebarCollapsed } = useSidebarContext();

  return (
    <div className="flex min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)] overflow-x-hidden">
      <AttachedSidebar />
      <section
        className={` transition-all h-auto w-full ${
          sidebarCollapsed
            ? "md:w-[calc(100%-80px)] md:translate-x-[80px]"
            : "md:w-[calc(100%-235px)] md:translate-x-[235px]"
        }`}
      >
        {children}
      </section>
    </div>
  );
};

export default AttachedSidebarLayout;
