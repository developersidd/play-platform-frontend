import { formatCounting } from "@/lib/utils";
import moment from "moment";
import Link from "next/link";

const ChannelPlaylistItem = ({ playlist }) => {
  const { name, description, videos, owner, totalVideos, createdAt, _id } =
    playlist || {};
  const [{ thumbnail, duration, createdAt: videoCreatedAt }] = videos || [];
  return (
    <Link href={`/playlists/${_id}`} class="w-full">
      <div class="relative mb-2 w-full pt-[56%]">
        <div class="absolute inset-0">
          <img src={thumbnail?.url} alt={name} class="h-full w-full" />
          <div class="absolute inset-x-0 bottom-0">
            <div class="relative border-t bg-white/30 p-4 text-white backdrop-blur-sm before:absolute before:inset-0 before:bg-black/40">
              <div class="relative z-[1]">
                <p class="flex justify-between">
                  <span class="inline-block">Playlist</span>
                  <span class="inline-block"> {totalVideos} videos</span>
                </p>
                <p class="text-sm text-gray-200">
                  {formatCounting(100000)} Views&nbsp;·&nbsp;
                  {moment(createdAt).fromNow()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h6 class="mb-1 font-semibold"> {name} </h6>
      <p class="flex text-sm text-gray-200">
        {description?.length > 60
          ? `${description.slice(0, 60)}...`
          : description}
      </p>
    </Link>
  );
};

export default ChannelPlaylistItem;
