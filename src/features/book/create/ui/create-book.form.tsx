"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Author,
  bookApi,
  BookCondition,
  BookCoverType,
  BookGenre,
  createBookSchema,
} from "@/entities/book";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { Button } from "@/shared/ui/button";
import { api } from "@/shared/api/axios";
import { Textarea } from "@/shared/ui/textarea";

export function CreateBookForm() {
  const [authors, setAuthors] = React.useState<Author[]>([]);
  const form = useForm<z.infer<typeof createBookSchema>>({
    resolver: zodResolver(createBookSchema),
    defaultValues: {
      title: "",
      description: "",
      language: "",
      authorId: "",
      genre: BookGenre.HORROR,
      coverType: BookCoverType.HARD_COVER,
      condition: BookCondition.NEW,
    },
  });

  useEffect(() => {
    api
      .get("/authors")
      .then(({ data }) => {
        setAuthors(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const onSubmit = async (values: z.infer<typeof createBookSchema>) => {
    await bookApi
      .createBook(values)
      .then((data) => {
        form.reset();
        console.log(data);
      })
      .catch((err) => console.log(err));
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-4"
      >
        <div className="bg-gray-100 text-black h-[320px] w-[400px]">
          Img uploader
        </div>
        <div className="grid gap-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter book title"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter description of your book"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="language"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Language</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Select book language"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="authorId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Author</FormLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select author of your book" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {authors.sort().map((author) => (
                      <SelectItem key={author.id} value={author.id}>
                        {author.lastName} {author.firstName} {author.patronym}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="genre"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Genres</FormLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select genres of your book" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.values(BookGenre)
                      .sort()
                      .map((value, _index) => (
                        <SelectItem key={value} value={value}>
                          {value}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="coverType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cover type</FormLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select cover type of your book" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.values(BookCoverType)
                      .sort()
                      .map((value, _index) => (
                        <SelectItem key={value} value={value}>
                          {value}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="condition"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Condition</FormLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select condition of your book" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.values(BookCondition)
                      .sort()
                      .map((value, _index) => (
                        <SelectItem key={value} value={value}>
                          {value}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Create book</Button>
        </div>
      </form>
    </Form>
  );
}
