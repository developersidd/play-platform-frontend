import { TableCell, TableRow } from "@/components/ui/table";
import { Pencil, ScanSearch, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import ToggleVideoStatus from "./ToggleVideoStatus";

const VideosTableRow = ({ video, ind }) => {
  const { _id, title, thumbnail, createdAt, likes, dislikes, isPublished } =
    video || {};
  return (
    <TableRow className=" h-[70px]">
      <ToggleVideoStatus isPublished={isPublished} />
      <TableCell className="w-1/3">
        <div className="flex items-center gap-4">
          <Image
            width={40}
            height={40}
            className="h-10 w-10 rounded-full"
            src={
              thumbnail?.url ||
              "https://images.pexels.com/photos/3532545/pexels-photo-3532545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            }
            alt={title || "Video Thumbnail"}
          />
          <h3 className="font-semibold">{title}</h3>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex gap-4">
          <span className="inline-block rounded-xl bg-green-200 px-1.5 py-0.5 text-green-700">
            {likes} likes
          </span>
          <span className="inline-block rounded-xl bg-red-200 px-1.5 py-0.5 text-red-700">
            {dislikes} dislikes
          </span>
        </div>
      </TableCell>
      <TableCell>{moment(createdAt).format("Do MMM YYYY")}</TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-4 w-8 p-0">
              <span className="sr-only">Open Menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <Link href={`/videos/${_id}`}>
              <DropdownMenuItem className="cursor-pointer">
                <ScanSearch className="h-4 w-4 mr-2" />
                View
              </DropdownMenuItem>
            </Link>

            <DropdownMenuItem className="cursor-pointer">
              <Pencil className="h-4 w-4 mr-2" />
              Edit
            </DropdownMenuItem>

            <DropdownMenuItem className="cursor-pointer">
              <Trash2 className="h-4 w-4 mr-2 " />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};

export default VideosTableRow;
