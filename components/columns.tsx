"use client";

import { ColumnDef } from "@tanstack/react-table";
import { deleteInvoice } from "@/actions/invoiceAction";
import toast, { Toaster } from "react-hot-toast";

import { MoreHorizontal, ArrowUpDown, Trash, Edit, Eye } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import getShortId from "@/helpers/getShortId";
import React from "react";

export type User = {
  id: string;
  client_name: string;
  description: string;
  total: number;
  invoiceDate: string;
  status: string | React.ReactNode | "paid" | "pending";
};

export const columns: ColumnDef<User>[] = [
  // invoice id
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => {
      const invoice = row.original;
      return <div className="font-medium">#{getShortId(invoice.id)}</div>;
    },
  },
  {
    accessorKey: "client_name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "total",
    header: "Total",
    cell: ({ row }) => {
      const total = row.getValue("total");
      return <div className="">{total === 0 ? "Unknown" : `$${total}`}</div>;
    },
  },
  // date
  {
    accessorKey: "invoiceDate",
    header: "Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("invoiceDate"));
      const formatted = date.toLocaleDateString();
      return <div className="">{formatted}</div>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as React.ReactNode;
      return (
        <div
          className={`px-6 py-[7px] max-w-fit rounded-lg text-sm font-medium ${
            status === "paid"
              ? "bg-green-600/10 border-green-600 text-green-600"
              : status === "pending"
              ? "bg-yellow-600/10 border-yellow-600 text-yellow-600"
              : "bg-red-600/10 border-red-600 text-red-600"
          }`}
        >
          {status}
        </div>
      );
    },
  },
];
