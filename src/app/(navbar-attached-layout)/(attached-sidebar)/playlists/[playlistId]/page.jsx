import { getPlaylistById } from "@/api/playlist.api";
import { retrieveCurrentUser } from "@/api/user.api";
import PlaylistVideos from "./_components/PlaylistVideos";
import SinglePlaylistDetails from "./_components/SinglePlaylistDetails";

const ChannelSinglePlaylistPage = async ({ params }) => {
  const { playlistId } = await params;
  const { data: user } = await retrieveCurrentUser();
  const { data } = await getPlaylistById(playlistId);
  const { owner, videos = [], ...rest } = data || {};
  console.log(" videosss:", videos);
  const isPlaylistOwner = user?._id === owner?._id;
  const [{ video }] = videos?.filter(({ video }) => video?.title) || [];
  return (
    <section className="w-full ">
      <div className="flex flex-wrap gap-x-4 gap-y-10 p-4 xl:flex-nowrap">
        {/* Playlist Details */}
        <SinglePlaylistDetails
          playlistInfo={{
            totalVideos: videos?.length,
            video,
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
