import VideoHorizontalCardActions from "@/components/common/cards/VideoHorizontalCardActions";
import { formatCounting } from "@/lib/utils";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
const PlaylistVideoCard = ({ video, link }) => {
  //console.log(" video:", video);
  const {
    thumbnail,
    title,
    views,
    createdAt,
    duration,
    _id,
    owner: { avatar, username, fullName } = {},
  } = video || {};
  return (
    <div className="w-full relative transition-colors hover:bg-light-bg p-2 rounded-lg border">
      {/* Actions */}
      <VideoHorizontalCardActions classes={"right-1 top-3"} videoId={_id} />
      <div className=" gap-x-4 flex">
        <div className="relative mb-2  md:mb-0 w-2/4 lg:w-2/6 2xl:w-1/4 h-[140px]">
          <Link href={link}>
            <div className="w-full">
              <div className="absolute inset-0">
                <Image
                  width={450}
                  height={300}
                  src={thumbnail?.url}
                  alt={title}
                  className="h-full w-full rounded-md"
                />
              </div>
              <span className="absolute bottom-1 right-1 inline-block rounded bg-black px-1.5 text-sm">
                {duration}
              </span>
            </div>
          </Link>
        </div>
        <div className="flex gap-x-2 md:w-7/12">
          <div className="w-full">
            <Link href={link} className="mb-1 font-semibold md:max-w-[75]">
              {title}
            </Link>

            <p className="flex text-sm text-gray-200 sm:mt-3">
              {formatCounting(views)} Views · {moment(createdAt).fromNow()}
            </p>
            <Link className="inline-block" href={`/channels/${username}`}>
              <div className="flex items-center gap-x-4">
                <div className="mt-2  h-10 w-10 shrink-0">
                  <Image
                    width={100}
                    height={100}
                    src={avatar?.url}
                    alt={username}
                    className="h-full w-full rounded-full"
                  />
                </div>
                <p className="text-sm text-gray-200"> {fullName} </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaylistVideoCard;
