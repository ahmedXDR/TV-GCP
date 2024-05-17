import { getUserAccessToken } from "../firebase/auth";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export type ElevatePermissionResponse = {
  id: string;
  email: string;
  group: string;
  description: string;
  status: "pending" | "accepted" | "rejected";
  created_at: string;
};

export type GroupRequestPayload = {
  group: string;
  description: string;
};

export const getRequests = async (): Promise<ElevatePermissionResponse[]> => {
  const response = await fetch(`${BACKEND_URL}/requests`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${await getUserAccessToken()}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to get requests: " + response.statusText);
  }

  return await response.json();
};

export const createRequest = async ({
  group,
  description,
}: GroupRequestPayload): Promise<ElevatePermissionResponse> => {
  const response = await fetch(`${BACKEND_URL}/requests`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${await getUserAccessToken()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ group, description }),
  });

  if (!response.ok) {
    throw new Error("Failed to create request: " + response.statusText);
  }

  return await response.json();
};

export const acceptRequest = async (id: string): Promise<boolean> => {
  const response = await fetch(`${BACKEND_URL}/accept?id=${id}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${await getUserAccessToken()}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to accept request: " + response.statusText);
  }

  return true;
};

export const rejectRequest = async (id: string): Promise<boolean> => {
  const response = await fetch(`${BACKEND_URL}/reject?id=${id}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${await getUserAccessToken()}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to reject request: " + response.statusText);
  }

  return true;
};
