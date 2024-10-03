import { formatCounting } from "@/lib/utils";
import moment from "moment/moment";
import Link from "next/link";

const VideoCard = ({ video }) => {
  const {
    _id,
    title,
    views,
    owner: { avatar, _id: ownerId, username, fullName } = {},
    createdAt,
    thumbnail,
  } = video || {};
  //console.log("avatar:", avatar);
  ////console.log("thumbnail:", thumbnail);
  return (
    <div key={_id} className="w-full">
      <div className="relative mb-2 w-full pt-[56%]">
        <Link href={`/videos/${_id}`} className="absolute inset-0">
          <img
            height={300}
            width={300}
            src={thumbnail?.url}
            alt={title}
            className="h-full w-full"
          />
        </Link>
        <span className="absolute bottom-1 right-1 inline-block rounded bg-black px-1.5 text-sm">
          24:33
        </span>
      </div>
      <div className="flex gap-x-2">
        <Link href={`/${username}`}>
          <div className="h-10 w-10 shrink-0">
            <img
              width={40}
              height={40}
              src={avatar?.url}
              alt={username}
              className="h-full w-full rounded-full"
            />
          </div>
        </Link>
        <div className="w-full">
          <Link href={`/videos/${_id}`}>
            <h6 className="mb-1 font-semibold">{title}</h6>
          </Link>
          <p className="flex text-sm text-gray-200">
            {formatCounting(views)} Views · {moment(createdAt).fromNow()}
          </p>

          <p className="text-sm text-gray-200"> {fullName} </p>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
