import { getUserChannelStats } from "@/server-actions/user.action";
import DashboardStats from "./_components/DashboardStats";

const page = async () => {
  const { data } = await getUserChannelStats();

  return (
    <section className="px-8 py-5">
      <DashboardStats stats={data} />
    </section>
  );
};

export default page;
