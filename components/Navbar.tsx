import React from "react";
import Avator from "@/components/Avator";
import { Card } from "./ui/card";

const Navbar = () => {
  return (
    <div>
      <Card className=" hidden md:flex items-center justify-between flex-wrap p-4 py-3 rounded-none  bg-white/80 dark:bg-background/80  backdrop-blur-lg  sticky left-0 top-0 z-50 shadow-none">
        <div className=""></div>
        <div className="flex items-center gap-4 cursor-pointer flex-shrink-0 ">
          {/* <ModeSwitcher /> */}
          <Avator />
        </div>
      </Card>
    </div>
  );
};

export default Navbar;
