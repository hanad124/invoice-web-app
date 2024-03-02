import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { auth } from "@/auth";
import { signOut } from "@/auth";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { User, Settings, UserCircle, LogOutIcon } from "lucide-react";

interface TokenData {
  user: {
    email: string;
  };
  expires: string;
  username: string;
}

const Avator = async () => {
  const getAuth: any = await auth();

  const userAvatar = getAuth?.user?.image;
  const name = getAuth?.user?.name;

  console.log("userAvatar", userAvatar);

  let initials = "";
  if (name) {
    const words = name.split(/\s+/); // Split by whitespace to handle multiple spaces

    // Check if there are words to create initials
    if (words.length > 0) {
      initials = words
        .slice(0, 2) // Take the first two words
        .map((word: string) => word.charAt(0).toUpperCase()) // Get the first letter (and convert to uppercase)
        .join(""); // Join the letters together
    }
  }

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="border-2 border-slate-500/40 rounded-full">
            <Avatar>
              <AvatarImage src={userAvatar} alt="user avatar" />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>{" "}
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64 mr-4">
          <DropdownMenuItem className="cursor-pointer py-2">
            <User className="mr-2 h-4 w-4" />
            <span className="text-md slate-600">{name}</span>
          </DropdownMenuItem>{" "}
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer py-2">
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer py-2 text-red-500 ">
            <form
              action={async () => {
                "use server";
                await signOut();
              }}
            >
              <div className="flex items-center">
                <LogOutIcon className="mr-2 h-4 w-4" />
                <button type="submit">Log out</button>
              </div>
            </form>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Avator;
