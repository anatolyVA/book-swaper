import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { convertPathToUrl } from "@/shared/lib/utils";
import { User, UserProfile } from "@/entities/user";

interface UserAvatarProps {
  data: Pick<UserProfile, "avatarPath" | "firstName" | "lastName">;
  size?: "sm" | "md" | "lg";
}
export function UserAvatar({ data, size = "md" }: UserAvatarProps) {
  const sizes: Record<string, string> = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-16 h-16",
  };

  return (
    <Avatar className={sizes[size]}>
      <AvatarImage src={convertPathToUrl(data.avatarPath || "")} alt="avatar" />
      <AvatarFallback>
        {data.lastName[0].toUpperCase() + data.firstName[0].toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
}
