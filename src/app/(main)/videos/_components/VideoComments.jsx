const VideoComments = () => {
  return (
    <div>
      <button className="peer w-full rounded-lg border p-4 text-left duration-200 hover:bg-white/5 focus:bg-white/5 sm:hidden">
        <h6 className="font-semibold">573 Comments...</h6>
      </button>
      <div className="fixed inset-x-0 top-full z-[60] h-[calc(100%-69px)] overflow-auto rounded-lg border bg-[#121212] p-4 duration-200 hover:top-[67px] peer-focus:top-[67px] sm:static sm:h-auto sm:max-h-[500px] lg:max-h-none">
        <div className="block">
          <h6 className="mb-4 font-semibold">573 Comments</h6>
          <input
            type="text"
            className="w-full rounded-lg border bg-transparent px-2 py-1 placeholder-white"
            placeholder="Add a Comment"
          />
        </div>
        <hr className="my-4 border-white" />
        <div>
          <div className="flex gap-x-4">
            <div className="mt-2 h-11 w-11 shrink-0">
              <img
                src="https://images.pexels.com/photos/18148932/pexels-photo-18148932/free-photo-of-woman-reading-book-on-a-bench.jpeg?auto=compress&amp;cs=tinysrgb&amp;w=1260&amp;h=750&amp;dpr=1"
                alt="sarahjv"
                className="h-full w-full rounded-full"
              />
            </div>
            <div className="block">
              <p className="flex items-center text-gray-200">
                Sarah Johnson&nbsp;·&nbsp;
                <span className="text-sm">17 hour ago</span>
              </p>
              <p className="text-sm text-gray-200">@sarahjv</p>
              <p className="mt-3 text-sm">
                This series is exactly what I&apos;ve been looking for! Excited
                to dive into these advanced React patterns. Thanks for putting
                this together!
              </p>
            </div>
          </div>
          <hr className="my-4 border-white" />
        </div>
      </div>
    </div>
  );
};

export default VideoComments;
