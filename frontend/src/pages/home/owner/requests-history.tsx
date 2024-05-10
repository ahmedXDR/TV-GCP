import {
  getRequests,
  acceptRequest,
  rejectRequest,
  RequestResponse,
} from "../../../api/requests";
import { useMutation, useFetchQuery } from "../../../hooks/useFetch";

const Item = ({ request }: { request: RequestResponse }) => {
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

  return (
    <div
      key={request.id}
      className="flex flex-col gap-1 p-2 border border-gray-200"
    >
      <div>
        <strong>From:</strong> {request.user.name}
      </div>
      <div>
        <strong>To:</strong> {request.to}
      </div>
      <div>
        <strong>Description:</strong> {request.description}
      </div>
      <div>
        <strong>Status:</strong> {request.status}
      </div>
      <div>
        <strong>Created At:</strong> {request.created_at}
      </div>
      <div className="flex gap-2">
        <button onClick={acceptHandler} disabled={acceptLoading}>
          Accept
        </button>
        <button onClick={rejectHandler} disabled={rejectLoading}>
          Reject
        </button>
      </div>
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

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-bold">Requests History</h2>
      <div className="flex flex-col gap-2">
        {requests
          .filter((request) => (filter ? request.status === filter : true))
          .map((request) => (
            <Item key={request.id} request={request} />
          ))}
      </div>
    </div>
  );
};
