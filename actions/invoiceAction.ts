"use server";

import { db } from "@/lib/db";
import prisma from "@/prisma";

import { invoiceSchema } from "@/schemas/invoice";
import { getCurrentUser } from "./userActions";
import { z } from "zod";

export const createInvoice = async (values: z.infer<typeof invoiceSchema>) => {
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
    return { success: "invoice created successfully" };
  } catch (error) {
    console.error(error);
  }
};
