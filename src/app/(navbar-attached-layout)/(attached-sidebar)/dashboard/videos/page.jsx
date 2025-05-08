import { retrieveCurrentUser } from "@/server-actions/user.action";
import { getVideos } from "@/server-actions/video.action";
import DashboardVideosTable from "./_components/DashboardVideosTable";
import VideosTableFooter from "./_components/VideosTableFooter";
import VideosTableHeader from "./_components/VideosTableHeader";
const DashboardVideosPage = async ({ searchParams }) => {
  const { page, limit, search, status, sortOrder, sortBy } = searchParams || {};
  console.log(" searchParams:", searchParams);
  const {
    data: { username },
  } = (await retrieveCurrentUser()) || {};
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
    <section className="px-8 pt-3">
      <VideosTableHeader />
      <DashboardVideosTable videos={videos} />
      <VideosTableFooter totalPages={totalPages} />
    </section>
  );
};

export default DashboardVideosPage;
