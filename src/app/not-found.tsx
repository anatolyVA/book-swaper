import Link from "next/link";
import { Header } from "@/widgets/header";
import { Button } from "@/shared/ui/button";

export default function NotFound() {
  return (
    <main className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-1 flex flex-col justify-center items-center">
        <header className="flex flex-col gap-2 items-center">
          <h1 className="text-7xl font-bold">404</h1>
        </header>
        <p>Could not find requested resource</p>
        <Button variant="link" asChild>
          <Link href="/">Return Home</Link>
        </Button>
      </div>
    </main>
  );
}
