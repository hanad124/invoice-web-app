// "use client";

import Invoice from "@/components/invoice/Invoice";
import NewInvoice from "@/components/invoice/NewInvoice";

import React from "react";
import toast, { Toaster } from "react-hot-toast";

const page = () => {
  return (
    <div>
      <NewInvoice />
      <Invoice />
      <Toaster />
    </div>
  );
};

export default page;
