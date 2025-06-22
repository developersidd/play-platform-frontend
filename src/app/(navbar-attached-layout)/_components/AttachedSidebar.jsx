"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { sidebarItems } from "@/constants/data";
import useSidebarContext from "@/hooks/useSidebarContext";
import useUserContext from "@/hooks/useUserContext";
import { cn } from "@/lib/utils";
import { MenuIcon } from "lucide-react";

import Image from "next/image";
import Link from "next/link"; 
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const AttachedSidebar = () => {
  const { sidebarCollapsed, setSidebarCollapsed } = useSidebarContext();
  const { state } = useUserContext() || {};
  const { username } = state || {};

  const pathname = usePathname();
  useEffect(() => {
    if (window.innerWidth >= 768) {
      document.body.style.overflow = "auto";
      return;
    }
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
       transition-all duration-350 ease-linear
       left-0 bg-background min-h-dvh max-h-dvh
       fixed  inset-x-0  z-50  shrink-0  border-gray-300 dark:border-white  w-[220px] pt-2  md:py-6        ${
         sidebarCollapsed
           ? "max-md:translate-x-0 md:w-[80px]"
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
                  <li className={cn(mtAuto ? "mt-auto" : "")}>
                    <TooltipTrigger className="w-full">
                      <Link
                        title={label}
                        href={path}
                        className={`${
                          path === pathname
                            ? "bg-secondary border-secondary dark:border-secondary"
                            : "border-gray-300 dark:border-white"
                        } flex  h-[37px] md:h-[42px] items-center  gap-2 lg:gap-3  py-1
                      w-full flex-row border hover:bg-secondary 
                      
                     dark:hover:border-secondary 
                      hover:border-secondary
                    justify-start
                     px-4`}
                      >
                        <p
                          className=""
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
