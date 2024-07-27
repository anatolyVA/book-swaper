"use client";

import React, { useEffect, useState } from "react";
import {
  SwapRequest,
  swapRequestAPI,
  SwapRequestItem,
  SwapRequestItemSkeleton,
} from "@/entities/swap-requests";
import { useProfile } from "@/entities/user";
import { AcceptSwapRequestButton } from "@/features/swap-request/accept";
import { Button } from "@/shared/ui/button";
import { DeclineSwapRequestButton } from "@/features/swap-request/decline";
import { DeleteSwapRequestButton } from "@/features/swap-request/delete";

export function SwapRequestList() {
  const profile = useProfile((state) => state.profile);
  const [sent, setSent] = useState<SwapRequest[]>([]);
  const [received, setReceived] = useState<SwapRequest[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    swapRequestAPI
      .findReceived()
      .then((data) => {
        setReceived(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    swapRequestAPI
      .findSent()
      .then((data) => {
        setSent(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="grid gap-4">
      <SubList title="Sent" requests={sent} userId={profile?.id} />
      <SubList title="Received" requests={received} userId={profile?.id} />
    </div>
  );
}

interface SubListProps {
  title: string;
  requests: SwapRequest[];
  userId?: string;
}
function SubList({ title, requests, userId }: SubListProps) {
  return (
    <div className="grid gap-2">
      <h3 className="text-xl">{title}</h3>
      {requests.length > 0 ? (
        requests.map((request) => (
          <SwapRequestItem
            userId={userId}
            key={request.id}
            request={request}
            acceptButton={<AcceptSwapRequestButton requestId={request.id} />}
            declineButton={<DeclineSwapRequestButton requestId={request.id} />}
            deleteButton={<DeleteSwapRequestButton requestId={request.id} />}
          />
        ))
      ) : (
        <span className="text-sm text-muted-foreground">Empty</span>
      )}
    </div>
  );
}
