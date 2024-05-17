import {
  getRequests,
  acceptRequest,
  rejectRequest,
  ElevatePermissionResponse,
} from "../../../api/requests";
import { useMutation, useFetchQuery } from "../../../hooks/useFetch";
import { Button } from "@mui/material";
import { GROUPS_IDS } from "../../../utils/constants";
import { getTimeShort, getDateMedium } from "../../../utils/date";
import { StatusChip } from "../member/requests-history";

const Item = ({ request }: { request: ElevatePermissionResponse }) => {
  const { mutate: onAccept, loading: acceptLoading } =
    useMutation(acceptRequest);
  const { mutate: onReject, loading: rejectLoading } =
    useMutation(rejectRequest);

  const acceptHandler = async () => {
    const response = await onAccept(request.id);
    if (response instanceof Error) {
      alert(response.message);
    }
    window.location.reload();
  };

  const rejectHandler = async () => {
    const response = await onReject(request.id);
    if (response instanceof Error) {
      alert(response.message);
    }
    window.location.reload();
  };

  const getGroupName = (groupId: string) => {
    return Object.entries(GROUPS_IDS).find(
      ([, value]) => value === groupId
    )?.[0];
  };

  return (
    <div className="flex flex-col gap-3 border rounded shadow p-5 bg-white">
      <div className="flex flex-col">
        <div className="flex flex-wrap w-full justify-between gap-2">
          <h2 className="text-xl font-bold">{getGroupName(request.group)}</h2>
          <StatusChip status={request.status} />
        </div>
        <span className="text-sm text-gray-500">
          {getDateMedium(request.created_at)} {getTimeShort(request.created_at)}
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <span className="font-bold">Email:</span>
        <span>{request.email}</span>
      </div>
      <span>{request.description}</span>
      {request.status === "pending" && (
        <div className="flex gap-2">
          <Button
            variant="contained"
            onClick={acceptHandler}
            disabled={acceptLoading}
          >
            Accept
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={rejectHandler}
            disabled={rejectLoading}
          >
            Reject
          </Button>
        </div>
      )}
    </div>
  );
};

export const RequestsHistory = ({ filter }: { filter: string }) => {
  const { data: requests, loading } = useFetchQuery(getRequests);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (requests instanceof Error) {
    return <div>Error: {requests.message}</div>;
  }

  if (requests.length === 0) {
    return <div>No requests found</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {requests
        .filter((request) =>
          filter !== "all" ? request.status === filter : true
        )
        .map((request) => (
          <Item key={request.id} request={request} />
        ))}
    </div>
  );
};
