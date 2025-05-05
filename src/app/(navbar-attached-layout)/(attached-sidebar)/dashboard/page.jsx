import { getUserChannelStats } from "@/server-actions/user.action";
import DashboardHeader from "./components/DashboardHeader";

const page = async () => {
  const { data, error } = await getUserChannelStats();
  console.log(" dhaboard data:", data)
  return (
    <section className="ps-5 pe-7 py-5">
      <DashboardHeader stats={data} />
    </section>
  );
};

export default page;
