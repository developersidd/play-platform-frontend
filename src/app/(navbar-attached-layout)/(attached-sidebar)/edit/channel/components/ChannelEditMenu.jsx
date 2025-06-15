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
  const activeCls = "text-[#ae7aff]  border-[#ae7aff] bg-white font-medium";

  return (
    <ul className=" no-scrollbar sticky top-[66px] z-[2] flex flex-row overflow-auto   bg-[#121212] sm:top-[82px]">
      {links.map((item) => {
        return (
          <li
            key={item.text}
            className={`w-full text-center px-3 py-3 border-b-2 inline-block relative ${
              pathname === `${item.href}` ? activeCls : "border-gray-500"
            }
                `}
          >
            <Link href={`${item.href}`}>{item.text}</Link>
          </li>
        );
      })}
    </ul>
  );
};

export default ChannelEditMenu;
