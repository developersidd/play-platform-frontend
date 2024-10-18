"use client";
import { LOGGED_OUT } from "@/actions/user.acton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useAxios from "@/hooks/useAxios";
import useSidebarContext from "@/hooks/useSidebarContext";
import useUserContext from "@/hooks/useUserContext";
import { MenuIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { toast } from "sonner";
import Search from "./Search";

export const Navbar = () => {
  const { state, dispatch } = useUserContext();
  const router = useRouter();
  const { setSidebarCollapsed, setShowSidebar } = useSidebarContext();
  const { avatar, username } = state;
  const { privateApi } = useAxios();
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);
  async function handleLogout() {
    console.log("logout");
    try {
      await privateApi.post("/users/logout");
      router.push("/");
      localStorage.removeItem("loggedIn");
      dispatch({ type: LOGGED_OUT });
    } catch (error) {
      console.error("Failed to logout", error);
      toast.error("Failed to logout");
    }
  }
  return (
    <div className="w-full border-b sticky top-0 z-50 bg-primary">
      <div className="px-12 py-2  h-full flex w-full items-center  justify-between">
        {/*<MobileSidebar />*/}
        <div className="w-full flex items-center gap-2">
          <MenuIcon
            className="cursor-pointer"
            onClick={() => {
              setSidebarCollapsed((prev) => !prev);
              setShowSidebar((prev) => !prev);
            }}
            size={32}
          />
          <Link href="/" className="">
            <Image
              alt="youtube-clone"
              className="size-16"
              src="/assets/images/logo.svg"
              width={100}
              height={100}
            />
          </Link>
        </div>
        {/* search*/}
        <Search />
        <div className="flex items-center relative justify-end  w-full">
          {/*<button onClick={handleLogout}>Logout</button>*/}
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
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="cursor-pointer"
                >
                  <button>Logout</button>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Link href={`/channels/${username}`}>My Profile</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="gap-4 flex items-center justify-end  w-full">
              <Link
                href="/login"
                className="w-full bg-[#383737] px-3 py-2 hover:bg-[#4f4e4e] sm:w-auto sm:bg-transparent"
              >
                Log in
              </Link>
              <Link
                href="/register"
                className="mr-1 w-full bg-secondary px-3 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e] sm:w-auto"
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
