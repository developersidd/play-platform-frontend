"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  {
    href: "/edit/channel",
    text: "Personal Information",
  },
  {
    href: "/edit/channel/channel-info",
    text: "Channel Information",
  },
  {
    href: "/edit/channel/change-password",
    text: "Change Password",
  },
];

const ChannelEditMenu = () => {
  const pathname = usePathname();
  const activeCls = " border-b-2 bg-white text-[#ae7aff]  border-[#ae7aff]";

  console.log("pathname:", pathname);
  return (
    <ul className="no-scrollbar sticky top-[66px] z-[2] flex flex-row gap-x-2 overflow-auto border-b-2 border-gray-400 bg-[#121212] py-2 sm:top-[82px]">
      {links.map((item) => {
        return (
          <li key={item.text} className="w-full text-center">
            <Link
              href={`${item.href}`}
              className={` ${pathname === `${item.href}` ? activeCls : ""}
                w-full px-3 py-3 inline-block`}
            >
              {item.text}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default ChannelEditMenu;
