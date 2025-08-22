import VideoActions from "@/components/common/video/VideoActions";
import { cn, formatCounting } from "@/lib/utils";
import { Draggable } from "@hello-pangea/dnd";
import { Tally2 } from "lucide-react";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
const WatchLaterVideoItem = ({ index, item: { video, _id } }) => {
  const {
    thumbnail,
    title,
    views,
    createdAt,
    duration,
    _id: videoId,
    isInWatchLater,
    owner: { avatar, username, fullName } = {},
  } = video || {};
  const [isRemoveFromWatchLater, setIsRemoveFromWatchLater] = useState(false);
  return (
    <Draggable key={_id} draggableId={_id} index={index}>
      {(provided, { isDragging }) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className={cn(
            "flex !left-auto my-auto !top-auto justify-center items-stretch h-[130px] sm:h-[140px]  lg:h-[150px]  rounded-md mb-4 text-sm transition-colors hover:bg-light-bg",
            isDragging && "bg-light-bg",
            isRemoveFromWatchLater ? "hidden" : ""
          )}
        >
          <div
            style={{}}
            {...provided.dragHandleProps}
            className={cn(
              "pl-2 cursor-grab min-h-full  flex items-center justify-center "
            )}
          >
            <Tally2 className=" rotate-90" />
          </div>
          <div className="w-full relative p-2 rounded-lg max-sm:mt-1">
            <VideoActions
              videoId={_id}
              dropdownContentAlign="end"
              dropdownTriggerIconClassName="size-5"
              dropdownTriggerClassName="top-2"
            />
            <div className=" gap-x-4 flex">
              <div className="relative mb-2  md:mb-0 w-2/4 lg:w-2/5 xl:w-1/4 h-full">
                <Link
                  key={videoId}
                  href={`/videos/${videoId}?list=WL_125fd&index=${index + 1}`}
                >
                  <div className="w-full">
                    <div className="absolute inset-0 h-[100px] sm:h-[120px]">
                      <Image
                        width={450}
                        height={300}
                        src={thumbnail?.url}
                        alt={title}
                        className="h-full w-full rounded-md shadow object-cover"
                      />
                      <span className="absolute bottom-1 right-1 inline-block rounded  shadow-md  bg-background    px-1.5 text-sm">
                        {duration}
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="flex gap-x-2 md:w-7/12">
                <div className="w-full">
                  <Link
                    href={`/videos/${videoId}`}
                    className="mb-1  text-sm font-semibold md:max-w-[75]"
                  >
                    {title?.length > 60 ? title.slice(0, 60) + "..." : title}
                  </Link>

                  <p className="flex text-xs md:text-sm  mt-1.5 sm:mt-3 ">
                    {formatCounting(views)} Views ·{" "}
                    {moment(createdAt).fromNow()}
                  </p>
                  <Link className="inline-block" href={`/channels/${username}`}>
                    <div className="flex items-center gap-x-4">
                      <div className="mt-2  size-8 md:size-10 shrink-0">
                        <Image
                          width={100}
                          height={100}
                          src={avatar?.url}
                          alt={username}
                          className="h-full w-full rounded-full"
                        />
                      </div>
                      <p className="text-sm "> {fullName} </p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default WatchLaterVideoItem;
