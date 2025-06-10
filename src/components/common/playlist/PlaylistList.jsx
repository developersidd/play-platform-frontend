import PlaylistItem from "@/components/common/playlist/PlaylistItem";

const PlaylistList = ({ playlists = [] }) => {
  return (
    <div className="grid gap-4 pt-2 sm:grid-cols-[repeat(auto-fill,_minmax(400px,_1fr))]">
      {playlists.map((playlist) => (
        <PlaylistItem key={playlist?._id} playlist={playlist} />
      ))}
    </div>
  );
};

export default PlaylistList;
