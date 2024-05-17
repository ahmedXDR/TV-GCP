import { FormEvent, useState } from "react";
import {
  TextField,
  FormLabel,
  FormControl,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import { useMutation } from "../../../hooks/useFetch";
import { createRequest, GroupRequestPayload } from "../../../api/requests";
import { GROUPS_IDS } from "../../../utils/constants";

export const RequestElevation = () => {
  const [group, setgroup] = useState<string>("");
  const [description, setDescription] = useState("");
  const { mutate, loading } = useMutation(createRequest);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const request = { group, description } as GroupRequestPayload;
    const response = await mutate(request);
    if (response instanceof Error || !response) {
      console.error(response.message);
      alert("Failed to create request");
      return;
    }
    window.location.reload();
  };

  return (
    <div className="flex flex-col gap-5 p-10 bg-gray-100 rounded-md">
      <h2 className="text-2xl font-bold">Request elevation</h2>
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel>Group</FormLabel>
          <Select
            value={group}
            onChange={(event) => setgroup(event.target.value as string)}
          >
            <MenuItem value="" disabled>
              Select a group
            </MenuItem>
            {Object.entries(GROUPS_IDS).map(([key, value]) => (
              <MenuItem key={key} value={value}>
                {key}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          multiline
          rows={4}
        />
        <Button
          type="submit"
          variant="contained"
          disabled={loading}
          sx={{
            paddingY: "15px",
          }}
        >
          Request
        </Button>
      </form>
    </div>
  );
};
