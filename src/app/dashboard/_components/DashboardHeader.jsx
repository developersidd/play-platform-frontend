"use client";
import CreatePlaylistModal from "@/components/common/playlist/playlist-modal/CreatePlaylistModal";
import { ModeToggle } from "@/components/theme/ThemeToggler";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";
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
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";

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
  const { state, dispatch } = useUserContext() || {};
  console.log("🚀 ~ state:", state)
  const router = useRouter();
  const { avatar, username } = state || {};
  const { apiClient } = useAxios();
  const pathname = usePathname();
  async function handleLogout() {
    try {
      await apiClient.post("/users/logout");
      localStorage.removeItem("loggedIn");
      router.push("/");
      dispatch({ type: LOGGED_OUT });
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Failed to logout", error);
      toast.error("Failed to logout");
    }
  }
  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear ">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumbs />
      </div>
      {username && (
        <div className="flex items-center gap-3 md:gap-5 px-4">
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
              <DropdownMenuItem
                onClick={() => router.push(`/channels/${username}`)}
                className="cursor-pointer"
              >
                <User className="size-4 mr-2" />
                Profile
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </header>
  );
}

export default DashboardHeader;
