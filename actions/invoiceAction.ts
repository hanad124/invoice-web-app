"use server";

import { db } from "@/lib/db";
import prisma from "@/prisma";

import { invoiceSchema } from "@/schemas/invoice";
import { getCurrentUser } from "./userActions";
import { z } from "zod";
import { revalidatePath, revalidateTag } from "next/cache";

export const createInvoice = async (values: z.infer<typeof invoiceSchema>) => {
  try {
    const currentUser = await getCurrentUser();
    const validateFields = invoiceSchema.safeParse(values);
    // console.log(validateFields);
    if (!validateFields.success) {
      return { error: "invalid fields" };
    }

    if (!currentUser) {
      return { error: "no user found" };
    }

    const { client_name, total, status, invoiceDate, items, description } =
      validateFields.data;

    // check if the any of the items is not valid or empty
    if (
      items?.some((item) => !item.name || !item.quantity || !item.price) ||
      client_name === "" ||
      total === 0 ||
      invoiceDate === "" ||
      description === ""
    ) {
      console.log("invalid item fields");
      return { error: "invalid fields, please fill empty fields" };
    }

    const invoice = await prisma.invoice.create({
      data: {
        user_id: currentUser?.user?.id,
        client_name,
        total,
        status: status,
        invoiceDate,
        description,
        items: {
          create: items,
        },
      },
    });

    if (!invoice) {
      return { error: "invoice not created" };
    }

    console.log(invoice);
    await getInvoices();
    revalidatePath("/dashboard/invoices");
    revalidateTag("invoices");
    return { success: "invoice created successfully" };
  } catch (error) {
    console.error(error);
  }
};

export const getInvoices = async () => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return { error: "no user found" };
    }

    const invoices = await prisma.invoice.findMany({
      where: {
        user_id: currentUser?.user?.id,
      },
      include: {
        items: true,
      },
    });

    if (!invoices) {
      return { error: "no invoices found" };
    }

    return { success: invoices };
  } catch (error) {
    console.error(error);
  }
};

export const getInvoiceById = async (id: string) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return { error: "no user found" };
    }

    const invoice = await prisma.invoice.findUnique({
      where: {
        id,
      },
      include: {
        items: true,
      },
    });

    if (!invoice) {
      return { error: "invoice not found" };
    }

    return { success: invoice };
  } catch (error) {
    console.error(error);
  }
};

export const deleteInvoice = async (id: string) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return { error: "no user found" };
    }

    const invoice = await prisma.invoice.delete({
      where: {
        id,
      },
    });

    if (!invoice) {
      return { error: "invoice not found" };
    }

    await getInvoices();
    revalidatePath("/dashboard/invoices");
    revalidateTag("invoices");
    return { success: "invoice deleted successfully" };
  } catch (error) {
    console.error(error);
  }
};

// update invoice
export const updateInvoice = async (
  id: string,
  values: z.infer<typeof invoiceSchema>
) => {
  try {
    const currentUser = await getCurrentUser();
    const validateFields = invoiceSchema.safeParse(values);
    if (!validateFields.success) {
      return { error: "invalid fields" };
    }

    if (!currentUser) {
      return { error: "no user found" };
    }

    const { client_name, total, status, invoiceDate, items, description } =
      validateFields.data;
    console.log(validateFields.data);

    // check if the any of the items is not valid or empty
    if (
      items?.some((item) => !item.name || !item.quantity || !item.price) ||
      client_name === "" ||
      total === 0 ||
      invoiceDate === "" ||
      description === ""
    ) {
      console.log("invalid item fields");
      return { error: "invalid fields, please fill empty fields" };
    }

    const invoice = await prisma.invoice.update({
      where: {
        id,
      },
      data: {
        client_name,
        total,
        status,
        invoiceDate,
        description,
        items: {
          deleteMany: {},
          create: items,
        },
      },
    });

    if (!invoice) {
      return { error: "invoice not updated" };
    }

    await getInvoices();
    revalidatePath("/dashboard/invoices");
    revalidateTag("invoices");
    return { success: "invoice updated successfully" };
  } catch (error) {
    console.error(error);
  }
};
