"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useSidebarContext from "@/hooks/useSidebarContext";
import useUserContext from "@/hooks/useUserContext";
import { MenuIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const Navbar = () => {
  const { state } = useUserContext();
  const { toggleSidebar } = useSidebarContext();
  const { avatar, username } = state;
  return (
    <div className="w-full border-b sticky top-0 z-50 bg-primary">
      <div className="px-16 py-2  h-full flex w-full items-center  justify-between">
        {/*<MobileSidebar />*/}
        <div className="mr-4">
          <MenuIcon
            className="cursor-pointer"
            onClick={toggleSidebar}
            size={32}
          />
        </div>
        <Link href="/" className="w-full">
          <Image
            alt="youtube-clone"
            className="size-16"
            src="/assets/images/logo.svg"
            width={100}
            height={100}
          />
        </Link>
        <div className="relative hidden w-full max-w-md overflow-hidden sm:block">
          <input
            className="w-full border bg-transparent py-1 pl-10 pr-3 placeholder-white outline-none sm:py-2"
            placeholder="Search"
          />
          <span className="absolute left-2.5 top-1/2 inline-block -translate-y-1/2">
            <Image
              alt="search-icon"
              className="size-5"
              src="/assets/images/search.svg"
              width={50}
              height={50}
            />
          </span>
        </div>
        <div className="flex items-center justify-end  w-full">
          {username ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="cursor-pointer">
                  <Avatar>
                    <AvatarImage src={avatar?.url} alt="@shadcn" />
                    <AvatarFallback> {username} </AvatarFallback>
                  </Avatar>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 mt-4">
                <DropdownMenuItem className="cursor-pointer">
                  <Link
                    href="#"
                    onClick={() => {
                      console.log("Logout");
                    }}
                  >
                    Logout
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="gap-4 flex items-center justify-end  w-full">
              <Link
                href="/login"
                class="w-full bg-[#383737] px-3 py-2 hover:bg-[#4f4e4e] sm:w-auto sm:bg-transparent"
              >
                Log in
              </Link>
              <Link
                href="/register"
                class="mr-1 w-full bg-secondary px-3 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e] sm:w-auto"
              >
                Sign up
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
