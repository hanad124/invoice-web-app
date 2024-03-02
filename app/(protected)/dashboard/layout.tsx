import React, { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
// import { auth } from "@/auth";
// import { findUserByEmail } from "@/utils/dbOperations";

const layout = async ({ children }: { children: ReactNode }) => {
  //   const user = await auth();
  return (
    <div>
      <div className="flex flex-col md:flex-row">
        <Sidebar />
        <div className="flex-1">
          <Navbar />
          <div className="min-h-screen py-4  bg-slate-100/50 dark:bg-[#091127] px-[10px] md:px-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default layout;
