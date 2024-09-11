"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";
import { Book } from "../types";
import Image from "next/image";
import {
  beautifyValue,
  convertPathToUrl,
  getInitials,
} from "@/shared/lib/utils";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Skeleton } from "@/shared/ui/skeleton";
import { Button } from "@/shared/ui/button";

interface BookTableProps {
  books: Book[];
  isLoading?: boolean;
}
export function BookTable({ books, isLoading = false }: BookTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[300px]">Book info</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Placed at</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading ? (
          <TableBodyFallback />
        ) : (
          books.map((book) => (
            <TableRow key={book.id}>
              <TableCell className="font-medium flex gap-2 items-center">
                <div className="bg-secondary w-[75px] h-[75px] relative rounded-md">
                  <Image
                    src={convertPathToUrl(book.images[0].path)}
                    fill
                    sizes="75px"
                    className="object-contain"
                    alt={book.title + "image"}
                  />
                </div>
                <div className="flex flex-col">
                  <h4 className="font-bold max-w-[150px] truncate">
                    {book.title}
                  </h4>
                  <span className="text-sm text-muted-foreground">
                    {getInitials(book.author)}
                  </span>
                </div>
              </TableCell>
              <TableCell>{beautifyValue(book.status)}</TableCell>
              <TableCell>{new Date(book.createdAt).toLocaleString()}</TableCell>
              <TableCell className="text-end">
                <Button variant="outline" size="icon">
                  <DotsHorizontalIcon />
                </Button>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}

function TableBodyFallback({ rowsCount = 5 }: { rowsCount?: number }) {
  return Array.from({ length: rowsCount }).map((_, index) => (
    <TableRow key={index}>
      <TableCell className="font-medium flex gap-2 items-center">
        <Skeleton className="w-[75px] h-[75px] relative rounded-md" />
        <div className="flex flex-col gap-1">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-24" />
        </div>
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-24" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-24" />
      </TableCell>
      <TableCell className="text-end">
        <DotsHorizontalIcon />
      </TableCell>
    </TableRow>
  ));
}
