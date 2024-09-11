"use client";

import React, { useEffect, useState } from "react";
import {
  useProfile,
  userApi,
  UserInfo,
  type UserStatistics,
} from "@/entities/user";
import useStore from "@/shared/lib/use-store";

export function ProfileOverview() {
  const profile = useStore(useProfile, (state) => state.profile);

  return (
    <div className="flex flex-col gap-8">
      <header className="flex">
        <UserInfo user={profile} size="lg" className="" />
      </header>
      <main>
        <UserStatistics />
      </main>
    </div>
  );
}

// TODO replace
function UserStatistics() {
  const [statistics, setStatistics] = useState<UserStatistics>({
    bookCount: 0,
    successSwapsCount: 0,
  });
  useEffect(() => {
    userApi
      .getCurrentUserStatistics()
      .then((data) => {
        console.log(data);
        setStatistics(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4">
      <StatisticsCard name="Books" value={statistics.bookCount} />
      <StatisticsCard
        name="Success swaps"
        value={statistics.successSwapsCount}
      />
      <StatisticsCard name="Rating" value={0} />
    </div>
  );
}

function StatisticsCard({
  name,
  value,
}: {
  name: string;
  value: string | number;
}) {
  return (
    <article className="flex flex-col justify-center items-center border h-[200px] rounded-md">
      <span className="text-3xl font-semibold">{value}</span>
      <span className="text-muted-foreground">{name}</span>
    </article>
  );
}
