import { formatCounting } from "@/lib/utils";
import moment from "moment";
import Link from "next/link";

const ChannelPlaylistItem = ({ playlist }) => {
  const { name, description, videos, totalVideos, createdAt, _id } =
    playlist || {};
  const [{ thumbnail }] = videos || [];
  return (
    <Link href={`/playlists/${_id}`} className="w-full">
      <div className="relative mb-2 w-full pt-[56%]">
        <div className="absolute inset-0">
          <img src={thumbnail?.url} alt={name} className="h-full w-full" />
          <div className="absolute inset-x-0 bottom-0">
            <div className="relative border-t bg-white/30 p-4 text-white backdrop-blur-sm before:absolute before:inset-0 before:bg-black/40">
              <div className="relative z-[1]">
                <p className="flex justify-between">
                  <span className="inline-block">Playlist</span>
                  <span className="inline-block"> {totalVideos} videos</span>
                </p>
                <p className="text-sm text-gray-200">
                  {formatCounting(100000)} Views&nbsp;·&nbsp;
                  {moment(createdAt).fromNow()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h6 className="mb-1 font-semibold"> {name} </h6>
      <p className="flex text-sm text-gray-200">
        {description?.length > 60
          ? `${description.slice(0, 60)}...`
          : description}
      </p>
    </Link>
  );
};

export default ChannelPlaylistItem;
