import { getUserChannelStats } from "@/server-actions/user.action";
import DashboardHeader from "./_components/DashboardHeader";

const page = async () => {
  const { data, error } = await getUserChannelStats();

  return (
    <section className="px-8 py-5">
      <DashboardHeader stats={data} />
    </section>
  );
};

export default page;
