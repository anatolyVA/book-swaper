import { api, apiWithAuth } from "@/shared/api/axios";
import { Book, createBookSchema } from "@/entities/book";
import { z } from "zod";

class BookApi {
  private URL = "/books";

  async getBooks() {
    const { data } = await api.get<Book[]>(this.URL);
    return data;
  }

  async getBook(id: string) {
    const { data } = await api.get<Book>(`${this.URL}/${id}`);
    return data;
  }

  async getBooksByUserId(id: string) {
    const { data } = await api.get<Book[]>(`/users/${id}/books`);
    return data;
  }

  async getCurrentUserBooks() {
    const { data } = await apiWithAuth.get<Book[]>(`/users/me/books`);
    return data;
  }

  async deleteBook(id: string) {
    const { data } = await apiWithAuth.delete<Book>(`${this.URL}/${id}`);
    return data;
  }

  async updateBook(id: string, values: z.infer<typeof createBookSchema>) {
    const { data } = await apiWithAuth.put<Book>(`${this.URL}/${id}`, values);
    return data;
  }

  async createBook(values: FormData) {
    const { data } = await apiWithAuth.post<Book>(this.URL, values, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  }
}

export const bookApi = new BookApi();
