"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { dashboardNavGroups } from "@/constants/data";
import useAxios from "@/hooks/useAxios";
import useUserContext from "@/hooks/useUserContext";

import { useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { Bell, ChevronsDown, LogOut, Power, UserCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
function DashboardSidebar() {
  const pathname = usePathname();
  const { state, dispatch } = useUserContext();
  const { avatar, username, email, role } = state || {};
  console.log(" role:", role)
  const { apiClient } = useAxios();
  const { open } = useSidebar();

  async function handleLogout() {
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
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center gap-1 ">
          <Link href="/" className="">
            <Image
              alt="youtube-clone"
              className="size-12 md:size-14"
              src="/assets/images/logo.svg"
              width={100}
              height={100}
            />
          </Link>

          <div className={`${open ? "block" : "hidden"}`}>
            <h1 className="text-lg font-semibold">Play</h1>
            <p className="text-xs text-muted-foreground">
              Personalized video platform
            </p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="overflow-x-hidden">
        {dashboardNavGroups.map(({ name, items }) =>
          name === "Admin" && role?.toLowerCase() !== "admin" ? null : (
            <SidebarGroup key={name}>
              <SidebarGroupLabel>{name}</SidebarGroupLabel>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      tooltip={item.title}
                      isActive={pathname === item.url}
                    >
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>
          )
        )}
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className=" data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground "
                >
                  <div className="flex cursor-pointer">
                    <Avatar className={cn(open ? "" : "rounded-none")}>
                      <AvatarImage src={avatar?.url} alt={username} />
                      <AvatarFallback> {username} </AvatarFallback>
                    </Avatar>
                    <div className="ml-2 flex flex-col">
                      <span className=" font-semibold">{username}</span>
                      <span className="text-xs text-muted-foreground">
                        {email}
                      </span>
                    </div>
                  </div>
                  <ChevronsDown className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="px-1 py-1.5">
                    <div className="flex cursor-pointer">
                      <Avatar>
                        <AvatarImage src={avatar?.url} alt={username} />
                        <AvatarFallback> {username} </AvatarFallback>
                      </Avatar>
                      <div className="ml-2 flex flex-col">
                        <span className="text-sm font-semibold">
                          {username}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {email}
                        </span>
                      </div>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                  <DropdownMenuItem
                    onClick={() => router.push(`/channels/${username}`)}
                  >
                    <UserCircle className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() =>
                      router.push(`/channels/${username}/change-password`)
                    }
                  >
                    <Power className="mr-2 h-4 w-4" />
                    Reset Password
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Bell className="mr-2 h-4 w-4" />
                    Notifications
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
export default DashboardSidebar;
