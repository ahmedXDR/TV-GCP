import { getUserAccessToken } from "../firebase/auth";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export type Group = {
  group: "read-only" | "admins" | "super-admins";
  owner: boolean;
};

export const getCurrentUserGroup = async (): Promise<Group> => {
  const response = await fetch(`${BACKEND_URL}/group`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${await getUserAccessToken()}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to get user group: " + response.statusText);
  }

  return await response.json();
};
