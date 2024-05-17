import { useFetchQuery } from "../../../hooks/useFetch";
import { getRequests } from "../../../api/requests";
import { getDateMedium, getTimeShort } from "../../../utils/date";
import { Chip } from "@mui/material";
import { GROUPS_IDS } from "../../../utils/constants";

export const StatusChip = ({ status }: { status: string }) => {
  const statusMap: {
    [key: string]: { label: string; color: "success" | "error" | "info" };
  } = {
    accepted: { label: "Accepted", color: "success" },
    rejected: { label: "Rejected", color: "error" },
    default: { label: "Pending", color: "info" },
  };

  const { label, color } =
    statusMap[status as keyof typeof statusMap] || statusMap.default;

  return (
    <Chip
      label={label}
      color={color}
      sx={{
        width: "fit-content",
      }}
    />
  );
};

export const RequestsHistory = () => {
  const { data: requests, loading } = useFetchQuery(getRequests);

  const getGroupName = (groupId: string) => {
    return Object.entries(GROUPS_IDS).find(
      ([, value]) => value === groupId
    )?.[0];
  };
  if (loading) {
    return <div>Loading...</div>;
  }

  if (requests instanceof Error || !requests) {
    return <div>Error: {requests.message}</div>;
  }

  if (requests.length === 0) {
    return <div>No requests found</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {requests.map((request) => (
        <div
          key={request.id}
          className="flex flex-col gap-2 border rounded shadow p-5 bg-white"
        >
          <div className="flex flex-wrap w-full justify-between gap-2">
            <h2 className="text-xl font-bold">{getGroupName(request.group)}</h2>
            <StatusChip status={request.status} />
          </div>
          <span>
            {getDateMedium(request.created_at)}{" "}
            {getTimeShort(request.created_at)}
          </span>
          <div className="flex flex-col gap-2 py-5">
            <span className="font-bold">Description:</span>
            <span>{request.description}</span>
          </div>
        </div>
      ))}
    </div>
  );
};
