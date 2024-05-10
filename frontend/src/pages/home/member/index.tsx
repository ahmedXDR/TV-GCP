import { Group } from "../../../api/group";
import { RequestElevation } from "./request-elevation";
import { RequestsHistory } from "./requests-history";

const MemberView = ({ groupInfo }: { groupInfo: Group }) => (
  <div className="flex flex-col gap-4 p-4">
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl font-bold">Welcome developer!</h1>
      <p>
        You are in the <strong>{groupInfo.group}</strong> group.
      </p>
      <p>
        You are the <strong>{groupInfo.owner ? "owner" : "not owner"}</strong>{" "}
        of the group.
      </p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <RequestElevation group={groupInfo.group} />
      <RequestsHistory />
    </div>
  </div>
);

export default MemberView;
