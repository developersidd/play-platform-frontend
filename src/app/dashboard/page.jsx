import { getMonthlySubscriptionGrowth } from "@/api/subscription.api";
import { getUserChannelStats } from "@/api/user.api";
import DashboardCharts from "./_components/DashboardCharts";
import DashboardStats from "./_components/DashboardStats";

const page = async () => {
  const { data } = await getUserChannelStats();
  const { data: subscriptionData } = await getMonthlySubscriptionGrowth();
  return (
    <section className="px-8 py-5">
      <DashboardStats stats={data} />
      <DashboardCharts
        engagementData={data}
        subscriptionData={subscriptionData}
      />
    </section>
  );
};

export default page;
