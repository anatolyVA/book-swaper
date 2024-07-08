import { BookList } from "@/widgets/book-list";
import { bookApi } from "@/entities/book";

export default async function Home() {
  const books = await bookApi.getBooks();

  return (
    <main className="flex px-12 py-8">
      <BookList data={books} />
    </main>
  );
}
