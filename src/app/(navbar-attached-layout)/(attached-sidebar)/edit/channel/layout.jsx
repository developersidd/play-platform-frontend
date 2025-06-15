import { retrieveCurrentUser } from "@/server-actions/user.action";
import ChannelEditInfo from "./components/ChannelEditInfo";
import ChannelEditMenu from "./components/ChannelEditMenu";
import UploadCoverImage from "./components/UploadCoverImage";

const ChannelEditLayout = async ({ tabs }) => {
  const { data: user } = await retrieveCurrentUser();

  return (
    <section className="w-full">
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
