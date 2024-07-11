import React from "react";
import { useForm } from "react-hook-form";
import {
  BookCondition,
  BookCoverType,
  BookGenre,
  createBookSchema,
} from "@/entities/book";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export function CreateBookForm() {
  const form = useForm<z.infer<typeof createBookSchema>>({
    resolver: zodResolver(createBookSchema),
    defaultValues: {
      title: "",
      description: "",
      language: "",
      genre: BookGenre.HORROR,
      coverType: BookCoverType.HARD_COVER,
      authorId: "",
      condition: BookCondition.NEW,
    },
  });

  return <form></form>;
}
