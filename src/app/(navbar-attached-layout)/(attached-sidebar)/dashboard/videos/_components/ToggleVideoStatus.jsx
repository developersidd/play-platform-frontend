"use client";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { TableCell } from "@/components/ui/table";
import useAxios from "@/hooks/useAxios";
import useDebounce from "@/hooks/useDebounce";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
const ToggleVideoStatus = ({ isPublished, videoId }) => {
  const [isChecked, setIsChecked] = useState(isPublished);
  const { apiClient } = useAxios();
  const router = useRouter();
  useEffect(() => {
    setIsChecked(isPublished);
  }, [isPublished]);
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
      <TableCell className="pl-4 w-[8%]">
        <Switch
          onCheckedChange={(checked) => {
            setIsChecked(checked);
            handleDebouncedToggle(checked);
          }}
          checked={isChecked}
          id="isPrivate"
        />
      </TableCell>
      <TableCell className="w-[10%]">
        <Badge className={`${isChecked ? "bg-secondary" : ""}`}>
          {isChecked ? "Published" : "Unpublished"}
        </Badge>
      </TableCell>
    </>
  );
};

export default ToggleVideoStatus;
