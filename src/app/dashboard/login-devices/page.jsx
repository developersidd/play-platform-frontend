import { getUserLoginHistory } from "@/server-actions/loginHistory.action";
import LoginDevicesTable from "./_components/LoginDevicesTable";

const LoginDevicePage = async () => {
  const { data } = await getUserLoginHistory();
  console.log("login h data:", JSON.stringify(data, null, 2));
  return (
    <section className="px-8  mt-5">
      <LoginDevicesTable devices={data} />
    </section>
  );
};

export default LoginDevicePage;
