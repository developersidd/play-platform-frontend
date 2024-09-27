"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import useSidebarContext from "@/hooks/useSidebarContext";
import {
  BadgeHelp,
  Combine,
  History,
  Home,
  Settings,
  ThumbsUp,
  UserCheck,
  Video,
} from "lucide-react";
import Link from "next/link"; // Import Link for navigation in Next.js
import { usePathname } from "next/navigation";

// Sidebar items with link property
const sidebarItems = [
  { icon: <Home />, label: "Home", link: "/" },
  {
    icon: <ThumbsUp />,
    label: "Liked Videos",
    link: "/liked-videos",
    smHidden: true,
  },
  { icon: <History />, label: "History", link: "/history" },
  {
    icon: <Video />,
    label: "My Content",
    link: "/my-content",
    smHidden: true,
  },
  { icon: <Combine />, label: "Collections", link: "/collections" },
  { icon: <UserCheck />, label: "Subscribers", link: "/subscribers" },
  {
    icon: <BadgeHelp />,
    label: "Support",
    link: "/support",
    smHidden: true,
    mtAuto: true,
  },
  {
    icon: <Settings />,
    label: "Settings",
    link: "/settings",
    smHidden: true,
  },
];

const Sidebar = () => {
  const { sidebarCollapsed, toggleSidebar } = useSidebarContext();
  const pathname = usePathname();
  let navItemClasses;
  let classes = "";
  if (pathname === "/") {
    navItemClasses = `
      
    `;
    classes = `
      px-3 border-r-2 transition-all duration-500
      ${sidebarCollapsed ? "w-[85px]" : "w-[230px]"}
    `;
    navItemClasses = `
    sm:hidden ${sidebarCollapsed ? "" : "lg:inline-block"}
  `;
  } else {
    classes = `w-[230px] transition-all border-r-2 px-3 z-40 h-full bg-primary absolute top-0 left-0  ${
      sidebarCollapsed ? "-translate-x-full hidden" : "translate-x-0 block"
    } after:size-full `;
    navItemClasses = `
    sm:hidden lg:inline-block
    `;
  }
  return (
    <>
      <div
        onClick={toggleSidebar}
        className={`w-[calc(100vw-230px)] h-full bg-black/30 fixed top-0 right-0 z-30
          ${pathname === "/" && "hidden"}
          ${sidebarCollapsed ? "invisible" : "visible"}  `}
      ></div>
      <aside className={classes}>
        <ul className="flex justify-around gap-y-3 sm:sticky sm:top-[106px] sm:min-h-[calc(100vh-130px)] sm:flex-col">
          {sidebarItems.map(
            ({ icon, label, link, smHidden, mtAuto }, index) => (
              <TooltipProvider delayDuration={120} key={index}>
                <Tooltip>
                  <li
                    className={`${smHidden ? "hidden sm:block" : ""} ${
                      mtAuto ? "mt-auto" : ""
                    }`}
                  >
                    <TooltipTrigger className="w-full">
                      <Link
                        title={label}
                        href={link}
                        className={`flex h-[42px] flex-col items-center justify-center border-white py-1 focus:text-secondary sm:w-full sm:flex-row sm:border sm:p-1.5 sm:hover:bg-secondary sm:hover:text-black sm:focus:border-secondary sm:focus:bg-secondary sm:focus:text-black lg:justify-start
                     lg:px-4`}
                      >
                        <p
                          className={` 
                        ${sidebarCollapsed ? "" : "lg:mr-4"}
                        }`}
                        >
                          {icon}
                        </p>
                        <p className={navItemClasses}>{label}</p>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p> {label} </p>
                    </TooltipContent>
                  </li>
                </Tooltip>
              </TooltipProvider>
            )
          )}
        </ul>
      </aside>
    </>
  );
};

export default Sidebar;
