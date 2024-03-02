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
import { registerSchema } from "@/schemas/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { userRegister } from "@/actions/auth/registerAction";
import { FiLoader } from "react-icons/fi";
const RegisterPgae = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmitFunction = async (values: z.infer<typeof registerSchema>) => {
    try {
      startTransition(() => {
        userRegister(values).then((data) => {
          if (data?.error) {
            console.log(data?.error);
            toast.error(data?.error);
            form.reset();
          }

          if (data?.success) {
            console.log(data?.success);
            toast.success(data?.success);
            form.reset();
            router.push("/auth/login");
          }
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
        <h2 className=" text-large text-left text-[1.2rem] text-[#27255F] font-semibold">
          Create New Account
        </h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmitFunction)} className="mt-5">
            <p
              className=" text-[#5d596c] text-sm font-light mb-1 ml-1 tracking-wide"
              style={{ fontSize: "13px", fontWeight: 400 }}
            >
              username
            </p>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full md:w-[19rem]">
                  <FormControl>
                    <Input
                      type="text"
                      id="name"
                      placeholder="username"
                      className="shadow-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <p
              className=" text-[#5d596c] mt-5 text-sm font-light mb-1 ml-1 tracking-wide"
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
                      placeholder="enter email"
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
                  <span> Regestring</span>
                </>
              ) : (
                <span>Register</span>
              )}
            </Button>
          </form>
        </Form>
        <p className="mt-3 text-center text-base space-x-2 text-[#5d596c]">
          <span>Already have an account?</span>
          <Link className="text-[#5d596c]" href={"/auth/login"}>
            Login
          </Link>
        </p>
      </div>
      <Toaster />
    </div>
  );
};

export default RegisterPgae;
