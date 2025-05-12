"use client";
import { LOGGED_OUT } from "@/actions/user.action";
import { ModeToggle } from "@/components/theme/ThemeToggler";

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
import { MenuIcon, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
//import Notification from "./notification/Notification";

import CreatePlaylistModal from "@/app/(navbar-attached-layout)/(attached-sidebar)/channels/[channelUsername]/@tabs/playlist/_components/CreatePlaylistModal";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
import Search from "./Search";
const NoSSRNotification = dynamic(() => import("./notification/Notification"), {
  ssr: false,
});
const LazyUploadVideoModal = dynamic(() =>
  import("@/components/video/UploadVideoModal")
);

export const Navbar = () => {
  const { state, dispatch } = useUserContext();
  const router = useRouter();
  const { setSidebarCollapsed, setShowSidebar } = useSidebarContext();
  const { avatar, username } = state;
  const { apiClient } = useAxios();

  async function handleLogout() {
    console.log("logout");
    try {
      await apiClient.post("/users/logout");
      router.push("/");
      localStorage.removeItem("loggedIn");
      dispatch({ type: LOGGED_OUT });
    } catch (error) {
      console.error("Failed to logout", error);
      toast.error("Failed to logout");
    }
  }
  return (
    <div className="w-full bg-background border-b border-gray-300 dark:border-white  sticky top-0 z-50 ">
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
        <div className="flex items-center relative justify-end  w-full gap-5">
          {/*<button onClick={handleLogout}>Logout</button>*/}

          {username ? (
            <>
              <CreatePlaylistModal>
                <Button className="rounded-full bg-secondary text-white hover:bg-secondary dark:bg-dark-bg">
                  <Plus className="text-white" /> Playlist
                </Button>
              </CreatePlaylistModal>
              <LazyUploadVideoModal key="upload-video">
                <Button className="rounded-full bg-secondary text-white hover:bg-secondary dark:bg-dark-bg">
                  <Plus className="text-white" /> Upload
                </Button>
              </LazyUploadVideoModal>
              <ModeToggle />
              <NoSSRNotification />

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
            </>
          ) : (
            <>
              <ModeToggle />
              <div className="gap-4 flex items-center ">
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};
