import { getUserAccessToken } from "../firebase/auth";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export type User = {
  email: string;
  name: string;
};

export type RequestResponseOwners = {
  id: string;
  user: User;
  description: string;
  created_at: string;
};

export type RequestResponseMembers = {
  id: string;
  user: User;
  description: string;
  status: "pending" | "approved" | "rejected";
  created_at: string;
};

type RequestResponse = RequestResponseOwners | RequestResponseMembers;

type RequestRequest = {
  from: string;
  to: string;
  description: string;
};

export const getRequests = async (): Promise<RequestResponse[]> => {
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
  from,
  to,
  description,
}: RequestRequest): Promise<RequestResponse> => {
  const response = await fetch(`${BACKEND_URL}/requests`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${await getUserAccessToken()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from, to, description }),
  });

  if (!response.ok) {
    throw new Error("Failed to create request: " + response.statusText);
  }

  return await response.json();
};

export const acceptRequest = async (id: string): Promise<void> => {
  const response = await fetch(`${BACKEND_URL}/requests/${id}/accept`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${await getUserAccessToken()}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to accept request: " + response.statusText);
  }
};

export const rejectRequest = async (id: string): Promise<void> => {
  const response = await fetch(`${BACKEND_URL}/requests/${id}/reject`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${await getUserAccessToken()}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to reject request: " + response.statusText);
  }
};
