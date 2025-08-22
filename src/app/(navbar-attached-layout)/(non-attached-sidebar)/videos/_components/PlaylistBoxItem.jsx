import VideoActions from "@/components/common/video/VideoActions";
import { Button } from "@/components/ui/button";
import { Play, VideoOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
const PlaylistBoxItem = async ({
  videoItem: { video },
  isActiveVideo,
  playlistId,
  index,
}) => {
  const { _id, title, thumbnail, duration } = video || {};

  return (
    <Button
      variant="ghost"
      className={`w-full rounded-none ${
        isActiveVideo ? "bg-accent" : ""
      } justify-start items-start  h-[80px] relative z-20 `}
      asChild
    >
      {title ? (
        <div className=" ">
          <Link
            href={`/videos/${_id}?list=${playlistId}&index=${index} gap-3`}
            className="w-full inline-block "
          >
            <div className="gap-3 flex">
              <div className="absolute top-1/2 -translate-y-1/2 left-1">
                {isActiveVideo ? (
                  <Play className="!size-4 " />
                ) : (
                  <span className="ml-1 text-xs"> {index} </span>
                )}
              </div>
              <figure className="ml-3">
                <div className="w-[120px] h-[60px] relative">
                  <Image
                    width={100}
                    height={50}
                    src={thumbnail?.url}
                    alt={`Thumbnail for ${title}`}
                    className="w-full h-full rounded-md object-cover"
                  />
                  <figcaption
                    className="absolute bottom-1 right-1 inline-block rounded bg-background
                 px-1.5 text-xs"
                  >
                    {duration}
                  </figcaption>
                </div>
              </figure>
              <div>
                <h4
                  className="w-full whitespace-normal break-words text-sm"
                  title={title}
                >
                  {title?.length > 80 ? title?.slice(0, 80) + "..." : title}
                </h4>
              </div>
            </div>
          </Link>
          <VideoActions
            videoId={_id}
            dropdownContentAlign="end"
            dropdownTriggerIconClassName="size-3"
            dropdownTriggerClassName="right-1 top-2"
          />
        </div>
      ) : (
        <div className="flex  items-center justify-center gap-2 h-full">
          <VideoOff className="!size-5 text-secondary" />
          <p className="text-sm font-semibold">Video not found!</p>
        </div>
      )}
    </Button>
  );
};

export default PlaylistBoxItem;
