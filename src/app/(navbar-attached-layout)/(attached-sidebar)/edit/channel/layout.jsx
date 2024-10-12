import { retrieveCurrentUser } from "@/api/user.api";
import ChannelEditInfo from "./components/ChannelEditInfo";
import ChannelEditMenu from "./components/ChannelEditMenu";

const ChannelEditLayout = async ({ tabs }) => {
  const { data: user } = await retrieveCurrentUser();

  return (
    <section className="w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
      <div className="relative min-h-[150px] w-full pt-[16.28%]">
        <div className="absolute inset-0 overflow-hidden">
          <img
            //width={1200}
            //height={250}
            className="object-cover w-full h-full"
            src={user?.coverImage?.url}
            alt={user?.username}
          />
        </div>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <input type="file" id="cover-image" className="hidden" />
          <label
            htmlFor="cover-image"
            className="inline-block h-10 w-10 cursor-pointer rounded-lg bg-white/60 p-1 text-[#ae7aff] hover:bg-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
              ></path>
            </svg>
          </label>
        </div>
      </div>
      <div className="px-4 pb-4">
        <ChannelEditInfo channelInfo={user} />
        {/* Sidebar */}
        <ChannelEditMenu />
        {/* Tabs Content */}
        {tabs}
      </div>
    </section>
  );
};

export default ChannelEditLayout;
