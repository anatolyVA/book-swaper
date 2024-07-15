"use client";

import * as React from "react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/shared/ui/command";
import { Drawer, DrawerContent, DrawerTrigger } from "@/shared/ui/drawer";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { useMediaQuery } from "usehooks-ts";
import { Book } from "@/entities/book";

export function BookComboBox({
  books,
  onChange,
  trigger,
}: {
  books: Book[];
  trigger: React.ReactNode;
  onChange?: (book: Book | null) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>{trigger}</PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start" side="right">
          <BookList
            data={books}
            setOpen={setOpen}
            setSelectedBook={(value) => {
              onChange?.(value);
            }}
          />
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent>
        <div className="mt-4 border-t">
          <BookList
            data={books}
            setOpen={setOpen}
            setSelectedBook={(value) => {
              onChange?.(value);
            }}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function BookList({
  data,
  setOpen,
  setSelectedBook,
}: {
  data: Book[];
  setOpen: (open: boolean) => void;
  setSelectedBook: (book: Book | null) => void;
}) {
  return (
    <Command
      filter={(value, search) => {
        if (value.split("$")[1].includes(search)) return 1;
        return 0;
      }}
    >
      <CommandInput
        onValueChange={(value) => console.log(value)}
        placeholder="Filter books..."
      />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {data.map((book) => (
            <CommandItem
              key={book.id}
              value={`${book.id}$${book.title}`}
              onSelect={(value) => {
                setSelectedBook(
                  data.find(
                    (priority) => priority.id === value.split("$")[0],
                  ) || null,
                );
                setOpen(false);
              }}
            >
              {book.title}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
