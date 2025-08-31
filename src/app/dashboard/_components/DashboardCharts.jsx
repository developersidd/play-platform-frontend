"use client";
import { LoaderCircle } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import EngagementPieChart from "./EngagementPieChart";
import SubscriptionGrowthLineChart from "./SubscriptionGrowthLineChart";

const mockEngagementData = [
  { name: "Likes", propName: "likesCount", value: 0, color: "#22c55e" },
  { name: "Dislikes", propName: "dislikesCount", value: 0, color: "#ef4444" },
  {
    name: "Comments",
    propName: "commentsCount",
    value: 0,
    color: "#3b82f6",
  },
  {
    name: "Subscribers",
    propName: "subscribersCount",
    value: 0,
    color: "#8b5cf6",
  },
];
const DashboardCharts = ({ engagementData, subscriptionData }) => {
  //console.log("🚀 ~ engagementData:", engagementData)
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // make engagement data using memo
  const memorizedEngagementData = useMemo(() => {
    return mockEngagementData.map((item) => {
      return {
        ...item,
        value: (engagementData || {})[item.propName] || 0,
      };
    });
  }, [engagementData]);

  if (!isClient) {
    return (
      <div className="flex h-[50vh] w-full items-center justify-center">
        <LoaderCircle className="h-12  w-full animate-spin " />
      </div>
    );
  }

  return (
    <section className="flex items-start justify-between gap-6 flex-wrap my-16">
      <EngagementPieChart data={memorizedEngagementData} />
      <SubscriptionGrowthLineChart data={subscriptionData} />
    </section>
  );
};

export default DashboardCharts;
