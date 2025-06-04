"use client";
import { LOGGED_OUT } from "@/actions/user.action";
import { Button } from "@/components/ui/button";
import { TableCell } from "@/components/ui/table";
import useAxios from "@/hooks/useAxios";
import useUserContext from "@/hooks/useUserContext";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const DeviceRowAction = ({ deviceId, currentDevice }) => {
  console.log(" deviceId:", deviceId);
  const { apiClient } = useAxios();
  const { dispatch } = useUserContext();
  const router = useRouter();
  async function handleRemoveDevice() {
    try {
      await apiClient.delete(`/login-history/remove/${deviceId}`);
      toast.success("Device removed successfully");
      router.refresh();
      if (currentDevice) {
        localStorage.removeItem("loggedIn");
        router.push("/");
        dispatch({ type: LOGGED_OUT });
      }
    } catch (error) {
      console.log(" error:", error);
      toast.error("Failed to remove device");
    }
  }
  return (
    <TableCell>
      <Button
        onClick={handleRemoveDevice}
        variant=""
        size="sm"
        className="bg-red-500 text-white hover:bg-red-600"
      >
        Remove Device
      </Button>
    </TableCell>
  );
};

export default DeviceRowAction;
