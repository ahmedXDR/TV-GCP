import { useState } from "react";
import { Group } from "../../../api/group";
import { RequestsHistory } from "./requests-history";
import { FilterHistory } from "./filter-history";

const OwnerView = ({ groupInfo }: { groupInfo: Group }) => {
  const [filter, setFilter] = useState("All");

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">Welcome owner!</h1>
        <p>
          You are in the <strong>{groupInfo.group}</strong> group.
        </p>
        <p>
          You are the <strong>{groupInfo.owner ? "owner" : "not owner"}</strong>{" "}
          of the group.
        </p>
      </div>
      <FilterHistory setFilter={setFilter} />
      <RequestsHistory filter={filter} />
    </div>
  );
};

export default OwnerView;
