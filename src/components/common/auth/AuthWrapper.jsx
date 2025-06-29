import { retrieveCurrentUser } from "@/api/user.api";
import { redirect } from "next/navigation";

const AuthWrapper = async ({ children }) => {
  const { data: user } = await retrieveCurrentUser();
  console.log(" user:", user)
  const isLoggedIn = !!user?._id;

  isLoggedIn ? children : redirect("/login");
};

export default AuthWrapper;
