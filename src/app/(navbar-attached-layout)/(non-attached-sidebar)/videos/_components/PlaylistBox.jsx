import { getPlaylistById } from "@/api/playlist.api";
import { retrieveCurrentUser } from "@/api/user.api";
import { getWatchLaterVideos } from "@/api/watchLater.api";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { redirect } from "next/navigation";
import PlaylistBoxItem from "./PlaylistBoxItem";
const PlaylistBox = async ({ playlistId, currentVideoIndex }) => {
  //console.log(" currentVideoIndex:", currentVideoIndex);
  const [name, id] = playlistId.split("_");
  const { data: { fullName: userFullName } = {} } =
    (await retrieveCurrentUser()) || {};
  let res;
  const listName = name?.trim()?.toLowerCase() || "";
  
  // if user is not logged in, and trying to access watch later or collection, redirect to home
  if (!userFullName && ["wl", "ct"].includes(listName)) {
    return redirect("/");
  }

  // decide which playlist to fetch by id
  if (["pl", "ct"].includes(listName)) {
    res = await getPlaylistById(id);
  } else if (["wl"].includes(listName)) {
    res = await getWatchLaterVideos();
  } else {
    return redirect("/");
  }
  const {
    data: { name: plName, videos, owner: { fullName } = {} },
  } = res || {};
  console.log("🚀 ~ res:", res)
  let videosToMap = videos || [];
  if (["wl"].includes(listName)) {
    videosToMap = res?.data
  }
  //console.log("res", res);
  const playlistOwner = listName === "wl" ? userFullName : fullName;
  let playlistName = listName === "wl" ? "Watch Later" : plName;
  const totalVideos = videosToMap?.length || 0;
  return (
    <Card className="w-[398px]">
      <CardHeader className="p-4 border-b">
        <h3 className="font-semibold text-lg"> {playlistName}</h3>
        <div className="flex gap-3">
          <h5 className="text-sm"> {playlistOwner} </h5>
          <p className="text-sm text-muted-foreground">
            {currentVideoIndex}/{totalVideos}
          </p>
        </div>
      </CardHeader>

      <ScrollArea className="h-[632px]">
        <CardContent className="p-0">
          {videosToMap?.map((videoItem, index) => {
            const isActiveVideo = index + 1 === currentVideoIndex;
            return (
              <PlaylistBoxItem
                videoItem={videoItem}
                playlistId={playlistId}
                key={videoItem?._id}
                index={index + 1}
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
