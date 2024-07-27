import { api, apiWithAuth } from "@/shared/api/axios";
import { Book, createBookSchema, updateBookSchema } from "@/entities/book";
import { z } from "zod";
import { BOOKS_PER_PAGE } from "@/shared/config/const";

type GetBooksResponse = {
  books: Book[];
  total: number;
};
class BookApi {
  private URL = "/books";

  limit = BOOKS_PER_PAGE;

  async getBooks(offset = 0, limit = this.limit) {
    const { data } = await api.get<GetBooksResponse>(
      `${this.URL}?limit=${limit}&offset=${offset}`,
    );
    return data;
  }

  async filterBooks(query: string, offset = 0, limit = this.limit) {
    const { data } = await api.get<GetBooksResponse>(
      `${this.URL}?limit=${limit}&offset=${offset}&${query}`,
    );
    return data;
  }

  async getSimilarBooks(id: string) {
    const { data } = await api.get<Book[]>(`/books/${id}/similar`);
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

  async updateBook(id: string, values: z.infer<typeof updateBookSchema>) {
    const { data } = await apiWithAuth.put<Book>(`${this.URL}/${id}`, values);
    return data;
  }

  async createBook(values: Omit<z.infer<typeof createBookSchema>, "images">) {
    const { data } = await apiWithAuth.post<Book>(this.URL, values);
    return data;
  }

  async uploadImages(id: string, images: File[]) {
    const formData = new FormData();
    images.forEach((image) => {
      formData.append("images", image);
    });
    const { data } = await apiWithAuth.post<any>(
      `/books/${id}/upload-images`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return data;
  }
}

export const bookApi = new BookApi();

// , {
//   headers: {
//     "Content-Type": "multipart/form-data",
//   },
// }
