import prisma from "@/prisma";
import { signOut, auth } from "@/auth";

export const getCurrentUser = async () => {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return { error: "no session" };
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    });

    if (!currentUser) {
      return { error: "no user found" };
    }

    return { user: currentUser };
  } catch (error: any) {
    console.error(error);
  }
};
