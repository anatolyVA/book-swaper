"use client";

import { BookCard } from "@/entities/book/ui/book.card";
import { Author, Book, Language } from "@/entities/book";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { AddToFavoriteButton } from "@/features/book/add-to-favorite";
import { BookListFilters } from "./book-list.filters";
import { BOOKS_PER_PAGE } from "@/shared/config/const";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/shared/ui/pagination";
import {
  CreateSwapRequestButton,
  CreateSwapRequestModal,
} from "@/features/swap-request/create";
import { useProfile } from "@/entities/user";
import { ToggleGroup, ToggleGroupItem } from "@/shared/ui/toggle-group";
import { LayoutGrid, LayoutList } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import {
  BookListSortOptions,
  sortBooksBy,
  SortOption,
} from "./book-list.sort-options";

interface BookListProps {
  data: Book[];
  totalCount: number;
  authors: Author[];
  languages: Language[];
}
export function BookList({
  data,
  authors,
  languages,
  totalCount,
}: BookListProps) {
  const profile = useProfile((state) => state.profile);
  const [books, setBooks] = React.useState<Book[]>(data);
  const [listLayout, setListLayout] = useState<"grid" | "list">("grid");
  const [sortOption, setSortOption] = useState<SortOption>("new");

  const gridLayoutCls = "lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2";

  return (
    <div className="grid xl:grid-cols-[3fr_9fr] gap-6 w-full min-h-full">
      <BookListFilters
        authors={authors}
        languages={languages}
        onChange={({ books }) => setBooks(books)}
      />
      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <BookListSortOptions
            value={sortOption}
            onValueChange={(opt) => {
              console.log(opt);
              setSortOption(opt);
              console.log(sortBooksBy(books, sortOption));
            }}
          />
          <ToggleGroup
            value={listLayout}
            onValueChange={(value) => setListLayout(value as "grid" | "list")}
            size="sm"
            type="single"
            className="justify-self-end"
          >
            <ToggleGroupItem size="sm" value="list">
              <LayoutList className="w-4 h-4" />
            </ToggleGroupItem>
            <ToggleGroupItem size="sm" value="grid">
              <LayoutGrid className="w-4 h-4" />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
        <ul
          className={cn(
            "grid gap-4 h-fit",
            listLayout === "grid" && gridLayoutCls,
          )}
        >
          {sortBooksBy(books, sortOption, profile).map((book) => (
            <BookCard
              key={book.id}
              data={book}
              variant={listLayout}
              isUserBook={profile && profile.id === book.owner.id}
              swapTrigger={
                <CreateSwapRequestModal
                  trigger={<CreateSwapRequestButton className="w-full" />}
                  triggerAsChild
                  requestedBook={book}
                />
              }
              addToFavButton={<AddToFavoriteButton />}
            />
          ))}
          {books.length === 0 && (
            <div className="">
              <p>No books found</p>
            </div>
          )}
        </ul>
        {/*<BookListPagination totalCount={totalCount} />*/}
      </div>
    </div>
  );
}

function BookListPagination({ totalCount }: { totalCount: number }) {
  const pages = Array.from({ length: Math.ceil(totalCount / BOOKS_PER_PAGE) }); //Math.ceil(totalCount / BOOKS_PER_PAGE);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        {pages.slice(0, 5).map((value, index) => {
          return (
            <PaginationLink
              key={index}
              href={`?page=${index + 1}`}
              aria-current={index + 1 === 1 ? "page" : undefined}
            >
              {index + 1}
            </PaginationLink>
          );
        })}
        {pages.length > 4 && (
          <>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href={`?page=${pages.length}`}>
                {pages.length}
              </PaginationLink>
            </PaginationItem>
          </>
        )}
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
