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

const Sidebar = () => {
  const { sidebarCollapsed } = useSidebarContext();

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
  return (
    <aside
      className={`fixed transition-all duration-500 inset-x-0 bottom-0 z-40 w-full shrink-0 border-t border-white bg-[#121212] px-2 py-2 sm:inset-y-0 sm:max-w-[80px] sm:border-r sm:border-t-0 sm:py-6 ${
        sidebarCollapsed
          ? "w-[150px] lg:sticky"
          : "lg:absolute lg:max-w-[240px] "
      }`}
    >
      <ul className="flex justify-around gap-y-2 sm:sticky sm:top-[106px] sm:min-h-[calc(100vh-130px)] sm:flex-col">
        {sidebarItems.map(({ icon, label, link, smHidden, mtAuto }, index) => (
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
                    className={`flex flex-col items-center justify-center border-white py-1 focus:text-[#ae7aff] sm:w-full sm:flex-row sm:border sm:p-1.5 sm:hover:bg-[#ae7aff] sm:hover:text-black sm:focus:border-[#ae7aff] sm:focus:bg-[#ae7aff] sm:focus:text-black group-hover:justify-start group-hover:px-4 ${
                      sidebarCollapsed ? "" : "lg:justify-start"
                    } lg:px-4`}
                  >
                    <span
                      className={`inline-block  shrink-0 ${
                        sidebarCollapsed ? "" : "lg:mr-4"
                      }`}
                    >
                      {icon}
                    </span>
                    <span
                      className={`transition-all  sm:hidden ${
                        sidebarCollapsed ? "" : " lg:inline-block"
                      }`}
                    >
                      {label}
                    </span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p> {label} </p>
                </TooltipContent>
              </li>
            </Tooltip>
          </TooltipProvider>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
