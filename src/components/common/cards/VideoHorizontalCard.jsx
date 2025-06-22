import { formatCounting } from "@/lib/utils";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import VideoHorizontalCardActions from "./VideoHorizontalCardActions";

const VideoHorizontalCard = ({ video, linkQuery }) => {
  const {
    _id,
    title,
    views,
    createdAt,
    description,
    thumbnail,
    duration,
    owner: { avatar, username, fullName } = {},
  } = video || {};
  let link = `/videos/${_id}`;
  if (linkQuery) {
    const queryParams = new URLSearchParams(linkQuery);
    link += `?${queryParams.toString()}`;
  }
  return (
    <article className="relative">
      <Link href={link} className="block">
        <div className="gap-x-4 md:flex">
          {/* Thumbnail Section */}
          <figure className="mb-2 w-full md:mb-0 md:w-5/12 2xl:w-3/12">
            <div className="md:h-[190px] w-full relative">
              <Image
                width={850}
                height={400}
                src={thumbnail?.url || "/assets/images/video-not-found.jpg"}
                alt={`Thumbnail for ${title}`}
                className="w-full h-full rounded-md"
              />
              <figcaption className="absolute bottom-1 right-1 inline-block rounded bg-black px-1.5 text-sm">
                {duration}
              </figcaption>
            </div>
          </figure>

          {/* Content Section */}
          <section className="flex gap-x-2 md:w-7/12 2xl:w-9/12">
            <Link
              href={`/channels/${username}`}
              aria-label={`Visit ${fullName}'s channel`}
            >
              <figure className="h-10 w-10 shrink-0 md:hidden">
                <Image
                  width={100}
                  height={100}
                  src={avatar?.url}
                  alt={`${fullName}'s avatar`}
                  className="h-full w-full rounded-full"
                />
              </figure>
            </Link>

            <div className="w-full">
              <header>
                <h3 className="mb-1 font-semibold md:max-w-[75%]">{title}</h3>
                <p className="flex text-sm text-gray-200 sm:mt-3">
                  <span>{formatCounting(views)} Views</span>
                  <time dateTime={moment(createdAt).format()} className="mx-2">
                    · {moment(createdAt).fromNow()}
                  </time>
                </p>
              </header>

              {/* Channel Info */}
              <address className="flex items-center gap-x-4 mt-2 not-italic">
                <figure className="hidden md:block h-10 w-10 shrink-0">
                  <Image
                    width={100}
                    height={100}
                    src={avatar?.url}
                    alt={`${fullName}'s avatar`}
                    className="h-full w-full rounded-full"
                  />
                </figure>
                <p className="text-sm text-gray-200">{fullName}</p>
              </address>

              {/* Video Description */}
              {description?.length > 0 && (
                <p className="mt-2 hidden text-sm md:block">
                  {description.length > 100
                    ? `${description.slice(0, 100)}...`
                    : description}
                </p>
              )}
            </div>
          </section>
        </div>
        {/* actions */}
      </Link>
      <VideoHorizontalCardActions videoId={_id} />
    </article>
  );
};

export default VideoHorizontalCard;
