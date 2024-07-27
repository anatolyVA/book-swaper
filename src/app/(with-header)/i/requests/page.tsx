import React from "react";
import { SwapRequestList } from "@/widgets/swap-request-list";

function UserRequestsPage() {
  return (
    <main className="flex flex-col gap-4">
      <h2 className="text-2xl">My requests</h2>
      <SwapRequestList />
    </main>
  );
}

export default UserRequestsPage;
