"use client";

import React from "react";
import { openNewInvoiceModal } from "@/store/model";
import { Button } from "../ui/button";
import { FiPlus } from "react-icons/fi";
import AddInvoiceModel from "./AddInvoiceModel";

const NewInvoice = () => {
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
      <AddInvoiceModel />
    </div>
  );
};

export default NewInvoice;
