import React from "react";
import Logo from "../../app/logo.svg";
import Image from "next/image";
import { menus } from "@/constans/data";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SideBar = () => {
  const pathname = usePathname();
  console.log(pathname)

  return (
    <div className="bg-white w-[300px] min-h-screen p-4 shrink-0">
      <div className="flex items-center justify-center mt-2">
        <Image src={Logo} width={200} height={60} />
      </div>
      <ul className="space-y-4 mt-8">
        {menus.map((menu, index) => (
          <Link
            key={index}
            className={`flex items-center gap-3 py-4 px-2 rounded-lg cursor-pointer transition duration-200 ${
              pathname === menu.href
                ? "bg-red-600 text-white font-bold"
                : "bg-gray-200 text-gray-600"
            }`}
            href={menu.href}
          >
            {menu.icon}
            {menu.title}
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default SideBar;
