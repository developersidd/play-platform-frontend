"use client";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { TableCell } from "@/components/ui/table";
import { useState } from "react";
const ToggleVideoStatus = ({ isPublished }) => {
  const [isChecked, setIsChecked] = useState(isPublished);
  const handleToggleStatus = () => {
    setIsChecked((prev) => !prev);
  };
  return (
    <>
      <TableCell className="pl-4">
        <Switch
          className="bg-primary"
          onCheckedChange={handleToggleStatus}
          checked={isChecked}
          id="isPrivate"
        />
      </TableCell>
      <TableCell>
        <Badge className={`bg-${isPublished ? "[#ae7aff]" : "[#ffcccb]"}`}>
          {isChecked ? "Published" : "Unpublished"}
        </Badge>
      </TableCell>
    </>
  );
};

export default ToggleVideoStatus;
