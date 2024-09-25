import { getVideoDisLikes } from "@/api/dislike.api";
import { getVideoLikes } from "@/api/like.api";
import { FilePlus, UserRoundPlus } from "lucide-react";
import moment from "moment";
import VideoLikeDislike from "./VideoLikeDislike";

const VideoDescription = async ({ video, userId }) => {
  const { data } = await getVideoLikes(video._id, userId);
  const { data: dislikes } = await getVideoDisLikes(video._id, userId);
  console.log("dislikes:", dislikes);
  console.log("data:", data);

  const {
    title,
    description,
    views,
    createdAt,
    _id,
    owner: { fullName, username, avatar } = {},
  } = video || {};
  return (
    <div
      className="group mb-4 w-full rounded-lg border p-4 duration-200 hover:bg-white/5 focus:bg-white/5"
      role="button"
      tabIndex="0"
    >
      <div className="flex flex-wrap gap-y-2">
        <div className="w-full md:w-1/2 lg:w-full xl:w-1/2">
          <h1 className="text-lg font-bold">{title}</h1>
          <p className="flex text-sm text-gray-200">
            {views?.toLocaleString()} Views · {moment(createdAt).fromNow()}
          </p>
        </div>
        <div className="w-full md:w-1/2 lg:w-full xl:w-1/2">
          <div className="flex items-center justify-between gap-x-4 md:justify-end lg:justify-between xl:justify-end">
            {/* like  */}
            <VideoLikeDislike
              dislikeData={dislikes}
              likeData={data}
              videoId={_id}
              userId={userId}
            />
            <div className="relative block">
              <button className="peer flex items-center gap-x-2 rounded-lg bg-white px-4 py-1.5 text-black">
                <span className="inline-block w-5">
                  <FilePlus size={20} />
                </span>
                Save
              </button>
              <div className="absolute right-0 top-full z-10 hidden w-64 overflow-hidden rounded-lg bg-[#121212] p-4 shadow shadow-slate-50/30 hover:block peer-focus:block">
                <h3 className="mb-4 text-center text-lg font-semibold">
                  Save to playlist
                </h3>
                <ul className="mb-4">
                  <li className="mb-2 last:mb-0">
                    <label
                      className="group/label inline-flex cursor-pointer items-center gap-x-3"
                      htmlFor="Collections-checkbox"
                    >
                      <input
                        type="checkbox"
                        className="peer hidden"
                        id="Collections-checkbox"
                      />
                      <span className="inline-flex h-4 w-4 items-center justify-center rounded-[4px] border border-transparent bg-white text-white group-hover/label:border-[#ae7aff] peer-checked:border-[#ae7aff] peer-checked:text-[#ae7aff]">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="3"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.5 12.75l6 6 9-13.5"
                          ></path>
                        </svg>
                      </span>
                      Collections
                    </label>
                  </li>
                  <li className="mb-2 last:mb-0">
                    <label
                      className="group/label inline-flex cursor-pointer items-center gap-x-3"
                      htmlFor="JavaScript Basics-checkbox"
                    >
                      <input
                        type="checkbox"
                        className="peer hidden"
                        id="JavaScript Basics-checkbox"
                      />
                      <span className="inline-flex h-4 w-4 items-center justify-center rounded-[4px] border border-transparent bg-white text-white group-hover/label:border-[#ae7aff] peer-checked:border-[#ae7aff] peer-checked:text-[#ae7aff]">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="3"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.5 12.75l6 6 9-13.5"
                          ></path>
                        </svg>
                      </span>
                      JavaScript Basics
                    </label>
                  </li>
                  <li className="mb-2 last:mb-0">
                    <label
                      className="group/label inline-flex cursor-pointer items-center gap-x-3"
                      htmlFor="C++ Tuts-checkbox"
                    >
                      <input
                        type="checkbox"
                        className="peer hidden"
                        id="C++ Tuts-checkbox"
                      />
                      <span className="inline-flex h-4 w-4 items-center justify-center rounded-[4px] border border-transparent bg-white text-white group-hover/label:border-[#ae7aff] peer-checked:border-[#ae7aff] peer-checked:text-[#ae7aff]">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="3"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.5 12.75l6 6 9-13.5"
                          ></path>
                        </svg>
                      </span>
                      C++ Tuts
                    </label>
                  </li>
                  <li className="mb-2 last:mb-0">
                    <label
                      className="group/label inline-flex cursor-pointer items-center gap-x-3"
                      htmlFor="Feel Good Music-checkbox"
                    >
                      <input
                        type="checkbox"
                        className="peer hidden"
                        id="Feel Good Music-checkbox"
                      />
                      <span className="inline-flex h-4 w-4 items-center justify-center rounded-[4px] border border-transparent bg-white text-white group-hover/label:border-[#ae7aff] peer-checked:border-[#ae7aff] peer-checked:text-[#ae7aff]">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="3"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.5 12.75l6 6 9-13.5"
                          ></path>
                        </svg>
                      </span>
                      Feel Good Music
                    </label>
                  </li>
                  <li className="mb-2 last:mb-0">
                    <label
                      className="group/label inline-flex cursor-pointer items-center gap-x-3"
                      htmlFor="Ed Sheeran-checkbox"
                    >
                      <input
                        type="checkbox"
                        className="peer hidden"
                        id="Ed Sheeran-checkbox"
                      />
                      <span className="inline-flex h-4 w-4 items-center justify-center rounded-[4px] border border-transparent bg-white text-white group-hover/label:border-[#ae7aff] peer-checked:border-[#ae7aff] peer-checked:text-[#ae7aff]">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="3"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.5 12.75l6 6 9-13.5"
                          ></path>
                        </svg>
                      </span>
                      Ed Sheeran
                    </label>
                  </li>
                  <li className="mb-2 last:mb-0">
                    <label
                      className="group/label inline-flex cursor-pointer items-center gap-x-3"
                      htmlFor="Python-checkbox"
                    >
                      <input
                        type="checkbox"
                        className="peer hidden"
                        id="Python-checkbox"
                      />
                      <span className="inline-flex h-4 w-4 items-center justify-center rounded-[4px] border border-transparent bg-white text-white group-hover/label:border-[#ae7aff] peer-checked:border-[#ae7aff] peer-checked:text-[#ae7aff]">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="3"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.5 12.75l6 6 9-13.5"
                          ></path>
                        </svg>
                      </span>
                      Python
                    </label>
                  </li>
                </ul>
                <div className="flex flex-col">
                  <label
                    htmlFor="playlist-name"
                    className="mb-1 inline-block cursor-pointer"
                  >
                    Name
                  </label>
                  <input
                    className="w-full rounded-lg border border-transparent bg-white px-3 py-2 text-black outline-none focus:border-[#ae7aff]"
                    id="playlist-name"
                    placeholder="Enter playlist name"
                  />
                  <button className="mx-auto mt-4 rounded-lg bg-[#ae7aff] px-4 py-2 text-black">
                    Create new playlist
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-x-4">
          <div className="mt-2 h-12 w-12 shrink-0">
            <img
              src={avatar?.url}
              alt={username}
              className="h-full w-full rounded-full"
            />
          </div>
          <div className="block">
            <p className="text-gray-200"> {fullName} </p>
            <p className="text-sm text-gray-400">757K Subscribers</p>
          </div>
        </div>
        <div className="block">
          <button className="group/btn mr-1 flex w-full items-center gap-x-2 bg-[#ae7aff] px-3 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e] sm:w-auto">
            <span className="inline-block w-5">
              <UserRoundPlus />
            </span>
            <span className="group-focus/btn:hidden">Subscribe</span>
            <span className="hidden group-focus/btn:block">Subscribed</span>
          </button>
        </div>
      </div>
      <hr className="my-4 border-white" />
      <div className="h-5 overflow-hidden group-focus:h-auto">
        <p className="text-sm">{description}</p>
      </div>
    </div>
  );
};

export default VideoDescription;
