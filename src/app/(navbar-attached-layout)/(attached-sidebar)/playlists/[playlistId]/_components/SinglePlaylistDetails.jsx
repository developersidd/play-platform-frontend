import { formatCounting } from "@/lib/utils";
import moment from "moment";

const SinglePlaylistDetails = ({ playlistInfo }) => {
  const {
    video: { thumbnail, title },
    owner: { avatar, fullName, subscribers },
    name,
    description,
    createdAt,
    totalVideos,
  } = playlistInfo || {};
  return (
    <div className="w-full shrink-0 sm:max-w-md xl:max-w-lg">
      <div className="relative mb-2 w-full pt-[56%]">
        <div className="absolute inset-0">
          <img src={thumbnail?.url} alt={title} className="h-full w-full" />
          <div className="absolute inset-x-0 bottom-0">
            <div className="relative border-t bg-white/30 p-4 text-white backdrop-blur-sm before:absolute before:inset-0 before:bg-black/40">
              <div className="relative z-[1]">
                <p className="flex justify-between">
                  <span className="inline-block">Playlist</span>
                  <span className="inline-block"> {totalVideos} videos</span>
                </p>
                <p className="text-sm text-gray-200">
                  100K Views&nbsp;· {moment(createdAt).fromNow()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h6 className="mb-1 font-semibold"> {name} </h6>
      <p className="flex text-sm text-gray-200">{description}</p>
      <div className="mt-6 flex items-center gap-x-3">
        <div className="h-16 w-16 shrink-0">
          <img
            src={avatar?.url}
            alt={fullName}
            className="h-full w-full rounded-full"
          />
        </div>
        <div className="w-full">
          <h6 className="font-semibold"> {fullName} </h6>
          <p className="text-sm text-gray-300">
            {" "}
            {formatCounting(subscribers)} Subscribers
          </p>
        </div>
      </div>
    </div>
  );
};

export default SinglePlaylistDetails;
