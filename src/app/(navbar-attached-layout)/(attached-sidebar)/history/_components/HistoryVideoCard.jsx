import { formatCounting } from "@/lib/utils";
import moment from "moment";
import Link from "next/link";

const HistoryVideoCard = ({ video }) => {
  const {
    thumbnail,
    title,
    views,
    createdAt,
    description,
    duration,
    owner: { avatar, username, fullName } = {},
  } = video || {};
  return (
    <div className="w-full">
      <div className=" gap-x-4 flex">
        <div className="relative mb-2  md:mb-0 w-2/4 lg:w-1/4 h-[140px]">
          <Link key={video?._id} href={`/videos/${video._id}`}>
            <div className="w-full">
              <div className="absolute inset-0">
                <img
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
            <h6 className="mb-1 font-semibold md:max-w-[75%]">{title}</h6>
            <p className="flex text-sm text-gray-200 sm:mt-3">
              {formatCounting(views)} Views · {moment(createdAt).fromNow()}
            </p>
            <Link href={`/channels/${username}`}>
              <div className="flex items-center gap-x-4">
                <div className="mt-2  h-10 w-10 shrink-0">
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
            </Link>
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
    </div>
  );
};

export default HistoryVideoCard;
