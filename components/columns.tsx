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
    // cell: ({ row }) => {
    //   const date = new Date(row.getValue("lastSeen"));
    //   const formatted = date.toLocaleDateString();
    //   return <div className="font-medium">{formatted}</div>;
    // },
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
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const invoice = row.original;

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => navigator.clipboard.writeText(invoice.id)}
              >
                <span className="text-md slate-600">Edit</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <span className="text-md slate-600">View invoice</span>
              </DropdownMenuItem>{" "}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => {
                  deleteInvoiceHandler(invoice.id);
                }}
              >
                <span className="text-md slate-600">Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Toaster />
        </>
      );
    },
  },
];
