import React from "react";
import { ProfileNavSidebar } from "@/widgets/profile-nav";

function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container px-8 py-8 grid grid-cols-[2fr_7fr]">
      <ProfileNavSidebar />
      {children}
    </div>
  );
}

export default ProfileLayout;
