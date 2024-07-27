import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { Book } from "@/entities/book";
import { useProfile, User } from "@/entities/user";

export type SortOption = "new" | "popular" | "closer";

interface BookListSortOptionsProps {
  value: SortOption;
  onValueChange: (option: SortOption) => void;
}
export function BookListSortOptions({
  value,
  onValueChange,
}: BookListSortOptionsProps) {
  const profile = useProfile((state) => state.profile);
  const [select, setSelect] = useState<SortOption>(value);

  const handleSort = (sort: SortOption) => {
    setSelect(sort);
    onValueChange(sort);
  };

  return (
    <div>
      <Select
        value={select}
        onValueChange={(value) => handleSort(value as SortOption)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sort by..." />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="new">New ones first</SelectItem>
            <SelectItem value="popular">By relevance</SelectItem>
            <SelectItem disabled={!profile} value="closer">
              Closer to me
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

export const sortBooksBy = (
  books: Book[],
  option: SortOption,
  user?: User,
): Book[] => {
  switch (option) {
    case "new":
      return books.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
    case "popular":
      return books.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      );
    case "closer":
      return books.sort((a, b) =>
        b.owner.profile.country.localeCompare(user?.profile.country || ""),
      );
  }
};
