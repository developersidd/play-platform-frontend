import { formatCounting } from "@/lib/utils";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";

const VideoHorizontalCard = ({ video }) => {
  const {
    title,
    views,
    createdAt,
    description,
    thumbnail,
    duration,
    owner: { avatar, username, fullName } = {},
  } = video || {};
  return (
    <Link href={`/videos/${video._id}`} className="block">
      <div className=" gap-x-4 md:flex">
        <div className="relative mb-2 w-full md:mb-0 md:w-5/12">
          <div className="w-full pt-[56%]">
            <div className="absolute inset-0">
              <Image
                width={450}
                height={300}
                src={thumbnail?.url}
                alt={title}
                className="md:h-[200px] w-full rounded-md"
              />
            </div>
            <span className="absolute bottom-1 right-1 inline-block rounded bg-black px-1.5 text-sm">
              {duration}
            </span>
          </div>
        </div>
        <div className="flex gap-x-2 md:w-7/12">
          <Link href={`/channels/${username}`}>
            <div className="h-10 w-10 shrink-0 md:hidden">
              <img
                width={100}
                height={100}
                src={avatar?.url}
                alt={username}
                className="h-full w-full rounded-full"
              />
            </div>
          </Link>
          <div className="w-full">
            <h6 className="mb-1 font-semibold md:max-w-[75%]">{title}</h6>
            <p className="flex text-sm text-gray-200 sm:mt-3">
              {formatCounting(views)} Views · {moment(createdAt).fromNow()}
            </p>
            <div className="flex items-center gap-x-4">
              <div className="mt-2 hidden h-10 w-10 shrink-0 md:block">
                <img
                  width={100}
                  height={100}
                  src={avatar?.url}
                  alt={username}
                  className="h-full w-full rounded-full"
                />
              </div>
              <p className="text-sm text-gray-200"> {fullName} </p>
            </div>
            {description?.length > 0 && (
              <p className="mt-2 hidden text-sm md:block">
                {description.length > 100
                  ? `${description.slice(0, 100)}...`
                  : description}
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VideoHorizontalCard;
