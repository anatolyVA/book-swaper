import Cookies from "js-cookie";
import { create } from "zustand";
import { persist } from "zustand/middleware";

import { User, userApi } from "@/entities/user";

interface UseProfileState {
  isAuthorized: boolean;
  isLoading: boolean;
  setIsAuthorized: (isAuthorized: boolean) => void;
  profile?: User;
  fetchProfile: () => void;
}

export const useProfile = create(
  persist<UseProfileState>(
    (set, get) => ({
      isAuthorized: false,
      isLoading: true,
      setIsAuthorized: (isAuthorized) =>
        set((state) => ({ ...state, isAuthorized })),
      profile: undefined,
      fetchProfile: async () => {
        await userApi
          .getCurrentUser()
          .then((data) => set(() => ({ profile: data, isAuthorized: true })))
          .catch(() =>
            set(() => ({
              profile: undefined,
              isAuthorized: false,
              isLoading: false,
            })),
          );
      },
    }),
    {
      name: "profile-storage",
    },
  ),
);
