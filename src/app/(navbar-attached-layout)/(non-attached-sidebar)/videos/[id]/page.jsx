import { retrieveCurrentUser } from "@/api/user.api";
import { getVideoById } from "@/api/video.api";
import { Card } from "@/components/ui/card";
import { VideoOff } from "lucide-react";
import PlaylistBox from "../_components/PlaylistBox";
import RelatedVideoList from "../_components/RelatedVideoList";
import VideoCommentSection from "../_components/VideoCommentSection";
import VideoDescription from "../_components/VideoDescription";
import VideoPlayer from "../_components/VideoPlayer";

const SingleVideoPage = async ({ params, searchParams }) => {
  const { id } = await params;
  const { list, index } = await searchParams;
  const { data: user } = (await retrieveCurrentUser()) || {};
  const { data: video, error } = (await getVideoById(id, user?._id)) || {};
  const isVideoExist = video?.title && !error;
  return (
    <section className=" w-full mx-2 lg:mx-5  2xl:mx-20 ">
      <div className="flex w-full flex-wrap gap-4 px-2 py-4 md:py-8 lg:flex-nowrap">
        <div className=" w-full">
          {isVideoExist ? (
            <>
              {/* video Player */}
              <VideoPlayer video={video} />
              {/* video description */}
              <VideoDescription video={video} userId={user?._id} />
              {/* comments */}
              <VideoCommentSection videoId={id} userId={user?._id} />
            </>
          ) : (
            <Card className="h-[300px] sm:h-[400px] md:h-[550px] lg:h-[580px] xl:h-[600px] 2xl:h-[720px] flex flex-col items-center justify-center space-y-8 ">
              <VideoOff className="size-40 text-secondary dark:text-gray-500" />
              <p className="text-center text-xl  md:text-2xl xl:text-3xl  font-bold text-gray-500">
                Video not found or has been removed !
              </p>
            </Card>
          )}
        </div>

        {/* Realted videos */}
        <div className="space-y-8">
          {list && index && (
            <PlaylistBox
              currentVideoIndex={parseInt(index)}
              videos={[
                { name: "Hello", _id: "1552" },
                { name: "Hello", _id: "1552" },
              ]}
              playlistId={list}
            />
          )}
          {isVideoExist && <RelatedVideoList videoId={id} />}
        </div>
      </div>
    </section>
  );
};

export default SingleVideoPage;
