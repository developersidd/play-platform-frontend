"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NotificationBadge } from "@/components/ui/NotificationBadge";
import useAxios from "@/hooks/useAxios";
import useLocalStorage from "@/hooks/useLocalStorage";
import useUserContext from "@/hooks/useUserContext";
import { Bell, Loader } from "lucide-react";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
const LazyNotificationContent = dynamic(() => import("./NotificationContent"), {
  loading: () => (
    <div className="flex justify-center items-center h-[400px]">
      <Loader size={40} className="animate-spin" />
    </div>
  ),
});
const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useLocalStorage("unread-count", 0);
  const { state } = useUserContext() || {};
  const { accessToken, role } = state || {};
  const { apiClient } = useAxios();
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const { data: { data, success } = {} } =
          (await apiClient.get("/notifications")) || {};
        if (data?.length > 0 && success) {
          setNotifications(data);
        }
      } catch (error) {
        setError(error);
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    // Socket connection
    const socket = io(process.env.NEXT_PUBLIC_SERVER_URL, {
      auth: { token: accessToken },
      withCredentials: true,
      transports: ["websocket"],
    });
    socket.on("connect_error", (err) => {
      console.error("Connection Error", err.message);
    });
    if (accessToken) {
      socket.on("new-notification", (notification) => {
        console.log("new notification runs", notification);
        setNotifications((prev) => [notification, ...prev]);
        setUnreadCount((prev) => prev + 1);
      });

      if (role === "ADMIN") {
        socket.on("registration", (report, cb) => {
          console.log("new registration runs");
          setNotifications((prev) => [report, ...prev]);
          setUnreadCount((prev) => prev + 1);
          cb({ success: true });
        });
      }
    }

    fetchNotifications();
    return () => socket.disconnect();
  }, [role, accessToken]);
  // decide what to render
  let content;
  if (isLoading) {
    content = (
      <div className="flex justify-center items-center h-[400px]">
        <Loader size={40} className="animate-spin" />
      </div>
    );
  } else if (error) {
    content = (
      <div className="flex justify-center items-center h-[200px]">
        <p className="text-red-500"> There was an error occurred</p>
      </div>
    );
  } else {
    content = (
      <LazyNotificationContent
        onClose={() => setOpen(false)}
        notifications={notifications}
      />
    );
  }
  return (
    <div>
      <DropdownMenu
        //modal={false}
        open={open}
        onOpenChange={() => {
          setOpen((prev) => !prev);
          setUnreadCount(0);
        }}
      >
        <DropdownMenuTrigger asChild>
          <div>
            <NotificationBadge
              show={unreadCount > 0 && !open}
              label={unreadCount}
            >
              <Button type="button" className="px-3" variant="outline">
                <Bell className="" />
              </Button>
            </NotificationBadge>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="lg:w-[500px] mt-2">
          {content}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Notification;
