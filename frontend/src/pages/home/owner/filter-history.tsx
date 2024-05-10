export const FilterHistory = ({
  setFilter,
}: {
  setFilter: (filter: string) => void;
}) => {
  return (
    <div className="flex gap-2">
      <button onClick={() => setFilter("All")} className="btn">
        All
      </button>
      <button onClick={() => setFilter("pending")} className="btn">
        Pending
      </button>
      <button onClick={() => setFilter("approved")} className="btn">
        Approved
      </button>
      <button onClick={() => setFilter("rejected")} className="btn">
        Rejected
      </button>
    </div>
  );
};
