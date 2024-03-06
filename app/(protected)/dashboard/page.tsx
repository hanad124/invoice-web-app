import React from "react";
import { signOut, auth } from "@/auth";

const page = async () => {
  const session = await auth();

  return (
    <div>
      <h1>{JSON.stringify(session)}</h1>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <div className="flex items-center">
          {/* <LogOutIcon className="mr-2 h-4 w-4" /> */}
          <button type="submit">Log out</button>
        </div>
      </form>
    </div>
  );
};

export default page;
