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

// AttachedSidebar items with link property
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

const AttachedSidebar = () => {
  const { sidebarCollapsed } = useSidebarContext();

  return (
    <>
      <aside
        className={`
      px-3 border-r-2 transition-all duration-250
      ${sidebarCollapsed ? "w-[85px]" : "w-[250px]"}
    `}
      >
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
                        <p
                          className={`sm:hidden ${
                            sidebarCollapsed ? "" : "lg:inline-block"
                          }`}
                        >
                          {label}
                        </p>
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

export default AttachedSidebar;
