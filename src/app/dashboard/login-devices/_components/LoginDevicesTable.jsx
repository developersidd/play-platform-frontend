import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DevicesTableRow from "./DevicesTableRow";

const LoginDevicesTable = ({ devices }) => {
  return (
    <ScrollArea className="h-[calc(100vh-200px)]   border ">
      <Table className="w-full ">
        <TableHeader className=" h-[55px] *:text-base  *:dark:text-white *:font-medium   bg-dark-bg">
          <TableRow>
            <TableHead>Device</TableHead>
            <TableHead>OS</TableHead>
            <TableHead>Version</TableHead>
            <TableHead>Ip</TableHead>
            <TableHead>Browser</TableHead>
            <TableHead> Joined At </TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {devices?.length > 0 ? (
            devices?.map((device, ind) => (
              <DevicesTableRow ind={ind} key={device.id} device={device} />
            ))
          ) : (
            <TableRow className="h-[70px] *:text-base  *:dark:text-white *:font-medium  border-b-2">
              <TableHead colSpan={6} className="text-center">
                No device found
              </TableHead>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </ScrollArea>
  );
};
export default LoginDevicesTable;
