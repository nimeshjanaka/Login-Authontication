"use client";

import React from "react";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

const Dashboard = () => {
  const { data: session } = useSession();
  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-8 bg-zinc-300/10 flex flex-col gap-2 my-6">
        <div>
          Name: <span className="font-bold"> {session?.user?.name}</span>
        </div>
        <div>
          Email: <span className="font-bold"> {session?.user?.email}</span>
        </div>

        <button
          onClick={() => signOut()}
          className="bg-red-500 text-white p-2 rounded-md font-bold cursor-pointer px-4 py-2"
        >
          LogOut
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
