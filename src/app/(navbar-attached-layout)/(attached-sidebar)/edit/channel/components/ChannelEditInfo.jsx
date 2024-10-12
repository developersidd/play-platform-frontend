import Link from "next/link";

const ChannelEditInfo = ({ channelInfo }) => {
  const { _id, username, fullName, email, avatar } = channelInfo || {};
  return (
    <div class="flex flex-wrap gap-4 pb-4 pt-6">
      <div class="relative -mt-12 inline-block h-28 w-28 shrink-0 overflow-hidden rounded-full border-2">
        <img src={avatar?.url} alt={username} class="h-full w-full" />
        <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <input type="file" id="profile-image" class="hidden" />
          <label
            for="profile-image"
            class="inline-block h-8 w-8 cursor-pointer rounded-lg bg-white/60 p-1 text-[#ae7aff] hover:bg-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
              ></path>
            </svg>
          </label>
        </div>
      </div>
      <div class="mr-auto inline-block">
        <h1 class="font-bolg text-xl"> {fullName} </h1>
        <p class="text-sm text-gray-400">@{username}</p>
      </div>
      <div class="inline-block">
        <Link
          href={`/${username}`}
          class="group/btn mr-1 flex w-full items-center gap-x-2 bg-[#ae7aff] px-3 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e] sm:w-auto"
        >
          View channel
        </Link>
      </div>
    </div>
  );
};

export default ChannelEditInfo;
