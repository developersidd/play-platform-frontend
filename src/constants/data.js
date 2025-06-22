import {
  BadgeHelp,
  ChartPie,
  Combine,
  FolderClock,
  History,
  Home,
  LayoutDashboard,
  ListVideo,
  MessageSquare,
  Play,
  Settings,
  TabletSmartphone,
  ThumbsUp,
  Users,
  Video,
  Youtube,
} from "lucide-react";

export const sidebarItems = [
  {
    icon: <ChartPie className="size-4 md:size-5" />,
    label: "Dashboard",
    link: "/dashboard",
    auth: true,
  },
  { icon: <Home className="size-4 md:size-5" />, label: "Home", link: "/" },
  {
    icon: <ThumbsUp className="size-4 md:size-5" />,
    label: "Liked Videos",
    link: "/liked-videos",
  },
  {
    icon: <History className="size-4 md:size-5" />,
    label: "History",
    link: "/history",
  },
  {
    icon: <Video className="size-4 md:size-5" />,
    label: "My Content",
    link: "/channels/",
  },
  {
    icon: <Combine className="size-4 md:size-5" />,
    label: "Collections",
    link: "/collections",
  },
  {
    icon: <FolderClock className="size-4 md:size-5" />,
    label: "Watch Later",
    link: "/watch-later",
  },
  {
    icon: <BadgeHelp className="size-4 md:size-5" />,
    label: "Support",
    link: "/support",

    mtAuto: true,
  },
  {
    icon: <Settings className="size-4 lg:size-5" />,
    label: "Settings",
    link: "/settings",
  },
];

export const dashboardNavGroups = [
  {
    name: "Overview",
    items: [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboard,
        shortcut: ["d", "d"],
      },
      {
        title: "My Videos",
        url: "/dashboard/videos",
        icon: Play,
        shortcut: ["p", "p"],
      },
      {
        title: "Login Devices",
        url: "/dashboard/login-devices",
        icon: TabletSmartphone,
        shortcut: ["m", "m"],
      },
      {
        title: "Playlists",
        url: "/dashboard/playlists",
        icon: ListVideo,
        shortcut: ["l", "l"],
      },
      {
        title: "Tweets",
        url: "/dashboard/tweets",
        icon: MessageSquare,
        shortcut: ["t", "t"],
      },
    ],
  },
  {
    name: "Admin",
    items: [
      {
        title: "Users",
        url: "/dashboard/users",
        icon: Users,
        shortcut: ["u", "u"],
      },
      {
        title: "Videos",
        url: "/dashboard/videos/admin",
        icon: Youtube,
        shortcut: ["v", "v"],
      },
    ],
  },
];
