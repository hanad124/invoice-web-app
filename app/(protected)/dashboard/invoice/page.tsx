"use client";

import Invoice from "@/components/invoice/Invoice";
import NewInvoice from "@/components/invoice/NewInvoice";
import { Button } from "@/components/ui/button";
import React from "react";
import { FiPlus } from "react-icons/fi";
import toast, { Toaster } from "react-hot-toast";
import { openNewInvoiceModal } from "@/store/model";

const page = () => {
  const { setOpen } = openNewInvoiceModal();

  return (
    <div>
      <div className="flex justify-between items-center mt-3">
        <h1 className="text-2xl font-semibold text-slate-900">Invoices</h1>
        <Button
          className="flex items-center gap-2 p-2 py-4"
          variant="default"
          color="primary"
          // size={"lg"}
          onClick={() => {
            setOpen(true);
          }}
        >
          <FiPlus className="text-lg" />
          <span>New Invoice</span>
        </Button>
      </div>
      <NewInvoice />

      <Invoice />
      <Toaster />
    </div>
  );
};

export default page;
