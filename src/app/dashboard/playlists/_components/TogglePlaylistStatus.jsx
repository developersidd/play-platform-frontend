"use client";
import { updatePlaylist } from "@/api/playlist.api";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { TableCell } from "@/components/ui/table";
import useDebounce from "@/hooks/useDebounce";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
const ToggleVideoStatus = ({ isPrivate, setIsPrivate, playlistId }) => {
  const router = useRouter();

  const handleDebouncedToggle = useDebounce(async (value) => {
    try {
      const res = await updatePlaylist(playlistId, {
        isPrivate: value,
      });
      //console.log("🚀 ~ res:", res)
      router.refresh();
    } catch (error) {
      toast.error("Failed to update playlist status");
      console.error("Error toggling video status:", error);
    }
  }, 500);

  return (
    <>
      <TableCell className="w-[100px] min-w-[80px]">
        <Switch
          onCheckedChange={(checked) => {
            setIsPrivate(checked);
            handleDebouncedToggle(checked);
          }}
          checked={isPrivate}
          id="isPrivate"
        />
      </TableCell>
      <TableCell className="w-[9%]">
        <Badge className={`${isPrivate ? "bg-secondary" : ""}`}>
          {isPrivate ? "Private" : "Public"}
        </Badge>
      </TableCell>
    </>
  );
};

export default ToggleVideoStatus;
