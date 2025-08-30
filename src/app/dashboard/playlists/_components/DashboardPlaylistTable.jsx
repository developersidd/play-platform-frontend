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
import PlaylistTableHeader from "./PlaylistTableHeader";
import PlaylistTableRow from "./PlaylistTableRow";
const DashboardPlaylistTable = ({ playlists }) => {
  const playlistIds = playlists?.map((v) => v?._id);
  const { selectedIds, handleCheckboxChange } = useSelection(playlistIds);
  return (
    <>
      <PlaylistTableHeader
        onCheckboxChange={handleCheckboxChange}
        selectedIds={selectedIds}
      />

      <ScrollArea className="h-[calc(100vh-140px)]   border overflow-x-auto">
        <Table className="w-full min-w-max">
          <TableHeader className=" h-[55px] *:text-base  *:dark:text-white *:font-medium   bg-dark-bg">
            <TableRow>
              <TableHead className="pl-4">
                <Checkbox
                  checked={selectedIds?.length === playlistIds?.length}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange(checked, "all")
                  }
                />
              </TableHead>
              <TableHead>Status </TableHead>
              <TableHead>Visibility</TableHead>
              <TableHead>Playlist Name</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>Videos</TableHead>
              <TableHead>Date Uploaded</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="!overflow-x-auto">
            {playlists?.length > 0 ? (
              playlists?.map((playlist, ind) => (
                <PlaylistTableRow
                  onCheckboxChange={handleCheckboxChange}
                  ind={ind}
                  key={playlist?._id}
                  playlist={playlist}
                  selectedIds={selectedIds}
                />
              ))
            ) : (
              <TableRow className="h-[70px] *:text-base  *:dark:text-white *:font-medium  border-b-2">
                <TableHead colSpan={6} className="text-center">
                  No playlists found
                </TableHead>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </ScrollArea>
    </>
  );
};
export default DashboardPlaylistTable;
