import { getAllUsers } from "@/api/user.api";
import DashboardUsersTable from "./_components/DashboardUsersTable";
const AdminUsersPage = async ({ searchParams }) => {
  const { page, limit, search, sortOrder, sortBy } = searchParams || {};
  const { data: { totalPages, users } = {} } = await getAllUsers({
    page: page || 1,
    limit: limit || 20,
    q: search || "",
    sortOrder: sortOrder || "desc",
    sortBy: sortBy || "createdAt",
  });
  //console.log(" data:", data);
  return (
    <section className="px-8  ">
      <DashboardUsersTable totalPages={totalPages} users={users} />
    </section>
  );
};

export default AdminUsersPage;
