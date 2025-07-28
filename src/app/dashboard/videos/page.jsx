import { retrieveCurrentUser } from "@/api/user.api";
import { getVideos } from "@/api/video.api";
import DashboardVideosTable from "./_components/DashboardVideosTable";
const DashboardVideosPage = async ({ searchParams }) => {
  const { page, limit, search, status, sortOrder, sortBy } = searchParams || {};
  console.log(" searchParams:", searchParams);
  const { data: { username } = {} } = (await retrieveCurrentUser()) || {};
  const { data: { totalPages, videos } = {}, data } = await getVideos({
    page: page || 1,
    limit: limit || 20,
    username,
    q: search || "",
    status: status || "all",
    sortOrder: sortOrder || "desc",
    sortBy: sortBy || "createdAt",
    expandQuery: true,
  });
  
  console.log(" data:", data);
  return (
    <section className="px-8  ">
      <DashboardVideosTable totalPages={totalPages} videos={videos} />
    </section>
  );
};

export default DashboardVideosPage;
