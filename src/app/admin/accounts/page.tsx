"use client";
import { useSession } from "next-auth/react";
import React from "react";

const Accounts = () => {
  const { data: session } = useSession();
  console.log(session);

  return (
    <div className="w-full h-full p-4 bg-white rounded-lg">
      <div className="flex items-center text-lg gap-3 font-bold p-5 border border-gray-200 rounded-xl">
        <span className="text-gray-500">Your Email :</span>
        <span className="text-slate-800">{session?.user?.email}</span>
      </div>
    </div>
  );
};

export default Accounts;
