import {
  LayoutDashboard,
  ListVideo,
  MessageSquare,
  Play,
  TabletSmartphone,
  Users,
  Youtube,
} from "lucide-react";

LayoutDashboard;
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
        url: "/dashboard/videos-admin",
        icon: Youtube,
        shortcut: ["v", "v"],
      },
    ],
  },
];
