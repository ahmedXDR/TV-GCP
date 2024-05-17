import { Button } from "@mui/material";

export type FilterType = "pending" | "accepted" | "rejected" | "all";

export const FilterHistory = ({
  filter,
  setFilter,
}: {
  filter: FilterType;
  setFilter: (filter: FilterType) => void;
}) => (
  <div className="flex gap-2">
    <Button
      variant={filter === "all" ? "contained" : "outlined"}
      color={filter === "all" ? "primary" : "info"}
      onClick={() => setFilter("all")}
    >
      All
    </Button>
    <Button
      variant={filter === "pending" ? "contained" : "outlined"}
      color={filter === "pending" ? "primary" : "info"}
      onClick={() => setFilter("pending")}
    >
      Pending
    </Button>
    <Button
      variant={filter === "accepted" ? "contained" : "outlined"}
      color={filter === "accepted" ? "primary" : "info"}
      onClick={() => setFilter("accepted")}
    >
      Accepted
    </Button>
    <Button
      variant={filter === "rejected" ? "contained" : "outlined"}
      color={filter === "rejected" ? "primary" : "info"}
      onClick={() => setFilter("rejected")}
    >
      Rejected
    </Button>
  </div>
);
