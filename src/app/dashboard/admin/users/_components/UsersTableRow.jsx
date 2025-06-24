import { TableCell, TableRow } from "@/components/ui/table";

import { Checkbox } from "@/components/ui/checkbox";
import moment from "moment";
import Image from "next/image";
import UserRowActions from "./UserRowActions";
const UserTableRow = ({ user, onCheckboxChange, selectedIds }) => {
  const {
    _id,
    username,
    avatar,
    email,
    subscribersCount,
    tweetsCount,
    videosCount,
    createdAt,
    subscribedChannelsCount,
  } = user || {};

  return (
    <TableRow className=" h-[70px]">
      <TableCell className="pl-4">
        <Checkbox
          onCheckedChange={(checked) =>
            onCheckboxChange(checked, "single", _id)
          }
          checked={selectedIds?.includes(_id)}
          className="h-4 w-4"
        />
      </TableCell>
      <TableCell className="pl-5 w-[42 0px]">
        <div className="flex items-center gap-4 w-full">
          <Image
            width={100}
            height={100}
            className="h-10 w-10 rounded-full"
            src={avatar?.url || "/default-avatar.png"}
            alt={username || "Owner Avatar"}
          />
          <div>
            <p className="font-semibold">{username}</p>
            <p className="font-semibold">{email}</p>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <span className="inline-block rounded-xl bg-blue-200 px-1.5 py-0.5 text-blue-700">
          {videosCount} videos
        </span>
      </TableCell>

      <TableCell>
        <div className="flex gap-4">
          <span className="inline-block rounded-xl bg-emerald-200 px-1.5 py-0.5 text-emerald-700">
            {tweetsCount} tweets
          </span>
        </div>
      </TableCell>

      <TableCell>
        <div className="flex gap-4">
          <span className="inline-block rounded-xl bg-cyan-200 px-1.5 py-0.5 text-cyan-700">
            {subscribersCount} subscribers
          </span>
        </div>
      </TableCell>

      <TableCell>
        <div className="flex gap-4">
          <span className="inline-block rounded-xl bg-violet-200 px-1.5 py-0.5 text-violet-700">
            {subscribedChannelsCount} subscribed
          </span>
        </div>
      </TableCell>

      <TableCell>{moment(createdAt).format("Do MMM YYYY")}</TableCell>
      <UserRowActions username={username} userId={_id} />
    </TableRow>
  );
};

export default UserTableRow;
