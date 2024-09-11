import React from "react";
import { UserBooks } from "@/widgets/user-books";
import { FavoriteBooks } from "@/widgets/favorite-books";

function UserBooksPage() {
  return (
    <main className="flex flex-col gap-8 flex-1">
      <UserBooks />
      <FavoriteBooks />
    </main>
  );
}

export default UserBooksPage;
