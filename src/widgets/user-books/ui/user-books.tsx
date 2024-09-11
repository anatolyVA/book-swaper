"use client";

import React, { useEffect, useState } from "react";
import { Book, bookApi, BookTable } from "@/entities/book";
import { CreateBookModal } from "@/features/book/create";
import { Button } from "@/shared/ui/button";
import { PlusIcon } from "lucide-react";
import { Input } from "@/shared/ui/input";

export function UserBooks() {
  const [isLoading, setIsLoading] = useState(true);
  const [userBooks, setUserBooks] = useState<Book[]>([]);

  useEffect(() => {
    bookApi
      .getCurrentUserBooks()
      .then((data) => {
        setIsLoading(false);
        setUserBooks(data);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl">My books</h2>
      <div className="flex justify-between">
        <Input className="max-w-[300px]" placeholder="Search..." />
        <CreateBookModal
          triggerAsChild
          trigger={
            <Button>
              <PlusIcon className="mr-2" /> Add book
            </Button>
          }
        />
      </div>
      <BookTable books={userBooks} isLoading={isLoading} />
    </div>
  );
}
