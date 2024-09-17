import {
  LayoutDashboard,
  ShoppingCart,
  UserPen,
  House
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
    title : "Go To Home",
    icon : <House />,
    href : "/"
  }
];
