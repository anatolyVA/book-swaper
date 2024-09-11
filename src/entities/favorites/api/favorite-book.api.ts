import { apiWithAuth } from "@/shared/api/axios";
import { Book } from "@/entities/book";
import { FavoriteBook } from "@/entities/favorites/types";

class FavoriteBookApi {
  URL = "/favorites/books";

  async fetchAll() {
    const { data } = await apiWithAuth.get<Book[]>(this.URL);
    return data;
  }

  async findOne(id: string) {
    const { data } = await apiWithAuth.get<FavoriteBook>(`${this.URL}/${id}`);
    return data;
  }

  async addToFavorites(bookId: string) {
    const { data } = await apiWithAuth.post<FavoriteBook>(
      `${this.URL}/${bookId}`,
    );
    return data;
  }

  async unFavorite(bookId: string) {
    const { data } = await apiWithAuth.delete<FavoriteBook>(
      `${this.URL}/${bookId}`,
    );
    return data;
  }
}

export const favoriteBookAPI = new FavoriteBookApi();
