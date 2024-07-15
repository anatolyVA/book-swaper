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
  FormMessage,
} from "@/shared/ui/form";
import { Button } from "@/shared/ui/button";
import { ArrowRightLeft, PlusIcon } from "lucide-react";
import { Book, bookApi, BookComboBox } from "@/entities/book";
import { toast } from "sonner";
import {
  getInitials,
  convertPathToUrl,
  getBookTags,
  beautifyValue,
} from "@/shared/lib/utils";
import { Badge } from "@/shared/ui/badge";
import { swapApi, swapBookSchema } from "@/entities/swap";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { User } from "@/entities/user";
import Image from "next/image";

interface SwapBookProps {
  requestedBook: Book;
}

export const CreateSwapForm = ({ requestedBook }: SwapBookProps) => {
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
        toast.success("Swap requested successfully");
      })
      .catch(({ response }) => {
        console.log(response);
        toast.error(response.data.message);
      });
  };

  const previewImage =
    selectedBook?.images.find((value) => value.isPreview)?.path ||
    selectedBook?.images[0]?.path;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col">
        <div className="grid md:grid-cols-[3fr_1fr_3fr] grid-rows-[auto_1fr_auto] w-full pb-4">
          <FormField
            control={form.control}
            name="offeringBookId"
            render={({ field }) => (
              <FormItem className="space-y-0 flex flex-col gap-2 items-center">
                <label className="text-sm uppercase font-semibold text-muted-foreground">
                  Offering book:
                </label>
                <BookComboBox
                  books={books}
                  onChange={(book) => {
                    field.onChange(book?.id || "");
                    setSelectedBook(book);
                  }}
                  trigger={
                    <FormControl>
                      <Button
                        className="relative overflow-hidden border-dashed h-[24rem] w-[16rem] flex-col hover:opacity-80 transition"
                        variant="outline"
                      >
                        {selectedBook && previewImage && (
                          <Image
                            src={convertPathToUrl(previewImage)}
                            alt={selectedBook.images[0].id}
                            className="object-contain"
                            fill
                          />
                        )}
                        <PlusIcon />
                        Select book
                      </Button>
                    </FormControl>
                  }
                />
                <FormMessage />
                {selectedBook && <BookInfo book={selectedBook} />}
              </FormItem>
            )}
          />
          <ArrowRightLeft className="self-center justify-self-center my-4 relative" />
          <div className="flex flex-col gap-2 items-center">
            <label className="text-sm uppercase font-semibold text-muted-foreground">
              Requested book:
            </label>
            <div className="relative h-[24rem] w-[16rem] mb-1">
              <Image
                className="rounded-md bg-secondary flex items-center justify-center object-contain"
                fill
                alt={requestedBook.id}
                src={convertPathToUrl(requestedBook.images[0].path)}
              />
            </div>
            <BookInfo book={requestedBook} />
          </div>
        </div>

        <Button className="w-full md:w-1/2 self-center" type="submit">
          Swap
        </Button>
      </form>
    </Form>
  );
};

function BookInfo({ book }: { book: Book }) {
  const tags = getBookTags(book);

  const { owner } = book;

  return (
    <div className="flex flex-col gap-1">
      <h3 className="font-bold text-center text-foreground text-lg">
        {book.title}
      </h3>
      <div className="mb-1">
        {tags.map((tag) => (
          <Badge key={tag} className=" px-2 m-1">
            {beautifyValue(tag)}
          </Badge>
        ))}
      </div>
      <UserInfo user={owner} />
    </div>
  );
}

function UserInfo({ user }: { user: User }) {
  return (
    <div className="flex items-center text-muted-foreground text-xs gap-2">
      <Avatar>
        <AvatarImage src={user.profile.avatarPath} />
        <AvatarFallback>
          {user.profile.firstName[0].toUpperCase() +
            user.profile.lastName[0].toUpperCase()}
        </AvatarFallback>
      </Avatar>
      {getInitials(user.profile.firstName, user.profile.lastName)}
    </div>
  );
}
