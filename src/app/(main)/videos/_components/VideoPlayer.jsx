//"use client";
import Player from "next-video/player";
import Image from "next/image";
const VideoPlayer = ({ video }) => {
  const { title, thumbnail, video: { url } = {} } = video || {};
  return (
    <div className="relative mb-4 w-full  pt-[56%]">
      <div className="absolute inset-0">
        <Player src={url}>
          <Image
            slot="poster"
            width={1920}
            height={1080}
            className="h-full"
            src={thumbnail?.url}
            //placeholder="blur"
            alt={title}
          />
        </Player>
      </div>
    </div>
  );
};

export default VideoPlayer;
