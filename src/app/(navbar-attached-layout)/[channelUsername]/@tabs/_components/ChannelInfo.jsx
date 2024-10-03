import { formatCounting } from "@/lib/utils";

const ChannelInfo = ({ channelInfo, loggedInUserId }) => {
  const {
    username,
    subscribersCount,
    isSubscribed,
    subscribedChannelsCount,
    fullName,
    email,
    avatar,
  } = channelInfo || {};
  return (
    <div class="flex flex-wrap gap-4 pb-4 pt-6">
      <span class="relative -mt-12 inline-block h-28 w-28 shrink-0 overflow-hidden rounded-full border-2">
        <img src={avatar?.url} alt={username} class="h-full w-full" />
      </span>
      <div class="mr-auto inline-block">
        <h1 class="font-bolg text-xl"> {fullName} </h1>
        <p class="text-sm text-gray-400">@ {username}</p>
        <p class="text-sm text-gray-400">
          {formatCounting(subscribersCount)} Subscribers&nbsp;·&nbsp;
          {formatCounting(subscribedChannelsCount)} Subscribed
        </p>
      </div>
      <div class="inline-block">
        <div class="inline-flex min-w-[145px] justify-end">
          <button class="group/btn mr-1 flex w-full items-center gap-x-2 bg-[#ae7aff] px-3 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e] sm:w-auto">
            <span class="inline-block w-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
                ></path>
              </svg>
            </span>

            <span>{isSubscribed ? "Subscribed" : "Subscribe"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChannelInfo;
