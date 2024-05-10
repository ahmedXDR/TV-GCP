import { useFetchQuery } from "../../../hooks/useFetch";
import { getRequests } from "../../../api/requests";
import { getDateMedium, getTimeShort } from "../../../utils/date";

export const RequestsHistory = () => {
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
        {requests.map((request) => (
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
              <strong>Created At:</strong> {getDateMedium(request.created_at)}{" "}
              {getTimeShort(request.created_at)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
