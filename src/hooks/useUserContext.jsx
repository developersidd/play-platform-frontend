import { UserContext } from "@/context";
import { useContext } from "react";

const useUserContext = () => {
  return useContext(UserContext);
};

export default useUserContext;
