"use client";

import React, { useState } from "react";
import { User, columns } from "@/components/columns";
import DataTable from "@/components/invoice/Table";
async function getUsers(): Promise<User[]> {
  const res = await fetch(
    "https://64a6f5fc096b3f0fcc80e3fa.mockapi.io/api/users"
  );
  const data = await res.json();
  return data;
}
const Invoice = async () => {
  const data = await getUsers();

  return (
    <div className="mt-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default Invoice;
