import { SidebarContext } from "@/context";
import { useContext } from "react";

const useSidebarContext = () => {
  return useContext(SidebarContext);
};

export default useSidebarContext;
