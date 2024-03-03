"use client";

import { create } from "zustand";

interface NewInvoiceModalState {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const openNewInvoiceModal = create<NewInvoiceModalState>((set) => ({
  open: false,
  setOpen: (open: boolean) => set({ open }),
}));
