import { getChannelSubscribers } from "@/api/subscription.api";
import { formatCounting } from "@/lib/utils";

const DescriptionChannelInfo = async ({ videoOwner }) => {
  //console.log("videoOwner:", videoOwner);
  const { avatar, fullName, username, _id } = videoOwner || {};
  const { data: { subscribers } = {} } =
    (await getChannelSubscribers(_id)) || {};
  //console.log("subscribers:", subscribers);
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
        <p className="text-gray-200"> {fullName} </p>
        <p className="text-sm text-gray-400">
          {formatCounting(subscribers) ?? 0} Subscribers
        </p>
      </div>
    </div>
  );
};

export default DescriptionChannelInfo;
