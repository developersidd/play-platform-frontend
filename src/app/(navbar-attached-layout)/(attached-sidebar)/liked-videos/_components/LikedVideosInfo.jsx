import { formatCounting } from "@/lib/utils";
import moment from "moment";
import Image from "next/image";

const LikedVideosInfo = ({ likedVideosInfo }) => {
  const { video: { thumbnail, title, createdAt, views = 0 } = {}, totalVideos } =
    likedVideosInfo || {};
  return (
    <div className="w-full shrink-0 sm:max-w-md xl:max-w-lg">
      <div className="relative mb-2 w-full pt-[56%]">
        <div className="absolute inset-0">
          <Image
            width={450}
            height={300}
            src={thumbnail?.url || "/assets/images/video-not-found.jpg"} alt={title || "not found video"} className="h-full w-full" />
          <div className="absolute inset-x-0 bottom-0">
            <div className="relative border-t bg-white/30 p-4 text-white backdrop-blur-sm before:absolute before:inset-0 before:bg-black/40">
              <div className="relative z-[1]">
                <p className="flex justify-between">
                  <span className="inline-block"> Liked Videos</span>
                  <span className="inline-block"> {totalVideos} videos</span>
                </p>
                <p className="text-sm text-gray-200">
                  {formatCounting(views)} Views&nbsp;·{" "}
                  {moment(createdAt).fromNow()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h6 className="mb-1 font-semibold"> Liked Videos </h6>
      <p className="flex text-sm text-gray-200">{""}</p>
    </div>
  );
};

export default LikedVideosInfo;
