import React from "react";
import { Button } from "@/shared/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import Link from "next/link";
import { ROUTES } from "@/shared/config/routes";
import { ProfileOverview } from "@/widgets/profile-overview";

export default function ProfilePage() {
  return (
    <main className="flex flex-col flex-1">
      <ProfileOverview />
    </main>
  );
}
