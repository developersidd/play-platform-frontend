"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

const links = [
  {
    href: "/",
    text: "Videos",
  },
  {
    href: "/playlist",
    text: "Playlist",
  },
  {
    href: "/tweets",
    text: "Tweets",
  },
  {
    href: "/subscribed",
    text: "Subscribed",
  },
];

const ChannelMenu = ({ isMyChannel }) => {
  const { channelUsername } = useParams();
  const pathname = usePathname();
  const activeCls =
    "dark:text-secondary text-white  border-secondary dark:bg-white bg-secondary font-semibold";

  return (
    <ul className="no-scrollbar sticky top-[66px] z-[2] flex flex-row  overflow-auto  bg-accent  sm:top-[82px]">
      {links.map((item, index) => {
        return (
          // If the channel is not mine, hide the "Subscribed" tab
          !isMyChannel && item.text === "Subscribed" ? null : (
            <li
              key={item.text}
              className={`w-full text-center px-2 md:px-3 py-2 text-sm sm:text-base md:py-3 inline-block  border-b-2 ${
                pathname === `/channels/${channelUsername}${item.href}` ||
                (pathname === `/channels/${channelUsername}` && index === 0)
                  ? activeCls
                  : "border-gray-500"
              }
                `}
            >
              <Link href={`/channels/${channelUsername}${item.href}`}>
                {item.text}
              </Link>
            </li>
          )
        );
      })}
    </ul>
  );
};

export default ChannelMenu;
