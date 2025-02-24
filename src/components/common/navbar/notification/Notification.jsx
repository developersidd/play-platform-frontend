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
    socket;
    if (accessToken) {
      socket.on("new-notification", (notification) => {
        setNotifications((prev) => [notification, ...prev]);
        setUnreadCount((prev) => prev + 1);
      });

      if (role === "ADMIN") {
        socket.on("registration", (report) => {
          setNotifications((prev) => [report, ...prev]);
          setUnreadCount((prev) => prev + 1);
        });
      }
    }

    fetchNotifications();

    return () => socket.disconnect();
  }, [role, accessToken]);

  return (
    <div>
      <DropdownMenu
        open={open}
        onOpenChange={() => {
          setOpen((prev) => !prev);
          setUnreadCount(0);
        }}
      >
        <DropdownMenuTrigger>
          <div>
            <NotificationBadge show={unreadCount > 0} label={unreadCount}>
              <Button type="button" className="px-3" variant="outline">
                <Bell className="" />
              </Button>
            </NotificationBadge>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-[500px] mt-4 max-h-[600px] min-h-[500px]"
        >
          {error ? (
            <div className="flex justify-center items-center h-[200px]">
              <p className="text-red-500"> There was an error occurred</p>
            </div>
          ) : (
            <LazyNotificationContent notifications={notifications} />
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Notification;
