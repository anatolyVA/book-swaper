import React from "react";
import { ProfileNavSidebar } from "@/widgets/profile-nav";
import { HEADER_HEIGHT } from "@/shared/config/const";

function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container px-8 py-8 grid lg:grid-cols-[2fr_7fr] gap-6">
      <ProfileNavSidebar />
      {children}
    </div>
  );
}

export default ProfileLayout;
