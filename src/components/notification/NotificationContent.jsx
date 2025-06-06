import { DropdownMenuLabel } from "../ui/dropdown-menu";
import { ScrollArea } from "../ui/scroll-area";
import NotificationItem from "./NotificationItem";
const NotificationContent = ({ notifications, onClose }) => {
  return (
    <div>
      <DropdownMenuLabel className="border-b py-2">
        <h3 className="text-lg font-semibold ms-2">Notifications</h3>
      </DropdownMenuLabel>
      <ScrollArea className="h-[500px]  ">
        <div className=" pr-3 py-3">
          {notifications?.length > 0 ? (
            notifications?.map((item) => (
              <NotificationItem key={item?._id} item={item} onClose={onClose} />
            ))
          ) : (
            <div className=" flex justify-center items-center h-[200px]">
              <p className="text-gray-400">No notifications yet </p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default NotificationContent;
