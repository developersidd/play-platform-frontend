import { getVideos } from "@/api/video.api";
import DashboardVideosTable from "../../videos/_components/DashboardVideosTable";
const DashboardVideosPage = async ({ searchParams }) => {
  const { page, limit, search, status, sortOrder, sortBy } = searchParams || {};

  const { data: { totalPages, videos } = {} } = await getVideos({
    page: page || 1,
    limit: limit || 20,
    q: search || "",
    status: status || "all",
    sortOrder: sortOrder || "desc",
    sortBy: sortBy || "createdAt",
    expandQuery: true,
  });
  console.log(" data:", JSON.stringify(videos[0], null, 2));
  return (
    <section className="px-8  ">
      <DashboardVideosTable totalPages={totalPages} videos={videos} />
    </section>
  );
};

export default DashboardVideosPage;
