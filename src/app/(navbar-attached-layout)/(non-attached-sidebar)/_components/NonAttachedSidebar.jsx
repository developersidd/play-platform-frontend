"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useLockBody } from "@/hooks/use-lock-body";
import useSidebarContext from "@/hooks/useSidebarContext";
import useUserContext from "@/hooks/useUserContext";
import { MenuIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLayoutEffect } from "react";
import { sidebarItems } from "../../_components/AttachedSidebar";
const NonAttachedSidebar = () => {
  useLockBody();
  const pathname = usePathname();
  const { state } = useUserContext() || {};
  const { avatar, username } = state || {};
  const { showSidebar, setShowSidebar } = useSidebarContext();
  // Lock body scroll when sidebar is open
  useLayoutEffect(() => {
    if (showSidebar) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showSidebar]);
  return (
    <>
      <aside
        className={`w-[220px] z-50 md:w-[235px] fixed transition-all   dark:border-gray-300 px-3  min-h-dvh max-h-dvh  bg-background  top-0 left-0  ${
          showSidebar ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* NonAttachedSidebar overlay */}
        <div
          onClick={() => setShowSidebar(false)}
          className={`${showSidebar ? "visible" : "invisible"}   
        fixed w-screen h-screen translate-x-full transition-transform  right-0 top-0 bottom-0 bg-black/60 z-30`}
        ></div>
        <div className=" w-full mt-2 flex items-center justify-start gap-4 px-6">
          <MenuIcon
            className="cursor-pointer size-7 md:size-8"
            onClick={() => {
              setShowSidebar((prev) => !prev);
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
        <ul className=" flex justify-around gap-y-3 sticky top-[95px] h-[calc(100dvh-115px)] md:h-[calc(100vh-130px)] flex-col">
          {sidebarItems.map(({ icon, label, link, mtAuto }, index) => {
            const path = link === "/channels/" ? `${link}${username}` : link;
            return (
              <TooltipProvider delayDuration={120} key={index}>
                <Tooltip>
                  <li className={` ${mtAuto ? "mt-auto" : ""}`}>
                    <TooltipTrigger className="w-full">
                      <Link
                        title={label}
                        href={link}
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
                        lg:mr-4
                        `}
                        >
                          {icon}
                        </p>
                        <p className="max-md:text-sm block">{label}</p>
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

export default NonAttachedSidebar;
