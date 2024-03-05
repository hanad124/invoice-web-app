"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { openNewInvoiceModal } from "@/store/model";
import { invoiceSchema } from "@/schemas/invoice";
import { createInvoice } from "@/actions/invoiceAction";
import { useEffect, useState, useTransition } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FiTrash, FiPlus, FiLoader } from "react-icons/fi";
import toast, { Toaster } from "react-hot-toast";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
const NewInvoiceModel = () => {
  const { setOpen, open } = openNewInvoiceModal();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof invoiceSchema>>({
    resolver: zodResolver(invoiceSchema),
    defaultValues: {
      client_name: "",
      total: 0,
      status: "pending",
      invoiceDate: "",
      description: "",
      items: [
        {
          name: "",
          quantity: 0,
          price: 0,
          total: 0,
        },
      ],
    },
  });

  const { control } = form;

  const { fields, append, remove, replace } = useFieldArray({
    name: "items",
    control,
  });

  // calculate total
  const calculateTotal = () => {
    let total = 0;

    form?.getValues("items")?.map((item) => {
      total += item.total;
    });

    form.setValue("total", total, {
      shouldValidate: true,
    });
  };

  const onSubmitFunction = async (values: z.infer<typeof invoiceSchema>) => {
    startTransition(() => {
      const newItems = values.items?.filter((item) => {
        if (item.name === "" || item.quantity === 0 || item.price === 0) {
          return false;
        }
        return true;
      });

      values.items = newItems;
      createInvoice(values).then((data) => {
        if (data?.error) {
          console.log(data?.error);
          toast.error(data?.error);
        }

        if (data?.success) {
          console.log(data?.success);
          toast.success(data?.success);

          form.reset();
          setOpen(false);
        }
      });
    });
  };

  return (
    <div>
      <Dialog
        open={open}
        onOpenChange={(open) => {
          setOpen(open);

          if (!open) {
            form.reset();
          }
        }}
      >
        <DialogContent className="sm:max-w-fit">
          <h1 className="font-semibold text-lg">Create New Invoice </h1>
          <div className="py-2">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmitFunction)}
                className="mt-2"
              >
                <div className=" max-h-[20rem] overflow-y-scroll no-scrollbar">
                  <div className="">
                    <div className="flex gap-2 mt-2  w-5/6">
                      <FormField
                        control={form.control}
                        name="client_name"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel htmlFor="name">Client Name</FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                id="name"
                                placeholder="Client Name"
                                className="shadow-none"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel htmlFor="status">Status</FormLabel>
                            <FormControl>
                              {/* make it select tag */}
                              <select
                                className="w-full border rounded-md px-4 py-[7px] shadow-none"
                                {...field}
                              >
                                <option value="pending">Pending</option>
                                <option value="paid">Paid</option>
                              </select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex gap-2 mt-2  w-5/6">
                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel htmlFor="description">
                              Description
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                id="description"
                                placeholder="Description"
                                className="shadow-none "
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="invoiceDate"
                        render={({ field }) => (
                          <FormItem className=" flex-2">
                            <FormLabel htmlFor="date">Date</FormLabel>
                            <FormControl>
                              <Input
                                type="date"
                                id="date"
                                placeholder="Date"
                                className="shadow-none w-full"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  <hr className="my-4" />
                  <ul>
                    {fields.map((field, index) => {
                      return (
                        <div key={field.id} className="flex gap-2 my-2">
                          <FormField
                            control={form.control}
                            name={`items.${index}.name`}
                            render={({ field }) => (
                              <FormItem className="w-full  min-w-[12rem]">
                                <FormControl>
                                  <Input
                                    type="text"
                                    id="name"
                                    placeholder="item name"
                                    className="shadow-none"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={control}
                            name={`items.${index}.quantity`}
                            render={({ field }) => (
                              <FormItem className="w-full">
                                <FormControl>
                                  <Input
                                    type="number"
                                    id="quantity"
                                    placeholder="quantity"
                                    className="shadow-none"
                                    {...field}
                                    onChange={(e) => {
                                      const value = Number(e.target.value);
                                      // muiltply quantity and price

                                      const price = form.getValues(
                                        `items.${index}.price`
                                      );

                                      const total = value * price;
                                      form.setValue(
                                        `items.${index}.total`,
                                        total,
                                        {
                                          shouldValidate: true,
                                        }
                                      );
                                      calculateTotal();
                                      field.onChange(value);
                                    }}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={control}
                            name={`items.${index}.price`}
                            render={({ field }) => (
                              <FormItem className="w-full ">
                                <FormControl>
                                  <Input
                                    type="number"
                                    id="price"
                                    placeholder="price"
                                    className="shadow-none"
                                    {...field}
                                    onChange={(e) => {
                                      const value = Number(e.target.value);
                                      // muiltply quantity and price
                                      const quantity = form.getValues(
                                        `items.${index}.quantity`
                                      );
                                      const total = value * quantity;
                                      form.setValue(
                                        `items.${index}.total`,
                                        total,
                                        {
                                          shouldValidate: true,
                                        }
                                      );

                                      // make the total
                                      calculateTotal();
                                      field.onChange(value);
                                    }}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={control}
                            name={`items.${index}.total`}
                            render={({ field }) => (
                              <FormItem className="w-full ">
                                <FormControl>
                                  <Input
                                    type="number"
                                    id="total"
                                    placeholder="total"
                                    className="shadow-none"
                                    {...field}
                                    onChange={(e) => {
                                      const value = Number(e.target.value);
                                      field.onChange(value);
                                    }}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <Button
                            variant="outline"
                            // color="danger"
                            onClick={() => remove(index)}
                          >
                            <FiTrash />
                          </Button>
                        </div>
                      );
                    })}
                  </ul>
                </div>
                <div className=" ">
                  <div className="w-full flex justify-between gap-6 mt-4">
                    <Button
                      variant="default"
                      color="primary"
                      type="button"
                      className="bg-primary"
                      onClick={() =>
                        append({ name: "", quantity: 0, price: 0, total: 0 })
                      }
                    >
                      <FiPlus className="w-4 h-4 mr-2" />
                      <span>Add Item</span>
                    </Button>

                    <FormField
                      control={form.control}
                      name="total"
                      render={({ field }) => (
                        <>
                          <div className="flex items-center gap-4">
                            <p>Total:</p>
                            <FormItem className="max-w-28">
                              <FormControl>
                                <Input
                                  type="number"
                                  id="total"
                                  readOnly
                                  placeholder="Total"
                                  className="shadow-none border-none  text-lg "
                                  {...field}
                                  onChange={(e) => {
                                    const value = Number(e.target.value);
                                    field.onChange(value);
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          </div>
                        </>
                      )}
                    />
                  </div>
                  <hr className="my-4" />
                  <div className="">
                    {" "}
                    <Button
                      variant="default"
                      size={"lg"}
                      color="primary"
                      className={
                        isPending
                          ? "cursor-not-allowed bg-primary/60 w-full"
                          : "cursor-pointer w-full"
                      }
                      type="submit"
                    >
                      {isPending ? (
                        <>
                          <FiLoader className="animate-spin mr-2" />
                          <span>Creating Invoice</span>
                        </>
                      ) : (
                        <>
                          <span>Create Invoice</span>
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NewInvoiceModel;
