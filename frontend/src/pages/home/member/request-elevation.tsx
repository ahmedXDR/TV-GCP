import { FormEvent, useState } from "react";
import { useMutation } from "../../../hooks/useFetch";
import { createRequest, RequestRequest } from "../../../api/requests";

export const RequestElevation = ({ group }: { group: string }) => {
  const [role, setRole] = useState("");
  const [description, setDescription] = useState("");
  const { mutate, loading } = useMutation(createRequest);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const request = { from: group, to: role, description } as RequestRequest;
    await mutate(request);
    window.location.reload();
  };

  return (
    <div className="flex flex-col gap-2 p-4 bg-gray-100 rounded-md">
      <h2 className="text-lg font-bold">Request elevation</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <select
          value={role}
          onChange={(event) => setRole(event.target.value)}
          disabled={group === "read-only"}
          className="p-2 rounded-md"
        >
          <option value="">Select a role</option>
          <option value="admins">Admins</option>
          <option value="super-admins">Super Admins</option>
        </select>
        <textarea
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Description"
          className="p-2 rounded-md"
        />
        <button
          type="submit"
          disabled={loading || role === ""}
          className="p-2 bg-blue-500 text-white rounded-md"
        >
          {loading ? "Loading..." : "Submit"}
        </button>
      </form>
    </div>
  );
};
