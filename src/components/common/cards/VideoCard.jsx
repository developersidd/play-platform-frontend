import { formatCounting } from "@/lib/utils";
import moment from "moment/moment";
import Image from "next/image";
import Link from "next/link";

const VideoCard = ({ video }) => {
  const {
    _id,
    title,
    views,
    owner: { avatar, username, fullName } = {},
    createdAt,
    thumbnail,
  } = video || {};

  return (
    <div className="w-full h-[300px] md:pb-5">
      <div className="mb-2 w-full h-[70%] md:h-[75%]">
        <Link href={`/videos/${_id}`} className="">
          <Image
            height={800}
            width={500}
            src={thumbnail?.url}
            alt={title}
            className="h-full w-full rounded-md object-cover"
          />
        </Link>
        <span className="absolute bottom-1 right-1 inline-block rounded shadow bg-background px-1.5 text-sm">
          24:33
        </span>
      </div>
      <div className="flex gap-x-2">
        <Link href={`/channels/${username}`}>
          <div className="h-10 w-10 shrink-0">
            <Image
              width={100}
              height={100}
              src={avatar?.url}
              alt={username}
              className="h-full w-full rounded-full"
            />
          </div>
        </Link>
        <div className="w-full">
          <Link href={`/videos/${_id}`}>
            <h6 className="text-sm md:text-base mb-1 font-semibold !leading-tight">
              {title}
            </h6>
          </Link>
          <p className="flex text-sm ">
            {formatCounting(views)} Views · {moment(createdAt).fromNow()}
          </p>

          <p className="text-sm "> {fullName} </p>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
