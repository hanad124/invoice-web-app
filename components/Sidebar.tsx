"use client";

import React, { useState } from "react";
import Image from "next/image";

import logo from "@/public/assets/logo.svg";
import { menuItems } from "@/data/menuItems";
import { BiSearch, BiLogOut } from "react-icons/bi";
import { FiChevronRight, FiChevronDown } from "react-icons/fi";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

const Sidebar = () => {
  const [open, setOpen] = React.useState(false);

  const [activeMenuIndex, setActiveMenuIndex] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<number | null>(null);

  const router = useRouter();
  const pathname = usePathname();

  const handleMenuClick = (index: any) => {
    const clickedMenuItem = menuItems[index];

    if (activeMenuIndex === index && clickedMenuItem.url !== "/dashboard") {
      setActiveMenuIndex(null);
    } else {
      setActiveMenuIndex(index);
    }

    if (clickedMenuItem.url === "/dashboard") {
      setActiveTab(index);
    } else if (activeTab !== index) {
      setActiveTab(index);
    }
  };

  return (
    <>
      <div className="hidden md:block sticky top-0  border-r min-w-60 min-h-screen dark:bg-background dark:border-r-none ">
        <div className="flex flex-col gap-y-4 relativeh-full">
          <div className="flex items-center justify-center gap-2 py-4 mt-1">
            <Image
              src={logo}
              width={35}
              height={35}
              alt="logo"
              className="w-7 h-7 cursor-pointer -mt-1"
            />
            <span className="text-2xl tracking-wide pr-4 cursor-pointer">
              <span className="text-[#061C3D] font-medium">InvoiceFy</span>
            </span>
          </div>
          <ul className="menu   h-full overflow-y-scroll pb-28">
            {menuItems.map((item, index) => {
              const isActive = pathname === item.url;

              if (pathname === "/" && (item.url === "/dashboard" || isActive)) {
                return true;
              }

              return (
                <li key={index}>
                  <Link
                    href={item.url}
                    className={`flex items-center py-1 px-4 `}
                    onClick={() => handleMenuClick(index)}
                  >
                    <div
                      className={`${
                        isActive
                          ? "bg-primary text-white hover:bg-primary cursor-pointer"
                          : "text-slate-600 font-light dark:text-[#949bbd] hover:bg-primary/10 cursor-pointer"
                      } flex items-center w-full py-[7px] px-4 rounded-md cursor-pointer`}
                    >
                      <item.icon className="mr-4 text-lg" />
                      <span>{item.text}</span>
                      {item.submenus.length > 0 && (
                        <span className="ml-auto">
                          {activeMenuIndex === index ? (
                            <FiChevronDown className="ml-auto" />
                          ) : (
                            <FiChevronRight className="ml-auto" />
                          )}
                        </span>
                      )}
                    </div>
                  </Link>
                </li>
              );
            })}

            {/* sign out form  */}
            <form>
              <button
                type="submit"
                className=" mx-4 text-slate-600 dark:text-[#949bbd hover:bg-primary/10 flex items-center  py-[7px] px-4 rounded-md cursor-pointer"
              >
                <BiLogOut className="mr-4 text-lg rotate-180" />
                Log out
              </button>
            </form>
          </ul>
        </div>
      </div>
      <div className="flex justify-between items-center w-full  mt-2 md:hidden">
        <Sheet>
          <SheetTrigger>
            <div className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg  hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
              <span className="sr-only">Open sidebar</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                ></path>
              </svg>
            </div>
          </SheetTrigger>
          <SheetContent side={"left"} className="= h-full overflow-y-scroll">
            <SheetDescription className="">
              <div className="flex items-center  py-4 gap-3">
                <Image
                  src={logo}
                  alt="logo"
                  width={100}
                  height={100}
                  className="w-8"
                />
                <span className="text-[#061C3D] font-medium text-2xl tracking-wide pr-4 cursor-pointer">
                  {" "}
                  InvoiceFy
                </span>
              </div>
              <ul className="menu my-3 h-full overflow-y-scroll pb-28">
                {menuItems.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.url}
                      className={`flex items-center py-1  `}
                      onClick={() => handleMenuClick(index)}
                    >
                      <div
                        className={`${
                          activeTab === index
                            ? "bg-primary text-white hover:bg-primary"
                            : " text-slate-600 dark:text-[#949bbd] hover:bg-primary/10"
                        } flex items-center w-full py-[7px] px-4 rounded-md`}
                      >
                        <item.icon className="mr-4 text-lg" />
                        <span className="text-lg">{item.text}</span>
                        {item.submenus.length > 0 && (
                          <span className="ml-auto">
                            {activeMenuIndex === index ? (
                              <FiChevronDown className="ml-auto" />
                            ) : (
                              <FiChevronRight className="ml-auto" />
                            )}
                          </span>
                        )}
                      </div>
                    </Link>
                    {item.submenus.length > 0 && (
                      <ul
                        className={`submenu pl-3 ${
                          activeMenuIndex === index
                            ? "block duration-300"
                            : "hidden"
                        }`}
                      ></ul>
                    )}
                  </li>
                ))}
              </ul>
            </SheetDescription>
            {/* <SheetHeader>
            </SheetHeader> */}
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default Sidebar;
