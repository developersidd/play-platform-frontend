import { EyeIcon, Heart, HeartOff, Play, User } from "lucide-react";

const statsData = [
  {
    name: "Total videos",
    valueProperty: "videosCount",
    icon: <Play size={18} />,
  },
  {
    name: "Total views",
    valueProperty: "viewsCount",
    icon: <EyeIcon size={20} />,
  },
  {
    name: "Total subscribers",
    valueProperty: "subscribersCount",
    icon: <User size={20} />,
  },
  {
    name: "Total likes",
    valueProperty: "likesCount",
    icon: <Heart size={18} />,
  },
  {
    name: "Total dislikes",
    valueProperty: "dislikesCount",
    icon: <HeartOff size={18} />,
  },
];

const DashboardHeader = ({ stats }) => {
  return (
    <header>
      <div className="grid grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))] gap-4">
        {statsData?.map(({ name, valueProperty, icon }) => (
          <div key={name} className="border p-4">
            <div className="mb-4 block">
              <span className="flex items-center justify-center  h-7 w-7 rounded-full bg-[#E4D3FF] p-1 text-[#ae7aff]">
                {icon}
              </span>
            </div>
            <h6 className="">{name}</h6>
            <p className="text-3xl font-semibold">
              {stats[valueProperty] ?? 0}
            </p>
          </div>
        ))}
      </div>
    </header>
  );
};

export default DashboardHeader;
