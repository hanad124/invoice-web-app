"use client";

import { create } from "zustand";

interface EditInvoiceModalState {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const openEditInvoiceModal = create<EditInvoiceModalState>((set) => ({
  open: false,
  setOpen: (open: boolean) => set({ open }),
}));

// get invoice id
interface InvoiceIdState {
  id: string;
  setId: (id: string) => void;
}

export const invoiceId = create<InvoiceIdState>((set) => ({
  id: "",
  setId: (id: string) => set({ id }),
}));
