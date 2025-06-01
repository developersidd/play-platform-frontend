import { TableCell, TableRow } from "@/components/ui/table";

import moment from "moment";
import Image from "next/image";
import ToggleVideoStatus from "./ToggleVideoStatus";
import VideoRowActions from "./VideoRowActions";

const VideosTableRow = ({ video }) => {
  const {
    _id,
    title,
    thumbnail,
    createdAt,
    likes,
    dislikes,
    isPublished,
    views,
  } = video || {};

  return (
    <TableRow className=" h-[70px]">
      <ToggleVideoStatus videoId={_id} isPublished={isPublished} />
      <TableCell className="w-[30%]">
        <div className="flex items-center gap-4 pr-5">
          <Image
            width={40}
            height={40}
            className="h-10 w-10 rounded-full"
            src={
              thumbnail?.url ||
              "https://images.pexels.com/photos/3532545/pexels-photo-3532545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            }
            alt={title || "Video Thumbnail"}
          />
          <h3 className="font-semibold">
            {title?.length > 100 ? title?.slice(0, 100) + "..." : title}
          </h3>
        </div>
      </TableCell>
      <TableCell>
        {/* style for views */}
        <span className="inline-block rounded-xl bg-blue-200 px-1.5 py-0.5 text-blue-700">
          {views} views
        </span>
      </TableCell>

      <TableCell>
        <div className="flex gap-4">
          <span className="inline-block rounded-xl bg-green-200 px-1.5 py-0.5 text-green-700">
            {likes} likes
          </span>
          <span className="inline-block rounded-xl bg-red-200 px-1.5 py-0.5 text-red-700">
            {dislikes} dislikes
          </span>
        </div>
      </TableCell>
      <TableCell>{moment(createdAt).format("Do MMM YYYY")}</TableCell>
      <VideoRowActions 
      isVideoPublished={isPublished}
      title={title} videoId={_id} />
    </TableRow>
  );
};

export default VideosTableRow;
