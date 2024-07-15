import Cookies from "js-cookie";
import { create } from "zustand";
import { persist } from "zustand/middleware";

import { User, userApi } from "@/entities/user";

interface UseProfileState {
  isAuthorized: boolean;
  setIsAuthorized: (isAuthorized: boolean) => void;
  profile: User | null;
  fetchProfile: () => void;
}

export const useProfile = create(
  persist<UseProfileState>(
    (set, get) => ({
      isAuthorized: false,
      setIsAuthorized: (isAuthorized) =>
        set((state) => ({ ...state, isAuthorized })),
      profile: null,
      fetchProfile: async () => {
        await userApi
          .getCurrentUser()
          .then((data) => set(() => ({ profile: data, isAuthorized: true })))
          .catch(() => set(() => ({ profile: null, isAuthorized: false })));
      },
    }),
    {
      name: "profile-storage",
    },
  ),
);
