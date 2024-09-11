import { User } from "@/entities/user";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { cn, getInitials } from "@/shared/lib/utils";
import React from "react";
import { Skeleton } from "@/shared/ui/skeleton";

interface UserInfoProps {
  user?: User;
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  className?: string;
}
export function UserInfo({
  user,
  size = "md",
  isLoading,
  className,
}: UserInfoProps) {
  const avatarSize: Record<string, string> = {
    sm: "w-10 h-10",
    md: "w-16 h-16",
    lg: "w-36 h-36",
  };

  const fallback = () => {
    return (
      <div className={cn("flex items-center text-xs gap-2")}>
        <Skeleton className={cn(avatarSize[size], "rounded-full")} />
        <div className="grid gap-1">
          <Skeleton className="h-3 w-12" />
          <Skeleton className="h-2 w-8" />
        </div>
      </div>
    );
  };

  const description = () => {
    if (!user) {
      return null;
    }

    return size !== "lg" ? (
      getInitials(user.profile)
    ) : (
      <div className="flex flex-col">
        <h2 className="text-2xl font-semibold">{`${user.profile.lastName} ${user.profile.firstName}`}</h2>
        <span>{user.email}</span>
      </div>
    );
  };

  return isLoading || !user ? (
    fallback()
  ) : (
    <div className={cn("flex items-center text-xs gap-2", className)}>
      <Avatar className={avatarSize[size]}>
        <AvatarImage src={user.profile.avatarPath} />
        <AvatarFallback>
          {user.profile.lastName[0].toUpperCase() +
            user.profile.firstName[0].toUpperCase()}
        </AvatarFallback>
      </Avatar>
      {description()}
    </div>
  );
}
