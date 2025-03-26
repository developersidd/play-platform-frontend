import { getPlaylistById } from "@/actions/playlist.api";
import PlaylistVideos from "./_components/PlaylistVideos";
import SinglePlaylistDetails from "./_components/SinglePlaylistDetails";

const ChannelSinglePlaylistPage = async ({ params: { playlistId } }) => {
  console.log("playlistId:", playlistId);
  const { data, error } = await getPlaylistById(playlistId);
  const { owner, videos = [], ...rest } = data || {};
  return (
    <section className="w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
      <div className="flex flex-wrap gap-x-4 gap-y-10 p-4 xl:flex-nowrap">
        {/* Playlist Details */}
        <SinglePlaylistDetails
          playlistInfo={{
            totalVideos: videos?.length,
            video: (videos ?? [])[0],
            owner,
            ...rest,
          }}
        />
        {/* Playlist Videos */}
        <PlaylistVideos videos={videos} />
      </div>
    </section>
  );
};

export default ChannelSinglePlaylistPage;
