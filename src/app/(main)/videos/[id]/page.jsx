import RelatedVideoList from "../_components/RelatedVideoList";
import VideoComments from "../_components/VideoComments";
import VideoDescription from "../_components/VideoDescription";
import VideoPlayer from "../_components/VideoPlayer";

const SingleVideoPage = async () => {
  return (
    <section className="w-full pb-[70px] sm:ml-[70px] sm:pb-0">
      <div className="flex w-full flex-wrap gap-4 p-4 lg:flex-nowrap">
        <div className="col-span-12 w-full">
          {/* video Player */}
          <VideoPlayer />
          {/* video description */}
          <VideoDescription />
          {/* comments */}
          <VideoComments />
        </div>
        {/* Realted videos */}
        <RelatedVideoList />
      </div>
    </section>
  );
};

export default SingleVideoPage;
