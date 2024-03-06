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

export type User = {
  id: string;
  name: string;
  emaiL: string;
  image: string;
  lastSeen: string;
};

const deleteInvoiceHandler = async (id: string) => {
  const confirm = window.confirm("Are you sure you want to delete?");
  if (!confirm) return;

  toast.promise(deleteInvoice(id), {
    loading: "Deleting invoice...",
    success: "Invoice deleted successfully",
    error: "Error deleting invoice",
  });
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
  },
  // date
  {
    accessorKey: "invoiceDate",
    header: "Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("invoiceDate"));
      const formatted = date.toLocaleDateString();
      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status");
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
