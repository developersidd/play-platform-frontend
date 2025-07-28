import { getUserPlaylists } from "@/api/playlist.api";
import { retrieveCurrentUser } from "@/api/user.api";
import DashboardPlaylistTable from "./_components/DashboardPlaylistTable";

const DashboardPlaylistsPage = async ({ searchParams }) => {
  const { search, status, sortOrder, sortBy } = searchParams || {};
  const { data: user } = await retrieveCurrentUser();
  const { data } = await getUserPlaylists(user?.username, {
    q: search || "",
    status: status || "all",
    sortOrder: sortOrder || "desc",
    sortBy: sortBy || "createdAt",
  });
  console.log("🚀 ~ data:", data);

  return (
    <section className="px-8">
      <DashboardPlaylistTable playlists={data} />
    </section>
  );
};

export default DashboardPlaylistsPage;
