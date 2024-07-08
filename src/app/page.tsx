import { BookList } from "@/widgets/book-list";

export default async function Home() {
  return (
    <main className="flex px-12 py-8">
      <BookList />
    </main>
  );
}
