import VideoHorizontalCardActions from "@/components/common/cards/VideoHorizontalCardActions";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
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
      className={`w-full ${
        isActiveVideo ? "bg-dark-bg" : ""
      } justify-start items-start  h-[80px] relative`}
      asChild
    >
      <Link
        href={`/videos/${_id}?list=${playlistId}&index=${index + 1}`}
        className="rounded-none pl-6"
      >
        <div className="absolute top-1/2 -translate-y-1/2 left-1">
          {isActiveVideo ? (
            <Play className="!size-4 " />
          ) : (
            <span className="ml-1 text-xs"> {index + 1} </span>
          )}
        </div>
        <figure className="">
          <div className="w-[120px] h-[60px] relative">
            <Image
              width={100}
              height={50}
              src={thumbnail?.url}
              alt={`Thumbnail for ${title}`}
              className="w-full h-full rounded-md object-cover"
            />
            <figcaption className="absolute bottom-1 right-1 inline-block rounded bg-black px-1.5 text-xs">
              {duration}
            </figcaption>
          </div>
        </figure>

        <div>
          <span className="truncate">{title}</span>
        </div>
        <VideoHorizontalCardActions videoId={_id} />
      </Link>
    </Button>
  );
};

export default PlaylistBoxItem;
