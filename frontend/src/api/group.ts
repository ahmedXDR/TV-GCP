import { getUserAccessToken } from "../firebase/auth";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export interface GroupResponse {
  displayName: string;
  group: string;
  groupKey: {
    id: string;
  };
  roles: {
    role: string;
  }[];
}

export const getCurrentUserGroups = async (): Promise<GroupResponse[]> => {
  const response = await fetch(`${BACKEND_URL}/groups`, {
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
