import { BookCard } from "@/entities/book/ui/book.card";

export function BookList({}) {
  return (
    <div className="grid grid-cols-[2fr_8fr] gap-6">
      <div className="border-r">Filters</div>
      <ul className="grid grid-cols-4 gap-4">
        <BookCard />
        <BookCard />
        <BookCard />
        <BookCard />
        <BookCard />
        <BookCard />
        <BookCard />
        <BookCard />
      </ul>
    </div>
  );
}
