"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useAxios from "@/hooks/useAxios";
import { BellOff, EllipsisVertical, EyeOff, Shield } from "lucide-react";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
const NotificationItem = ({ item, onClose }) => {
  const {
    sender: { username = "", avatar = "", _id: channelId } = {},
    type,
    message,
    image,
    createdAt,
    link,
    _id,
  } = item || {};
  const { apiClient } = useAxios();
  const [isHide, setIsHide] = useState(false);
  const router = useRouter();
  // delete notification
  const handleDeleteNotification = async () => {
    setIsHide(true);
    //onClose()
    try {
      await apiClient.delete(`/notifications/${_id}`);
      router.refresh();
    } catch (error) {
      toast.error("Failed to delete notification");
      setIsHide(false);
    }
  };

  // turn off notification
  const handleOffNotification = async () => {
    try {
      await apiClient.patch(`/subscriptions/off-notification/${channelId}`);
      toast.success("Notification Preference Updated");
    } catch (error) {
      console.log(" error:", error);
      toast.error("Failed to turn off notification");
    }
  };

  const fromAdmin = type?.toLowerCase() === "admin";
  return (
    <DropdownMenuItem
      onClick={() => {
        handleDeleteNotification();
        router.push(link);
      }}
      className={`${
        isHide ? "hidden" : ""
      } cursor-pointer relative last:mb-0 mb-3`}
    >
      {/*<Link href={link} onClick={handleDeleteNotification}>*/}
      <div className="flex items-center gap-2">
        <div className="w-1.5 h-[5px] bg-blue-600 rounded-full"></div>

        {fromAdmin ? (
          <Shield />
        ) : (
          <Avatar>
            <Link href={`/channels/${username}`}>
              <AvatarImage src={avatar?.url} alt={username} />
              <AvatarFallback> {username} </AvatarFallback>
            </Link>
          </Avatar>
        )}
        <div className="ms-1 flex items-start justify-start gap-3 w-full pr-3">
          <div className="w-[70%]">
            <h5 className="text-sm text-gray-500">{message}</h5>
            <p> {moment(createdAt).fromNow()} </p>
          </div>
          <div
            className="w-[
            30%] flex items-center justify-end"
          >
            <Image
              width={150}
              height={100}
              src={image}
              alt={message}
              className="w-[150px] h-16  rounded-md"
            />
          </div>
        </div>
        {!fromAdmin && (
          <DropdownMenu className="">
            <DropdownMenuTrigger>
              <div className="absolute top-1/2 -translate-y-1/2 right-0.5  outline-none">
                <EllipsisVertical className="" size={18} />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="space-y-1 mt-4">
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteNotification();
                }}
                className="cursor-pointer"
              >
                <div className="flex items-center gap-x-2">
                  <EyeOff className="size-3 lg:size-4" />
                  <p> Hide This Notification </p>
                </div>
              </DropdownMenuItem>

              <DropdownMenuItem
                className="cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  handleOffNotification();
                }}
              >
                <div className="flex items-center gap-x-2">
                  <BellOff className="size-3 lg:size-4" />
                  <p>Turn off all from {username} </p>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
      {/*</Link>*/}
    </DropdownMenuItem>
  );
};

export default NotificationItem;
