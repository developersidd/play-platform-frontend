"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import useSidebarContext from "@/hooks/useSidebarContext";
import useUserContext from "@/hooks/useUserContext";
import {
  BadgeHelp,
  Combine,
  FolderClock,
  History,
  Home,
  MonitorCog,
  Settings,
  ThumbsUp,
  UserCheck,
  Video,
} from "lucide-react";
import Link from "next/link"; // Import Link for navigation in Next.js
import { usePathname } from "next/navigation";

// AttachedSidebar items with link property
const sidebarItems = [
  { icon: <MonitorCog />, label: "Dashboard", link: "/dashboard" },
  { icon: <Home />, label: "Home", link: "/" },
  {
    icon: <ThumbsUp />,
    label: "Liked Videos",
    link: "/liked-videos",
  },
  { icon: <History />, label: "History", link: "/history" },
  {
    icon: <Video />,
    label: "My Content",
    link: "/channels/",
  },
  { icon: <Combine />, label: "Collections", link: "/collections" },
  { icon: <FolderClock />, label: "Watch Later", link: "/watch-later" },
  { icon: <UserCheck />, label: "Subscribers", link: "/subscribers" },
  {
    icon: <BadgeHelp />,
    label: "Support",
    link: "/support",

    mtAuto: true,
  },
  {
    icon: <Settings />,
    label: "Settings",
    link: "/settings",
  },
];

const AttachedSidebar = () => {
  const { sidebarCollapsed } = useSidebarContext();
  const { state } = useUserContext() || {};
  const { avatar, username } = state || {};
  const pathname = usePathname();
  return (
    <aside
      className={`
       border-r-2 top-[82px] left-0 
       transition-all duration-250 
      fixed inset-x-0   z-40  shrink-0 border-t border-gray-300 dark:border-white   py-2 sm:border-r sm:border-t-0 sm:py-6        ${
        sidebarCollapsed ? "w-[85px]" : "w-[240px]"
      }
    `}
    >
      <ul className="flex px-3  justify-around gap-y-3 sm:sticky sm:top-[106px] w-full sm:min-h-[calc(100vh-130px)] max-h-[calc(100vh-130px)] sm:flex-col">
        {sidebarItems.map(({ icon, label, link, mtAuto }, index) => {
          const path = link === "/channels/" ? `${link}${username}` : link;
          return (
            <TooltipProvider delayDuration={120} key={index}>
              <Tooltip>
                <li className={` ${mtAuto ? "mt-auto" : ""}`}>
                  <TooltipTrigger className="w-full">
                    <Link
                      title={label}
                      href={path}
                      className={`${
                        path === pathname
                          ? "bg-secondary dark:border-secondary border-secondary"
                          : "border-gray-300 dark:border-white"
                      } flex h-[42px] flex-col items-center justify-center   py-1
                     
                      sm:w-full sm:flex-row sm:border sm:p-1.5 sm:hover:bg-secondary 
                     dark:hover:border-secondary 
                      hover:border-secondary
                    lg:justify-start
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
          );
        })}
      </ul>
    </aside>
  );
};

export default AttachedSidebar;
