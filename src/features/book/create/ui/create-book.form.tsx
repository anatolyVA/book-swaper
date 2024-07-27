"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Author,
  bookApi,
  BookCondition,
  BookCoverType,
  BookGenre,
  createBookSchema,
  Language,
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
import { toast } from "sonner";
import { ImageUploader } from "./image-uploader";
import { PlusIcon } from "lucide-react";
import { beautifyValue } from "@/shared/lib/utils";

export function CreateBookForm() {
  const [authors, setAuthors] = React.useState<Author[]>([]);
  const [languages, setLanguages] = React.useState<Language[]>([]);
  const form = useForm<z.infer<typeof createBookSchema>>({
    resolver: zodResolver(createBookSchema),
    defaultValues: {
      title: "",
      description: "",
      languageCode: "",
      authorId: "",
      images: [],
    },
  });

  const imagesWatch = form.watch("images");

  useEffect(() => {
    api
      .get("/authors")
      .then(({ data }) => {
        setAuthors(data);
      })
      .catch((err) => {
        const message = err?.response?.data?.message;
        console.log(message);
        toast.error("Unable to load authors");
      });
  }, []);

  useEffect(() => {
    api
      .get<Language[]>("/languages")
      .then(({ data }) => {
        setLanguages(data);
      })
      .catch((err) => {
        const message = err?.response?.data?.message;
        console.log(message);
        toast.error("Unable to load languages");
      });
  }, [imagesWatch]);

  const onSubmit = async (values: z.infer<typeof createBookSchema>) => {
    const { images, ...rest } = values;

    bookApi.createBook(rest).then((data) => {
      bookApi
        .uploadImages(data.id, images)
        .then((data) => {
          console.log(data);
          toast.success("Book created");
        })
        .catch((err) => {
          console.log(err.response);
          toast.error("Unable to upload images");
        })
        .catch(() => {
          toast.error("Unable to create book");
        });
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-2"
      >
        <div className="flex gap-6 flex-col md:flex-row">
          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1 justify-center md:justify-start">
                <FormControl>
                  <UploadImages value={field.value} onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 md:grid-cols-1 gap-2 w-full">
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
              name="languageCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Language</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select language of your book" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {languages.sort().map((lang) => (
                        <SelectItem key={lang.code} value={lang.code}>
                          <span className="text-muted-foreground mr-2">
                            {lang.code.toUpperCase()}
                          </span>
                          <span>{lang.name}</span>
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
                            {beautifyValue(value)}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
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
                    {Object.values(BookCoverType).map((value, _index) => (
                      <SelectItem key={value} value={value}>
                        {beautifyValue(value)}
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
                          {beautifyValue(value)}
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
            name="description"
            render={({ field }) => (
              <FormItem className="col-span-2">
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

          <Button className="col-span-2 mt-2" type="submit">
            Add book
          </Button>
        </div>
      </form>
    </Form>
  );
}

interface UploadImagesProps {
  onChange: (file: File[]) => void;
  value: File[];
}

function UploadImages({ value, onChange }: UploadImagesProps) {
  const [images, setImages] = useState<File[]>(value);
  const [additional, setAdditional] = useState<number[]>([]);

  useEffect(() => {
    setImages(value);
  }, [value]);

  const handleChange = (file: File | null, index: number) => {
    if (!file) return;

    const newArray = [...images];
    newArray[index] = file;
    setImages(newArray);
    onChange(newArray);
  };

  const handleAddUploader = (e: React.MouseEvent) => {
    e.preventDefault();
    if (images.length <= additional.length) {
      toast.error("Please, upload the previous images first");
      return;
    }
    if (additional.length >= 4) return;
    setAdditional([...additional, additional.length + 1]);
  };
  return (
    <div className="grid grid-cols-2 gap-2 md:h-[calc(20rem+0.5rem)] w-[320px] sm:w-[440px]">
      <ImageUploader
        value={images[0]}
        onChange={(file) => handleChange(file, 0)}
        className="h-56 sm:h-80 md:h-full"
      />
      <div className="grid gap-2 grid-cols-2 grid-rows-2">
        {additional.map((i) => (
          <ImageUploader
            key={i}
            value={images[i]}
            onChange={(file) => handleChange(file, i)}
            className="h-[6.75rem] sm:h-40"
          />
        ))}
        {additional.length < 4 && (
          <Button
            className="border-dashed flex flex-col h-[6.75rem] sm:h-40"
            variant="secondary"
            type="button"
            onClick={handleAddUploader}
          >
            <PlusIcon />
            Add
          </Button>
        )}
      </div>
    </div>
  );
}
