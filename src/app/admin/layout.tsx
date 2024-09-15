"use client";
import { useAppSelector } from "@/redux/hooks";
import { useSession } from "next-auth/react";
import React from "react";
import SignInPage from "../(auth)/signin/page";
import Loader from "@/components/admin-panel/Loader";
import SideBar from "@/components/admin-panel/SideBar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const isLoading = useAppSelector((store) => store.loadingReducer);
  const { data: Session } = useSession();

  if (!Session?.user) {
    return <SignInPage />;
  }

  return (
    <div className="flex">
      <SideBar />
      <div className="w-full h-full">
        <div className="bg-gray-200 p-4 h-[calc(100vh-64px)]">{children}</div>
      </div>
      {isLoading && <Loader />}
    </div>
  );
};

export default Layout;
