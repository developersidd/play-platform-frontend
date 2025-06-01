import { LayoutDashboard, Play, TabletSmartphone } from "lucide-react";

//Info: The following data is used for the sidebar navigation and Cmd K bar.
LayoutDashboard;
export const navItems = [
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
];

export const recentSalesData = [
  {
    id: 1,
    name: "Olivia Martin",
    email: "olivia.martin@email.com",
    amount: "+$1,999.00",
    image: "https://api.slingacademy.com/public/sample-users/1.png",
    initials: "OM",
  },
  {
    id: 2,
    name: "Jackson Lee",
    email: "jackson.lee@email.com",
    amount: "+$39.00",
    image: "https://api.slingacademy.com/public/sample-users/2.png",
    initials: "JL",
  },
  {
    id: 3,
    name: "Isabella Nguyen",
    email: "isabella.nguyen@email.com",
    amount: "+$299.00",
    image: "https://api.slingacademy.com/public/sample-users/3.png",
    initials: "IN",
  },
  {
    id: 4,
    name: "William Kim",
    email: "will@email.com",
    amount: "+$99.00",
    image: "https://api.slingacademy.com/public/sample-users/4.png",
    initials: "WK",
  },
  {
    id: 5,
    name: "Sofia Davis",
    email: "sofia.davis@email.com",
    amount: "+$39.00",
    image: "https://api.slingacademy.com/public/sample-users/5.png",
    initials: "SD",
  },
];
