"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useSelection from "@/hooks/useSelection";
import VideosTableFooter from "./VideosTableFooter";
import VideosTableHeader from "./VideosTableHeader";
import VideosTableRow from "./VideosTableRow";
const DashboardVideosTable = ({ videos, totalPages, totalVideos }) => {
  const videoIds = videos?.map((v) => v?._id);
  const { selectedIds, handleCheckboxChange } =
    useSelection(videoIds);
  return (
    <>
      <VideosTableHeader
        onCheckboxChange={handleCheckboxChange}
        selectedIds={selectedIds}
        totalVideos={totalVideos}
      />

      <ScrollArea className="h-[calc(100vh-200px)]   border ">
        <Table className="w-full ">
          <TableHeader className=" h-[55px] *:text-base  *:dark:text-white *:font-medium   bg-dark-bg">
            <TableRow>
              <TableHead className="pl-4">
                <Checkbox
                  checked={selectedIds?.length === videoIds?.length}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange(checked, "all")
                  }
                />
              </TableHead>
              <TableHead className="pl-6">Status </TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Uploaded Video</TableHead>
              <TableHead className="pl-5">Owner</TableHead>
              <TableHead>Views</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Date Uploaded</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {videos?.length > 0 ? (
              videos?.map((video, ind) => (
                <VideosTableRow
                  onCheckboxChange={handleCheckboxChange}
                  ind={ind}
                  key={video?._id}
                  video={video}
                  selectedIds={selectedIds}
                />
              ))
            ) : (
              <TableRow className="h-[70px] *:text-base  *:dark:text-white *:font-medium  border-b-2">
                <TableHead colSpan={6} className="text-center">
                  No videos found
                </TableHead>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </ScrollArea>
      <VideosTableFooter totalPages={totalPages} />
    </>
  );
};
export default DashboardVideosTable;
