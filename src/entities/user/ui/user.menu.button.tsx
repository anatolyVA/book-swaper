import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { User } from "@/entities/user";
import { getInitials } from "@/shared/lib/utils";
import { ArrowRightLeft, LibraryIcon, PlusIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import { ROUTES } from "@/shared/config/routes";
import { Button } from "@/shared/ui/button";
import { UserAvatar } from "./user.avatar";

interface UserMenuButtonProps {
  data: User;
  logoutButton: React.ReactNode;
  createBookSlot: React.ReactNode;
}
export function UserMenuButton({
  data,
  logoutButton,
  createBookSlot,
}: UserMenuButtonProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex gap-2 items-center cursor-pointer hover:opacity-80 transition focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
          <UserAvatar data={data.profile} />
          <div className="hidden md:flex flex-col">
            <span className="text-sm text-left">
              {getInitials(data.profile)}
            </span>
            <span className="text-xs text-muted-foreground">{data.email}</span>
          </div>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={ROUTES.PROFILE}>
            <UserIcon className="w-4 h-4 mr-1" /> Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={ROUTES.USER_BOOKS}>
            <LibraryIcon className="w-4 h-4 mr-1" /> Books
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={ROUTES.USER_SWAPS}>
            <ArrowRightLeft className="w-4 h-4 mr-1" /> Swaps
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {createBookSlot}
        {logoutButton}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
