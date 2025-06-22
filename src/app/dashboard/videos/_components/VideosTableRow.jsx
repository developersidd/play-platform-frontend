import { TableCell, TableRow } from "@/components/ui/table";

import { Checkbox } from "@/components/ui/checkbox";
import moment from "moment";
import Image from "next/image";
import { useState } from "react";
import ToggleVideoStatus from "./ToggleVideoStatus";
import VideoRowActions from "./VideoRowActions";
const VideosTableRow = ({ video, onCheckboxChange, selectedIds }) => {
  const {
    _id,
    title,
    thumbnail,
    createdAt,
    likes,
    dislikes,
    isPublished,
    views,
    owner: { username: ownerUsername, avatar } = {},
  } = video || {};

  const [isVideoPublished, setIsVideoPublished] = useState(isPublished);

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
      <ToggleVideoStatus
        videoId={_id}
        isVideoPublished={isVideoPublished}
        setIsVideoPublished={setIsVideoPublished}
      />
      <TableCell className="w-[450px]">
        <div className="flex items-center gap-4 ">
          <Image
            width={100}
            height={300}
            className="h-12 min-w-24 rounded object-fit"
            src={thumbnail?.url}
            alt={title || "Video Thumbnail"}
          />
          <h3 className="font-semibold">
            {title?.length > 90 ? title?.slice(0, 90) + "..." : title}
          </h3>
        </div>
      </TableCell>
      {/* show owner avatar and username */}
      <TableCell className="pl-5">
        <div className="flex items-center gap-4">
          <Image
            width={100}
            height={100}
            className="h-10 w-10 rounded-full"
            src={avatar?.url || "/default-avatar.png"}
            alt={ownerUsername || "Owner Avatar"}
          />
          <span className="font-semibold">{ownerUsername}</span>
        </div>
      </TableCell>
      <TableCell>
        {/* style for views */}
        <span className="inline-block rounded-xl bg-blue-200 px-1.5 py-0.5 text-blue-700">
          {views?.toLocaleString()} views
        </span>
      </TableCell>

      <TableCell>
        <div className="flex gap-4">
          <span className="inline-block rounded-xl bg-green-200 px-1.5 py-0.5 text-green-700">
            {likes?.toLocaleString()} likes
          </span>
          <span className="inline-block rounded-xl bg-red-200 px-1.5 py-0.5 text-red-700">
            {dislikes?.toLocaleString()} dislikes
          </span>
        </div>
      </TableCell>
      <TableCell>{moment(createdAt).format("Do MMM YYYY")}</TableCell>
      <VideoRowActions
        isVideoPublished={isVideoPublished}
        title={title}
        videoId={_id}
      />
    </TableRow>
  );
};

export default VideosTableRow;
