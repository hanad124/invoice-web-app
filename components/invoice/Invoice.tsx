"use client";

import React, { useState, useEffect } from "react";
import { User, columns } from "@/components/columns";
import { getInvoices } from "@/actions/invoiceAction";
import DataTable from "@/components/invoice/Table";
import { deleteInvoice } from "@/actions/invoiceAction";
import toast, { Toaster } from "react-hot-toast";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { MoreHorizontal, ArrowUpDown, Trash, Edit, Eye } from "lucide-react";
import { openEditInvoiceModal } from "@/store/EditInvoice";
import EditInvoiceModel from "./EditInvoiceModel";
import { invoiceId } from "@/store/EditInvoice";

type InvoiceType = {
  id: string;
  clientName: string;
  clientEmail: string;
  status: string;
  description: string;
  user_id: string;
  total: number;
  created_at: string;
  updated_at: string;
  items: {
    name: string;
    quantity: number;
    price: number;
  }[];
};

const Invoice = () => {
  const [data, setData] = useState<InvoiceType[] | null>(null);

  const { setOpen, open } = openEditInvoiceModal();
  const { setId } = invoiceId();

  const fetchInvoices = async () => {
    try {
      const response = await getInvoices();
      setData(response?.success);
    } catch (error) {
      console.error("Error fetching invoices:", error);
      setData([]); // Set data to empty array if there's an error
    }
  };
  useEffect(() => {
    fetchInvoices();

    return () => {};
  }, [open == false, fetchInvoices]);

  const deleteInvoiceHandler = async (id: string) => {
    const confirm = window.confirm("Are you sure you want to delete?");
    if (!confirm) return;

    toast.promise(deleteInvoice(id), {
      loading: "Deleting invoice...",
      success: "Invoice deleted successfully",
      error: "Error deleting invoice",
    });
  };

  const actions = {
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
                onClick={async () => {
                  setOpen(true);
                  setId(invoice.id);
                  await fetchInvoices();
                }}
              >
                <span className="text-md slate-600">Edit</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <span className="text-md slate-600">View invoice</span>
              </DropdownMenuItem>{" "}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={async () => {
                  deleteInvoiceHandler(invoice.id);
                  await fetchInvoices();
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
  };

  return (
    <div className="mt-10">
      {data && data.length > 0 ? (
        <DataTable
          columns={columns.concat(actions)}
          data={data}
          header="Invoices"
        />
      ) : (
        <div className="flex justify-center items-center h-40">
          <p className="text-lg text-gray-500">No invoices found</p>
        </div>
      )}{" "}
      <EditInvoiceModel />
    </div>
  );
};

export default Invoice;
