import { BookCard } from "@/entities/book/ui/book.card";
import { Book } from "@/entities/book";

interface BookListProps {
  data: Book[];
}
export function BookList({ data }: BookListProps) {
  return (
    <div className="grid lg:grid-cols-[2fr_10fr] gap-6 w-full min-h-full">
      <div className="border-r hidden lg:block">Filters</div>
      <ul className="grid md:grid-cols-3 sm:grid-cols-2 gap-4 h-fit">
        {data
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
          )
          .map((book) => (
            <BookCard key={book.id} data={book} />
          ))}
      </ul>
    </div>
  );
}
