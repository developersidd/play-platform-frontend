"use client";
import { TableCell } from "@/components/ui/table";
import useAxios from "@/hooks/useAxios";
import { ScanSearch, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const UserRowActions = ({ username, userId }) => {
  const { apiClient } = useAxios();
  const router = useRouter();

  const handleDeleteUser = async () => {
    try {
      setOpenDeleteAlert(false);
      const res = await apiClient.delete(`/users/${userId}`);
      //console.log(" res:", res);
      router.refresh();
      toast.success("User deleted successfully");
    } catch (e) {
      //console.log(" e:", e);
      toast.error("There was an error occurred");
    }
  };

  return (
    <TableCell>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-4 w-8 p-0">
            <span className="sr-only">Open Menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <Link href={`/channels/${username}`}>
            <DropdownMenuItem className="cursor-pointer">
              <ScanSearch className="h-4 w-4 mr-2" />
              View
            </DropdownMenuItem>
          </Link>

          <DropdownMenuItem
            onClick={handleDeleteUser}
            className="cursor-pointer"
          >
            <Trash2 className="h-4 w-4 mr-2 " />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </TableCell>
  );
};

export default UserRowActions;
