"use client";
import { SidebarContext } from "@/context";
import { useContext, useState } from "react";

export const useSidebar = () => useContext(SidebarContext);

export const SidebarProvider = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <SidebarContext.Provider
      value={{
        sidebarCollapsed,
        setSidebarCollapsed,
        showSidebar,
        setShowSidebar,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};
