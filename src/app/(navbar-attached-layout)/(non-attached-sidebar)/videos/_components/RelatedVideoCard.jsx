import { formatCounting } from "@/lib/utils";
import moment from "moment";
import Link from "next/link";
import RelatedVideoCardActions from "./RelatedVideoCardActions";

const RelatedVideoCard = ({ video }) => {
  const {
    title,
    thumbnail,
    duration,

    views,
    _id,
    createdAt,
    owner: { fullName } = {},
  } = video;
  return (
    <article className="relative  border rounded">
      <Link href={`/videos/${_id}`} className="w-full gap-x-2  pr-2 md:flex">
        <div className="relative mb-2 w-full md:mb-0 md:w-5/12">
          <div className="w-full pt-[56%]">
            <div className="absolute inset-0">
              <img
                src={thumbnail?.url}
                alt={title}
                className="h-full w-full  rounded-l"
              />
            </div>
            <span className="absolute bottom-1 right-1 inline-block rounded bg-background px-1.5 text-sm">
              {duration}
            </span>
          </div>
        </div>
        <div className="flex gap-x-2 px-2 pb-4 pt-1 md:w-7/12 md:px-0 md:py-0.5">
          <div className="h-12 w-12 shrink-0 md:hidden">
            <img
              src="https://images.pexels.com/photos/18264716/pexels-photo-18264716/free-photo-of-man-people-laptop-internet.jpeg?auto=compress&amp;cs=tinysrgb&amp;w=1260&amp;h=750&amp;dpr=1"
              alt="reactpatterns"
              className="h-full w-full rounded-full"
            />
          </div>
          <div className="w-full pt-1 md:pt-0">
            <h6 className="mb-1 text-sm font-semibold">
              {title.length > 50 ? `${title.slice(0, 50)}...` : title}
            </h6>
            <p className="mb-0.5 mt-2 text-sm "> {fullName} </p>
            <p className="flex text-sm ">
              {formatCounting(views)} Views · {moment(createdAt).fromNow()}
            </p>
          </div>
        </div>
      </Link>
      <RelatedVideoCardActions videoId={_id} />
    </article>
  );
};

export default RelatedVideoCard;
