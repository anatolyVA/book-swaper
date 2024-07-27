"use client";

import React, { useState } from "react";
import { Button } from "@/shared/ui/button";
import { Bookmark, BookmarkMinus, BookmarkPlus } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { useStore } from "zustand";
import { useProfile } from "@/entities/user";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/shared/config/routes";

export function AddToFavoriteButton({ className }: { className?: string }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const isAuthorized = useStore(useProfile, (state) => state.isAuthorized);
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isAuthorized) {
      router.push(ROUTES.SIGN_IN);
      return;
    }
    setIsFavorite(!isFavorite);
  };
  return (
    <Button
      variant="secondary"
      size="icon"
      onClick={handleClick}
      className={cn("min-w-9", className)}
    >
      <Bookmark className={cn("h-5 w-5", isFavorite && "fill-primary")} />
    </Button>
  );
}
