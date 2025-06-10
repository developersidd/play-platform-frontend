"use client";
import CreatePlaylistModal from "@/components/common/playlist/playlist-modal/CreatePlaylistModal";
import { ModeToggle } from "@/components/theme/ThemeToggler";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import useAxios from "@/hooks/useAxios";
import useUserContext from "@/hooks/useUserContext";
import { LogOut, Plus, User } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NoSSRNotification = dynamic(
  () => import("@/components/notification/Notification"),
  {
    ssr: false,
  }
);

const LazyUploadVideoModal = dynamic(() =>
  import("@/components/common/video/UploadVideoModal")
);

function DashboardHeader() {
  const { state } = useUserContext() || {};
  const { avatar, username, email } = state || {};
  const { apiClient } = useAxios();
  const pathname = usePathname();
  console.log(" pathname:", pathname);
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
    <header className="flex h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumbs />
      </div>
      {username && (
        <div className="flex items-center gap-5 px-4">
          <div className="hidden md:flex"></div>
          {pathname === "/dashboard/playlists" && (
            <CreatePlaylistModal>
              <Button className="max-md:hidden  rounded-full bg-secondary text-white hover:bg-secondary dark:bg-dark-bg">
                <Plus className="text-white" /> Playlist
              </Button>
            </CreatePlaylistModal>
          )}
          <LazyUploadVideoModal key="upload-video">
            <Button className="rounded-full bg-secondary text-white hover:bg-secondary dark:bg-dark-bg">
              <Plus className="text-white" /> Upload
            </Button>
          </LazyUploadVideoModal>
          <ModeToggle />
          <NoSSRNotification />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex cursor-pointer">
                <Avatar>
                  <AvatarImage src={avatar?.url} alt="@shadcn" />
                  <AvatarFallback> {username} </AvatarFallback>
                </Avatar>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 mt-2">
              <DropdownMenuItem
                onClick={handleLogout}
                className="cursor-pointer"
              >
                <LogOut className="size-4 mr-2" />
                <button>Logout</button>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <User className="size-4 mr-2" />

                <Link href={`/channels/${username}`}>My Profile</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </header>
  );
}

export default DashboardHeader;
