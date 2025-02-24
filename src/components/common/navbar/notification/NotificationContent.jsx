import { DropdownMenuLabel } from "@radix-ui/react-dropdown-menu";
import NotificationItem from "./NotificationItem";
const NotificationContent = ({ notifications }) => {
  console.log(" notifications:", notifications);
  return (
    <>
      <DropdownMenuLabel className="border-b py-2">
        <h3 className="text-lg font-semibold ms-2">Notifications</h3>
      </DropdownMenuLabel>
      <div className="max-h-[500px] overflow-y-auto py-4 space-y-4">
        {notifications?.length > 0 ? (
          notifications?.map((item) => (
            <NotificationItem key={item?._id} item={item} />
          ))
        ) : (
          <div className="flex justify-center items-center h-[200px]">
            <p className="text-gray-400">No notifications yet </p>
          </div>
        )}
      </div>
    </>
  );
};

export default NotificationContent;
