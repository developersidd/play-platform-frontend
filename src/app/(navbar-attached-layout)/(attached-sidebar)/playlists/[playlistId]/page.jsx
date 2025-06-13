import { getPlaylistById } from "@/server-actions/playlist.action";
import { retrieveCurrentUser } from "@/server-actions/user.action";
import PlaylistVideos from "./_components/PlaylistVideos";
import SinglePlaylistDetails from "./_components/SinglePlaylistDetails";

const ChannelSinglePlaylistPage = async ({ params: { playlistId } }) => {
  const { data: user } = await retrieveCurrentUser();
  const { data, error } = await getPlaylistById(playlistId);
  const { owner, videos = [], ...rest } = data || {};
  console.log(" videosff:", videos)
  const isPlaylistOwner = user?._id === owner?._id;
  return (
    <section className="w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
      <div className="flex flex-wrap gap-x-4 gap-y-10 p-4 xl:flex-nowrap">
        {/* Playlist Details */}
        <SinglePlaylistDetails
          playlistInfo={{
            totalVideos: videos?.length,
            video: (videos ?? [])[0]?.video,
            owner,
            ...rest,
          }}
          isPlaylistOwner={isPlaylistOwner}
        />
        {/* Playlist Videos */}
        <PlaylistVideos playlistId={playlistId} videos={videos} />
      </div>
    </section>
  );
};

export default ChannelSinglePlaylistPage;
