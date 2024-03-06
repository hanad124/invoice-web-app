"use client";
import React, { useTransition } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { loginSchema, registerSchema } from "@/schemas/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { userLogin } from "@/actions/auth/loginAction";
import { useRouter, useSearchParams } from "next/navigation";
import { FiLoader } from "react-icons/fi";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import Image from "next/image";
import logo from "@/public/assets/logo.svg";

const LoginPgae = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmitFunction = async (values: z.infer<typeof loginSchema>) => {
    try {
      startTransition(() => {
        userLogin(values, callbackUrl)
          .then((data) => {
            if (data?.error) {
              console.log(data?.error);
              toast.error(data?.error);
              form.reset();
            }
            if (data?.success) {
              console.log(data?.success);
              toast.success(data?.success);
              form.reset();
            }
          })
          .catch((error) => {
            console.log(error);
          });
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <div
        className=" bg-white w-full mx-4 md:max-0  px-7 py-10 md:w-[23rem] rounded-lg"
        style={{
          boxShadow: `rgba(0, 0, 0, 0.16) 0px 10px 36px 0px,
rgba(0, 0, 0, 0.06) 0px 0px 0px 1px`,
        }}
      >
        <div className="flex items-center justify-center gap-5">
          <Image
            src={logo}
            width={500}
            height={500}
            alt="logo"
            className="w-8"
          />
          <h1 className="text-2xl font-semibold text-[#27255F] uppercase tracking-widest">
            InvoiceFy
          </h1>
        </div>

        <h2 className=" text-base	 text-left mt-[2rem]  text-[1.2rem] font-normal text-[#5d596c]">
          Welcome to Invoicefy 👋
        </h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmitFunction)} className="mt-5">
            <p
              className=" text-[#5d596c] text-sm font-light mb-1 ml-1 tracking-wide"
              style={{ fontSize: "13px", fontWeight: 400 }}
            >
              email
            </p>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full md:w-[19rem]">
                  <FormControl>
                    <Input
                      type="text"
                      id="email"
                      placeholder="enter email..."
                      className="shadow-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <p
              className=" text-[#5d596c] text-sm font-light mt-5 tracking-wide  mb-1 ml-1"
              style={{ fontSize: "13px", fontWeight: 400 }}
            >
              Password
            </p>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="w-full md:w-[19rem]">
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="* * * * * * * "
                      className="shadow-none "
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <br />
            <Button
              type="submit"
              size={"lg"}
              disabled={isPending}
              className={`dark:text-white w-full mb-4
                
                 ${
                   isPending ? "bg-primary/60 cursor-not-allowed" : "bg-primary"
                 }`}
            >
              {isPending ? (
                <>
                  <FiLoader className="animate-spin mr-2" />
                  <span>Logging in</span>
                </>
              ) : (
                <span>Login</span>
              )}
            </Button>
          </form>
        </Form>
        <p className="mt-3 text-center text-sm space-x-1 text-[#5d596c]">
          <span>I don't have an account?</span>
          <Link className="text-[#5d596c]" href={"/auth/register"}>
            Register
          </Link>
        </p>
      </div>
      <Toaster />
    </div>
  );
};

export default LoginPgae;
