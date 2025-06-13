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
import UsersTableFooter from "./UsersTableFooter";
import UsersTableHeader from "./UsersTableHeader";
import UserTableRow from "./UsersTableRow";
const DashboardUsersTable = ({ users, totalPages }) => {
  const userIds = users?.map((v) => v?._id);
  const { selectedIds, handleCheckboxChange } = useSelection(userIds);
  return (
    <>
      <UsersTableHeader
        onCheckboxChange={handleCheckboxChange}
        selectedIds={selectedIds}
      />

      <ScrollArea className="h-[calc(100vh-200px)]   border ">
        <Table className="w-full ">
          <TableHeader className=" h-[55px] *:text-base  *:dark:text-white *:font-medium   bg-dark-bg">
            <TableRow>
              <TableHead className="pl-4">
                <Checkbox
                  checked={selectedIds?.length === userIds?.length}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange(checked, "all")
                  }
                />
              </TableHead>
              <TableHead className="pl-5">Profile</TableHead>
              <TableHead> Videos </TableHead>
              <TableHead> Tweets </TableHead>
              <TableHead> Subscribers </TableHead>
              <TableHead> Subscribed </TableHead>
              <TableHead>Joined At</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users?.length > 0 ? (
              users?.map((user, ind) => (
                <UserTableRow
                  onCheckboxChange={handleCheckboxChange}
                  ind={ind}
                  key={user?._id}
                  user={user}
                  selectedIds={selectedIds}
                />
              ))
            ) : (
              <TableRow className="h-[70px] *:text-base  *:dark:text-white *:font-medium  border-b-2 w-full">
                <TableHead colSpan={6} className="text-center">
                  No users found
                </TableHead>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </ScrollArea>
      <UsersTableFooter totalPages={totalPages} />
    </>
  );
};
export default DashboardUsersTable;
