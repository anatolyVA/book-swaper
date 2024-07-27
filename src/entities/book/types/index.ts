import { z } from "zod";
import { User } from "@/entities/user";

interface Language {
  code: string;
  name: string;
}

interface Book {
  id: string;
  authorId: string; // can be ignored
  ownerId: string; // can be ignored

  title: string;
  description: string;
  languageCode: string;
  genre: BookGenre;
  coverType: BookCoverType;
  condition: BookCondition;
  status: BookStatus;

  author: Author;
  owner: User;
  images: BookImage[];
  language: Language;

  createdAt: string;
  updatedAt: string;
}

enum BookCoverType {
  HARD_COVER = "HARD_COVER",
  PAPERBACK = "PAPERBACK",
  DUST_JACKET = "DUST_JACKET",
  LEATHER_BOUND = "LEATHER_BOUND",
  SPIRAL_BOUND = "SPIRAL_BOUND",
  OTHER = "OTHER",
}

enum BookCondition {
  NEW = "NEW",
  LIKE_NEW = "LIKE_NEW",
  VERY_GOOD = "VERY_GOOD",
  GOOD = "GOOD",
  ACCEPTABLE = "ACCEPTABLE",
  POOR = "POOR",
  EX_LIBRARY = "EX_LIBRARY",
  COLLECTORS_COPY = "COLLECTORS_COPY",
  BLINDING_COPY = "BLINDING_COPY",
  READING_COPY = "READING_COPY",
}

enum BookStatus {
  AVAILABLE = "AVAILABLE",
  IN_SWAP = "IN_SWAP",
  SWAPPED = "SWAPPED",
}

// May be it will be table
enum BookGenre {
  FANTASY = "FANTASY",
  SCIENCE_FICTION = "SCIENCE_FICTION",
  ROMANCE = "ROMANCE",
  MYSTERY = "MYSTERY",
  THRILLER = "THRILLER",
  HORROR = "HORROR",
  HISTORICAL = "HISTORICAL",
  ADVENTURE = "ADVENTURE",
  YOUNG_ADULT = "YOUNG_ADULT",
}

interface Author {
  id: string;
  firstName: string;
  lastName: string;
  patronym?: string;
}

interface BookImage {
  id: string;

  // can be ignored
  bookId: string;

  isPreview: boolean;
  path: string;
}

const createBookSchema = z.object({
  title: z.string().min(3).max(50),
  authorId: z
    .string()
    .refine((value) => !!value, { message: "Author is required" }),
  description: z.string().max(500),
  languageCode: z
    .string()
    .refine((value) => !!value, { message: "Language is required" }),
  genre: z.nativeEnum(BookGenre),
  coverType: z.nativeEnum(BookCoverType),
  condition: z.nativeEnum(BookCondition),
  images: z
    .instanceof(File)
    .array()
    .min(1, { message: "Please, upload at least one image" })
    .max(5, { message: "Please, upload no more than 5 images" }),
});

const updateBookSchema = z.object({
  title: z.string().min(3).max(50).optional(),
  authorId: z.string().min(1).optional(),
  description: z.string().max(500).optional(),
  languageCode: z.string().min(1).optional(),
  genre: z.nativeEnum(BookGenre).optional(),
  coverType: z.nativeEnum(BookCoverType).optional(),
  condition: z.nativeEnum(BookCondition).optional(),
});

export {
  createBookSchema,
  updateBookSchema,
  type Book,
  BookCoverType,
  BookCondition,
  BookStatus,
  BookGenre,
  type Language,
  type Author,
  type BookImage,
};
