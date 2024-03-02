"use server";

import { loginSchema } from "@/schemas/user";
import { signIn, signOut } from "@/auth";
import { getUserByEmail } from "@/data/users/users";
import { AuthError } from "next-auth";

import { z } from "zod";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const userLogin = async (
  values: z.infer<typeof loginSchema>,
  callbackUrl?: string | null
) => {
  try {
    const validatedFields = loginSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: "Invalid fields!" };
    }

    const { email, password } = validatedFields.data;

    const existingUser = await getUserByEmail(email);

    if (!existingUser || !existingUser.email || !existingUser.password) {
      return { error: "Email does not exist!" };
    }

    await signIn("credentials", {
      email,
      password,
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });

    return { success: "Logged in!" };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          return { error: "Something went wrong!" };
      }
    }

    throw error;
  }
};

export const Logout = async () => {
  await signOut();
  return { success: "Logged out!" };
};
