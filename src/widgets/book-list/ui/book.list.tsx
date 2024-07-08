import { BookCard } from "@/entities/book/ui/book.card";
import { Book } from "@/entities/book";

interface BookListProps {
  data: Book[];
}
export function BookList({ data }: BookListProps) {
  return (
    <div className="grid grid-cols-[2fr_8fr] gap-6">
      <div className="border-r">Filters</div>
      <ul className="grid grid-cols-4 gap-4">
        {data.map((book) => (
          <BookCard key={book.id} data={book} />
        ))}
      </ul>
    </div>
  );
}
