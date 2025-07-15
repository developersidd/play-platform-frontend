import { getUserHistory } from "@/api/user.api";
import moment from "moment";
import { Fragment } from "react";
import HistorySettings from "./_components/HistorySettings";
import HistoryVideoCard from "./_components/HistoryVideoCard";

const HistoryPage = async ({ searchParams }) => {
  const { search } = await searchParams;
  const userHistory = await getUserHistory(search);
  console.log(
    "🚀 ~ HistoryPage ~ userHistory:",
    JSON.stringify(userHistory, null, 2)
  );

  return (
    <div className="w-full px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-16 py-4 md:py-6 xl:py-8">
      <h1 className="text-2xl font-bold mb-8">Watch history</h1>
      <div className="flex items-start justify-between ">
        <div className="w-full lg:w-2/3">
          {userHistory?.data?.length === 0 ? (
            <div className="flex items-center justify-center h-96">
              <h1 className="text-xl">
                {" "}
                {search ? "No results found" : "No history found"}{" "}
              </h1>
            </div>
          ) : (
            userHistory?.data?.map(({ videos, _id } = {}) => {
              const date = moment(_id);
              const today = moment();
              const daysAgo = today.diff(date, "days");
              const formattedDate =
                daysAgo <= 7
                  ? date.format(
                      "dddd"
                    ) /* dddd -> means show the full day name */
                  : date.format(
                      "MMM D, YYYY"
                    ); /*  (MMM D, YYYY) means -> show 3 chars of the month,  day with number and the full year */
              return (
                videos?.length > 0 && (
                  <div key={_id} className="mb-12">
                    <h1 className="mb-4 text-xl font-bold">
                      {" "}
                      {formattedDate}{" "}
                    </h1>
                    <div className="space-y-6">
                      {videos.map(({ video } = {}) => (
                        <Fragment key={video?._id}>
                          {video?._id ? (
                            <HistoryVideoCard key={video?._id} video={video} />
                          ) : (
                            <div className="text-red-500">Video not found or unavailable</div>
                          )}
                        </Fragment>
                      ))}
                    </div>
                  </div>
                )
              );
            })
          )}
        </div>
        <HistorySettings />
      </div>
    </div>
  );
};

export default HistoryPage;
