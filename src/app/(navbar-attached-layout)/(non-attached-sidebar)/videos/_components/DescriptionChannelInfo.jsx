import { getChannelSubscribers } from "@/actions/subscription.api";
import { formatCounting } from "@/lib/utils";

const DescriptionChannelInfo = async ({ videoOwner }) => {
  const { avatar, fullName, username, _id } = videoOwner || {};
  const { data: { subscribers } = {}, error } =
    (await getChannelSubscribers(_id)) || {};
  return (
    <div className="flex items-center gap-x-4">
      <div className="mt-2 h-12 w-12 shrink-0">
        <img
          src={avatar?.url}
          alt={username}
          className="h-full w-full rounded-full"
        />
      </div>
      <div className="block">
        <p className="font-medium"> {fullName} </p>
        <p className="text-sm ">
          {formatCounting(subscribers) ?? 0} Subscribers
        </p>
      </div>
    </div>
  );
};

export default DescriptionChannelInfo;
