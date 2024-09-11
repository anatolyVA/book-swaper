"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/shared/ui/button";
import { Bookmark, BookmarkMinus, BookmarkPlus } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { useStore } from "zustand";
import { useProfile } from "@/entities/user";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/shared/config/routes";
import { favoriteBookAPI } from "@/entities/favorites";
import { toast } from "sonner";
import debounce from "lodash/debounce";

interface FavoriteButtonProps {
  className?: string;
  bookId: string;
}

export function FavoriteButton({ className, bookId }: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const isAuthorized = useProfile((state) => state.isAuthorized);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthorized) return;

    favoriteBookAPI
      .findOne(bookId)
      .then((data) => {
        setIsFavorite(true);
      })
      .catch((err) => {
        if (err?.response?.status === 404) {
          setIsFavorite(false);
        }
      });
  }, [bookId, isAuthorized]);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isAuthorized) {
      router.push(ROUTES.SIGN_IN);
      return;
    }
    if (isFavorite) {
      favoriteBookAPI
        .unFavorite(bookId)
        .then(() => {
          setIsFavorite(false);
        })
        .catch((err) => {
          console.log(err);
          toast.error("Something went wrong");
        });
    } else {
      favoriteBookAPI
        .addToFavorites(bookId)
        .then(() => {
          setIsFavorite(true);
        })
        .catch((err) => {
          console.log(err);
          toast.error("Something went wrong");
        });
    }
  };

  const debouncedHandleClick = debounce(handleClick, 300);

  return (
    <Button
      variant="secondary"
      size="icon"
      onClick={debouncedHandleClick}
      className={cn("min-w-9", className)}
    >
      <Bookmark className={cn("h-5 w-5", isFavorite && "fill-primary")} />
    </Button>
  );
}
