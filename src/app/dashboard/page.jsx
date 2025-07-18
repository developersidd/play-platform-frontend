import { getUserChannelStats } from "@/api/user.api";
import DashboardStats from "./_components/DashboardStats";

const page = async () => {
  const { data } = await getUserChannelStats();
  console.log(" data:", data);

  return (
    <section className="px-8 py-5">
      <DashboardStats stats={data} />
    </section>
  );
};

export default page;
