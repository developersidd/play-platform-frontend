import { retrieveCurrentUser } from "@/api/user.api";
import ChannelEditInfo from "./components/ChannelEditInfo";
import ChannelEditMenu from "./components/ChannelEditMenu";
import UploadCoverImage from "./components/UploadCoverImage";

const ChannelEditLayout = async ({ tabs }) => {
  const { data: user } = await retrieveCurrentUser();

  return (
    <section className="w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
      <UploadCoverImage
        coverImage={user?.coverImage}
        username={user?.username}
      />
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
