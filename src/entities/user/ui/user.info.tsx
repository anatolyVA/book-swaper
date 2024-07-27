import { User } from "@/entities/user";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { cn, getInitials } from "@/shared/lib/utils";
import React from "react";

interface UserInfoProps {
  user: User;
  isDetailed?: boolean;
}
export function UserInfo({ user, isDetailed = false }: UserInfoProps) {
  return (
    <div
      className={cn(
        "flex items-center text-muted-foreground text-xs gap-2",
        isDetailed && "text-base",
      )}
    >
      <Avatar>
        <AvatarImage src={user.profile.avatarPath} />
        <AvatarFallback>
          {user.profile.lastName[0].toUpperCase() +
            user.profile.firstName[0].toUpperCase()}
        </AvatarFallback>
      </Avatar>
      {getInitials(user.profile.firstName, user.profile.lastName)}
    </div>
  );
}
