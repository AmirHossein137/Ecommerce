import {
  LayoutDashboard,
  ShoppingCart,
  UserPen,
  BadgeIndianRupee,
  ChartBar,
  Settings,
} from "lucide-react";

export const menus = [
  {
    title: "Dashboard",
    icon: <LayoutDashboard />,
    href: "/admin/dashboard",
  },
  {
    title: "Products",
    icon: <ShoppingCart />,
    href: "/admin/products",
  },
  {
    title: "Accounts",
    icon: <UserPen />,
    href: "/admin/accounts",
  },
  {
    title: "Transactions",
    icon: <BadgeIndianRupee />,
    href: "#",
  },
  {
    title: "Analytics",
    icon: <ChartBar />,
    href: "#",
  },
  {
    title: "Setting",
    icon: <Settings />,
    href: "#",
  },
];
