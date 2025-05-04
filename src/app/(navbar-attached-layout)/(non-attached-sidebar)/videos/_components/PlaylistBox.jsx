import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  getPlaylistById,
  getUserCollections,
} from "@/server-actions/playlist.action";
import { retrieveCurrentUser } from "@/server-actions/user.action";
import { getWatchLaterVideos } from "@/server-actions/watchLater.action";
import PlaylistBoxItem from "./PlaylistBoxItem";

const PlaylistBox = async ({ playlistId, currentVideoIndex }) => {
  const [name, id] = playlistId.split("_");
  const {
    data: { fullName: userFullName },
  } = (await retrieveCurrentUser()) || {};
  let res;

  // decide which playlist to fetch by id
  if (name === "PL") {
    res = await getPlaylistById(id);
  } else if (name === "CT") {
    res = await getUserCollections({ expand: true });
  } else if (name === "WL") {
    res = await getWatchLaterVideos();
  }
  const {
    data: { name: plName, videos, owner: { fullName } = {} },
    error,
  } = res || {};

  let videosToMap =
    name === "WL" ? res.data?.map(({ video }) => video) : videos;
  const playlistOwner = name === "WL" ? userFullName : fullName;
  let playlistName =
    name === "WL" ? "Watch Later" : name === "CT" ? "My Collection" : plName;
  const totalVideos = videos?.length || res?.data?.length || 0;
  return (
    <Card className="max-w-[398px]">
      <CardHeader className="p-4 border-b">
        <h3 className="font-semibold text-lg"> {playlistName}</h3>
        <div className="flex gap-3">
          <h5 className="text-sm"> {playlistOwner} </h5>
          <p className="text-sm text-muted-foreground">
            {currentVideoIndex + 1}/{totalVideos}
          </p>
        </div>
      </CardHeader>

      <ScrollArea className="h-[632px]">
        <CardContent className="p-0">
          {videosToMap.map((video, index) => {
            const isActiveVideo = index + 1 === currentVideoIndex;
            return (
              <PlaylistBoxItem
                video={video}
                playlistId={playlistId}
                key={video?._id}
                index={index}
                isActiveVideo={isActiveVideo}
              />
            );
          })}
        </CardContent>
      </ScrollArea>
    </Card>
  );
};
export default PlaylistBox;
