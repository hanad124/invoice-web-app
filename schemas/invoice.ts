import { optional, z } from "zod";

export const invoiceSchema = z.object({
  client_name: z.string({
    required_error: "Client name is required",
  }),
  total: z.number({
    required_error: "Total is required",
  }),
  status: z.enum(["pending", "paid"], {
    required_error: "Status is required",
  }),
  invoiceDate: z.string({
    required_error: "Date is required",
  }),
  items: z
    .array(
      z.object({
        name: z.string({
          required_error: "Name is required",
        }),
        quantity: z.number({
          required_error: "Quantity is required",
        }),
        price: z.number({
          required_error: "Price is required",
        }),
        total: z.number({
          required_error: "Total is required",
        }),
      })
    )
    .optional(),

  description: optional(z.string()),
});
