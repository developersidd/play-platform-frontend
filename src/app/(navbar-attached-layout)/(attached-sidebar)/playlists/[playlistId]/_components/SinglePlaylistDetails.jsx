import { formatCounting } from "@/lib/utils";
import { Pencil } from "lucide-react";
import moment from "moment";
import CreatePlaylistModal from "../../../../../../components/common/playlist/playlist-modal/CreatePlaylistModal";

const SinglePlaylistDetails = ({ isPlaylistOwner, playlistInfo }) => {
  console.log(" playlistInfo:", playlistInfo);
  const {
    video,
    owner: { avatar, fullName, subscribers } = {},
    name,
    description,
    createdAt,
    totalVideos,
    _id,
  } = playlistInfo || {};
  console.log(" _id:", _id);
  const { thumbnail = {}, title } = video || {}
  return (
    <div className="w-full shrink-0 sm:max-w-md xl:max-w-lg">
      <div className="relative mb-2 w-full pt-[56%]">
        <div className="absolute inset-0">
          {/* create a pencil button */}
          {isPlaylistOwner && (
            <CreatePlaylistModal playlistId={_id}>
              <button className="absolute right-4 top-4 rounded-full bg-dark-bg p-2  transition-all ">
                <Pencil size={18} />
              </button>
            </CreatePlaylistModal>
          )}
          <img
            src={thumbnail?.url || ""}
            alt={title}
            className="h-full w-full"
          />
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
