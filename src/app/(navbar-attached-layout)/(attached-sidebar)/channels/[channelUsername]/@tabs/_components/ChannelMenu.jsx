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

const ChannelMenu = () => {
  const { channelUsername } = useParams();
  const pathname = usePathname();
  const activeCls = " border-b-2 bg-white text-[#ae7aff]  border-[#ae7aff]";

  return (
    <ul className="no-scrollbar sticky top-[66px] z-[2] flex flex-row gap-x-2 overflow-auto border-b-2 border-gray-400 bg-[#121212] py-2 sm:top-[82px]">
      {links.map((item, index) => {
        return (
          <li key={item.text} className="w-full text-center">
            <Link
              href={`/channels/${channelUsername}${item.href}`}
              className={` ${
                pathname === `/channels/${channelUsername}${item.href}`
                  ? activeCls
                  : ""
              }
              ${
                pathname === `/channels/${channelUsername}` &&
                index === 0 &&
                activeCls
              }  w-full px-3 py-3 inline-block`}
            >
              {item.text}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default ChannelMenu;
