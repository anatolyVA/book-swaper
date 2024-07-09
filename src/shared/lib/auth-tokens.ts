import Cookies from "js-cookie";

export const getAccessToken = () => {
  const accessToken = Cookies.get("access_token");
  return accessToken || null;
};

export const saveTokenStorage = (token: string) => {
  Cookies.set("access_token", token, {
    domain: "localhost",
    sameSite: "strict",
  });
};

export const removeFromStorage = () => {
  Cookies.remove("access_token");
};
