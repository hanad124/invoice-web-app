import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string({
      invalid_type_error: "email is required",
    })
    .email({ message: "invalid email" }),
  password: z
    .string({
      invalid_type_error: "password is required",
    })
    .min(8, { message: "must be 8 or more characters long" }),
});

export const registerSchema = z.object({
  name: z
    .string({ invalid_type_error: "name is required" })
    .min(3, { message: "must be 3 or more characters long" }),
  email: z
    .string({
      invalid_type_error: "email is required",
    })
    .email({ message: "invalid email" }),
  password: z
    .string({ invalid_type_error: "password is required" })
    .min(8, { message: "must be 8 or more characters long" }),
});
