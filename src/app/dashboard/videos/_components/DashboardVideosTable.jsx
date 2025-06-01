import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import VideosTableRow from "./VideosTableRow";

const DashboardVideosTable = ({ videos }) => {
  return (
    <ScrollArea className="h-[calc(100vh-200px)]   border ">
      <Table className="w-full ">
        <TableHeader className=" h-[55px] *:text-base  *:dark:text-white *:font-medium   bg-dark-bg">
          <TableRow>
            <TableHead className="pl-4">Status </TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Uploaded Video</TableHead>
            <TableHead>Views</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead>Date Uploaded</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {videos?.length > 0 ? (
            videos?.map((video, ind) => (
              <VideosTableRow ind={ind} key={video.id} video={video} />
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
  );
};
export default DashboardVideosTable;
