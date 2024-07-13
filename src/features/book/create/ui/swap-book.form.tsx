"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { Button } from "@/shared/ui/button";
import { PlusIcon } from "lucide-react";
import { Book, bookApi, BookComboBox, swapBookSchema } from "@/entities/book";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/shared/ui/select";
import Image from "next/image";
import { toast } from "sonner";
import { getInitials } from "@/shared/lib/utils";
import { User, userApi } from "@/entities/user";
import { Badge } from "@/shared/ui/badge";
import { swapApi } from "@/entities/swap";

interface SwapBookProps {
  requestedBook: Book;
}

export const SwapBookForm = ({ requestedBook }: SwapBookProps) => {
  const tags = [
    requestedBook.condition,
    requestedBook.genre,
    requestedBook.coverType,
    requestedBook.status,
    requestedBook.language,
  ];
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const form = useForm<z.infer<typeof swapBookSchema>>({
    resolver: zodResolver(swapBookSchema),
    defaultValues: {
      offeringBookId: "",
      requestedBookId: requestedBook.id,
    },
  });

  useEffect(() => {
    bookApi.getCurrentUserBooks().then(setBooks);
  }, []);

  const onSubmit = async (values: z.infer<typeof swapBookSchema>) => {
    await swapApi
      .createSwap(values)
      .then((data) => {
        form.reset();
        toast.success("Book created successfully");
      })
      .catch(({ response }) => {
        console.log(response);
        toast.error(response.data.message);
      });
  };

  const { owner } = requestedBook;
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className=" flex justify-around mb-4">
          <FormField
            control={form.control}
            name="offeringBookId"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="block">Your book:</FormLabel>
                <BookComboBox
                  books={books}
                  onChange={(book) => {
                    field.onChange(book?.id || "");
                    setSelectedBook(book);
                  }}
                  trigger={
                    <FormControl>
                      <Button
                        className="border-2 border-dashed border-gray-200 w-[20rem] h-[20rem]"
                        variant="outline"
                      >
                        <PlusIcon />
                      </Button>
                    </FormControl>
                  }
                />
                <FormMessage />
                <FormDescription>
                  {selectedBook && selectedBook.title}
                </FormDescription>
              </FormItem>
            )}
          />
          <div className="w-[20rem]">
            <h2 className="">Trader book:</h2>
            <img
              className="w-[20rem] h-[20rem] mb-1"
              width={0}
              height={0}
              alt="img"
              src="https://github.com/shadcn.png"
            />
            <h3 className="font-bold text-center">{requestedBook.title}</h3>
            <div className="mb-1">
              {tags.map((tag) => (
                <Badge className=" px-2 m-1">{tag}</Badge>
              ))}
            </div>
            <div className="flex items-center">
              <img
                className=" w-[2rem] h-[2rem] rounded-[50%] mr-1 "
                height={0}
                alt="img"
                src="https://github.com/shadcn.png"
              />
              {getInitials(owner?.profile.firstName, owner?.profile.lastName)}
            </div>
          </div>
        </div>

        <Button className="w-full" type="submit">
          Swap
        </Button>
      </form>
    </Form>
  );
};
