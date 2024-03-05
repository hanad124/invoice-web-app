import React, { useState } from "react";
import { User, columns } from "@/components/columns";
import { getInvoices } from "@/actions/invoiceAction";
import DataTable from "@/components/invoice/Table";

const Invoice = async () => {
  const data = await getInvoices();

  return (
    <div className="mt-10">
      <DataTable columns={columns} data={data?.success} />
    </div>
  );
};

export default Invoice;
