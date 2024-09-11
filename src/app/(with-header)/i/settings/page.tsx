import React from "react";
import { UserSettingForm } from "@/features/user/settings";

function UserSettings() {
  return (
    <main className="flex flex-col gap-4">
      <h2 className="text-2xl">My settings</h2>
      <UserSettingForm />
    </main>
  );
}

export default UserSettings;
