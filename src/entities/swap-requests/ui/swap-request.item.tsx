import React from "react";
import { SwapRequest, SwapRequestStatus } from "@/entities/swap-requests";
import { Badge } from "@/shared/ui/badge";
import { ArrowRightLeft, User2 } from "lucide-react";
import Link from "next/link";
import { ROUTES } from "@/shared/config/routes";
import { Button } from "@/shared/ui/button";
import { Skeleton } from "@/shared/ui/skeleton";
import { Book } from "@/entities/book";
import { convertPathToUrl } from "@/shared/lib/utils";

interface SwapRequestProps {
  acceptButton: React.ReactNode;
  declineButton: React.ReactNode;
  deleteButton: React.ReactNode;
  request: SwapRequest;
  userId?: string;
}

export function SwapRequestItem({
  acceptButton,
  declineButton,
  deleteButton,
  request,
  userId,
}: SwapRequestProps) {
  const { status, createdAt, offeredBook, requestedBook } = request;

  const offeredPreviewUrl = getPreviewImageUrl(offeredBook);
  const requestedPreviewUrl = getPreviewImageUrl(requestedBook);

  function renderControls() {
    return (
      status === SwapRequestStatus.PENDING && (
        <div className="flex gap-2">
          {userId === requestedBook.ownerId && acceptButton}
          {userId === requestedBook.ownerId && declineButton}
          {userId === offeredBook.ownerId && deleteButton}
        </div>
      )
    );
  }

  const statusBadgeVariant: Record<
    SwapRequestStatus,
    "success" | "default" | "destructive"
  > = {
    [SwapRequestStatus.PENDING]: "default",
    [SwapRequestStatus.ACCEPTED]: "success",
    [SwapRequestStatus.REJECTED]: "destructive",
  };

  return (
    <article className="border flex p-4 gap-4 items-center rounded-md">
      <Badge className="h-fit" variant={statusBadgeVariant[status]}>
        {status}
      </Badge>
      <div className="flex gap-2 items-center w-full">
        <RequestBook book={offeredBook} userId={userId} />
        <ArrowRightLeft className="w-4 h-4" />
        <RequestBook book={requestedBook} userId={userId} />
      </div>
      <span className="text-sm text-muted-foreground">
        {new Date(createdAt).toLocaleDateString()}
      </span>
      {renderControls()}
    </article>
  );
}

function RequestBook({ book, userId }: { book: Book; userId?: string }) {
  return (
    <Button asChild variant="link">
      <Link href={`${ROUTES.BOOKS}/${book.id}`}>
        {userId === book.ownerId && <User2 className="w-4 h-4 mr-1" />}
        {book.title}
      </Link>
    </Button>
  );
}

function getPreviewImageUrl(book: Book) {
  return convertPathToUrl(
    book.images.find((img) => img.isPreview)?.path || book.images[0].path,
  );
}

export function SwapRequestItemSkeleton() {
  return <Skeleton className="h-16 w-full" />;
}
