import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BellOff, EllipsisVertical, EyeOff, Shield } from "lucide-react";
import moment from "moment";
import Image from "next/image";
const NotificationItem = ({ item }) => {
  const {
    sender: { username, avatar } = {},
    type,
    message,
    image,
    read,
    createdAt,
    link,
  } = item || {};
  const fromAdmin = type?.toLowerCase() === "admin";
  return (
    <DropdownMenuItem className="cursor-pointer">
      <div className="flex items-center gap-2">
        <div className="size-1.5 bg-blue-600 rounded-full"></div>
        {fromAdmin ? (
          <Shield />
        ) : (
          <Avatar>
            <AvatarImage src={avatar?.url} alt={username} />
            <AvatarFallback> {username} </AvatarFallback>
          </Avatar>
        )}
        <div className="ms-2 flex items-start gap-4">
          <div>
            <h5 className="text-sm text-gray-500">{message}</h5>
            <p> {moment(createdAt).fromNow()} </p>
          </div>
          <img
            width={200}
            height={100}
            src={image}
            alt={message}
            className="w-[160px] h-16 rounded-md"
          />
        </div>
        {!fromAdmin && (
          <DropdownMenu className="absolute right-0 top-0">
            <DropdownMenuTrigger asChild>
              <button className="outline-none">
                <EllipsisVertical className="" size={22} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="space-y-1 ">
              <DropdownMenuItem className="cursor-pointer">
                <button className="flex items-center gap-x-2">
                  <EyeOff />
                  <p> Hide This Notification </p>
                </button>
              </DropdownMenuItem>

              <DropdownMenuItem className="cursor-pointer">
                <button className="flex items-center gap-x-2">
                  <BellOff />
                  <p>Turn off all from {"FC Barcelona"} </p>
                </button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </DropdownMenuItem>
  );
};

export default NotificationItem;
