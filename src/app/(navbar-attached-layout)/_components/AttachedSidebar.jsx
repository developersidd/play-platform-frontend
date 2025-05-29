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
  MenuIcon,
  MonitorCog,
  Play,
  Settings,
  ThumbsUp,
  UserCheck,
  Video,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link"; // Import Link for navigation in Next.js
import { usePathname } from "next/navigation";
import { useEffect } from "react";

// AttachedSidebar items with link property
export const sidebarItems = [
  {
    icon: <MonitorCog className="size-5 md:size-6" />,
    label: "Dashboard",
    link: "/dashboard",
  },
  {
    icon: <Play className="size-5 md:size-6" />,
    label: "My Videos",
    link: "/dashboard/videos",
  },
  { icon: <Home className="size-5 md:size-6" />, label: "Home", link: "/" },
  {
    icon: <ThumbsUp className="size-5 md:size-6" />,
    label: "Liked Videos",
    link: "/liked-videos",
  },
  {
    icon: <History className="size-5 md:size-6" />,
    label: "History",
    link: "/history",
  },
  {
    icon: <Video className="size-5 md:size-6" />,
    label: "My Content",
    link: "/channels/",
  },
  {
    icon: <Combine className="size-5 md:size-6" />,
    label: "Collections",
    link: "/collections",
  },
  {
    icon: <FolderClock className="size-5 md:size-6" />,
    label: "Watch Later",
    link: "/watch-later",
  },
  {
    icon: <UserCheck className="size-5 md:size-6" />,
    label: "Subscribers",
    link: "/subscribers",
  },
  {
    icon: <BadgeHelp className="size-5 md:size-6" />,
    label: "Support",
    link: "/support",

    mtAuto: true,
  },
  {
    icon: <Settings className="size-5 md:size-6" />,
    label: "Settings",
    link: "/settings",
  },
];

const AttachedSidebar = () => {
  const { sidebarCollapsed, setSidebarCollapsed } = useSidebarContext();
  const { state } = useUserContext() || {};
  const { avatar, username } = state || {};
  const pathname = usePathname();
  // disable scroll on body when sidebar is open
  useEffect(() => {
    if (sidebarCollapsed) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [sidebarCollapsed]);
  return (
    <>
      <aside
        className={`
       border-r-0 md:border-r top-0 md:top-[82px] 
       transition-all duration-250 
       left-0 bg-background min-h-dvh max-h-dvh
       fixed  inset-x-0  z-50  shrink-0  border-gray-300 dark:border-white  w-[220px] pt-2  md:py-6        ${
         sidebarCollapsed
           ? "max-md:translate-x-0 md:w-[90px]"
           : "max-md:-translate-x-full md:w-[235px] "
       }
    `}
      >
        <div
          className={`${sidebarCollapsed ? "visible" : "invisible"}   
        fixed w-screen h-screen translate-x-full transition-transform  right-0 top-0 bottom-0 bg-black/60 z-30 md:hidden`}
          onClick={() => setSidebarCollapsed(false)}
        ></div>
        {/* Mobile Sidebar Toggle */}
        <div className="md:hidden w-full mt-0 flex items-center justify-start gap-4 px-6">
          <MenuIcon
            className="cursor-pointer size-7 md:size-8"
            onClick={() => {
              setSidebarCollapsed((prev) => !prev);
            }}
          />
          <Link href="/" className=" ">
            <Image
              alt="youtube-clone"
              className="size-14 sm:size-16"
              src="/assets/images/logo.svg"
              width={100}
              height={100}
            />
          </Link>
        </div>
        {/* Sidebar Items */}
        <ul className="flex px-3 max-md:pt-5 justify-around gap-y-3 md:sticky top-[106px]  w-full h-[calc(100dvh-85px)] md:h-[calc(100vh-130px)] flex-col">
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
                            ? "bg-secondary border-secondary dark:border-secondary"
                            : "border-gray-300 dark:border-white"
                        } flex  h-[37px] md:h-[42px] items-center  max-md:gap-2  py-1
                      w-full flex-row border hover:bg-secondary 
                      
                     dark:hover:border-secondary 
                      hover:border-secondary
                    justify-start
                     px-4`}
                      >
                        <p
                          className={` 
                        ${sidebarCollapsed ? "" : "lg:mr-4"}
                        }`}
                        >
                          {icon}
                        </p>
                        <p
                          className={`
                          text-sm md:text-base
                          max-md:block
                          ${sidebarCollapsed ? "hidden " : "block"}`}
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
    </>
  );
};

export default AttachedSidebar;
