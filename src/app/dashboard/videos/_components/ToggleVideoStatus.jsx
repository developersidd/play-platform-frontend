"use client";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { TableCell } from "@/components/ui/table";
import useAxios from "@/hooks/useAxios";
import useDebounce from "@/hooks/useDebounce";
import { useRouter } from "next/navigation";
const ToggleVideoStatus = ({
  isVideoPublished,
  setIsVideoPublished,
  videoId,
}) => {
  const { apiClient } = useAxios();
  const router = useRouter();

  const handleDebouncedToggle = useDebounce(async (value) => {
    try {
      await apiClient.patch(`/videos/toggle/publish/${videoId}`, {
        isPublished: value,
      });
      router.refresh();
    } catch (error) {
      console.error("Error toggling video status:", error);
    }
  }, 500);

  return (
    <>
      <TableCell className="pl-6">
        <Switch
          onCheckedChange={(checked) => {
            setIsVideoPublished(checked);
            handleDebouncedToggle(checked);
          }}
          checked={isVideoPublished}
          id="isPrivate"
        />
      </TableCell>
      <TableCell className="w-[9%]">
        <Badge className={`${isVideoPublished ? "bg-secondary" : ""}`}>
          {isVideoPublished ? "Published" : "Unpublished"}
        </Badge>
      </TableCell>
    </>
  );
};

export default ToggleVideoStatus;
