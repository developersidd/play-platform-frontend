"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

const links = [
  {
    href: "/",
    text: "Videos",
  },
  {
    href: "/channel-playlist",
    text: "Playlist",
  },
  {
    href: "/channel-tweets",
    text: "Tweets",
  },
  {
    href: "/channel-subscribed",
    text: "Subscribed",
  },
];

const ChannelMenu = () => {
  const { channelUsername } = useParams();
  const pathname = usePathname();
  const activeCls = " border-b-2 bg-white text-[#ae7aff]  border-[#ae7aff]";

  return (
    <ul class="no-scrollbar sticky top-[66px] z-[2] flex flex-row gap-x-2 overflow-auto border-b-2 border-gray-400 bg-[#121212] py-2 sm:top-[82px]">
      {links.map((item, index) => {
        console.log(pathname);
        console.log(`/${item.href}`);
        return (
          <li key={item.text} class="w-full text-center">
            <Link
              href={`/${channelUsername}${item.href}`}
              className={` ${
                pathname === `/${channelUsername}${item.href}` ? activeCls : ""
              }
              ${
                pathname === `/${channelUsername}` && index === 0 && activeCls
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
