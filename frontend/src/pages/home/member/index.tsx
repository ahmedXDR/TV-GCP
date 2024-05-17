import { Container, Chip } from "@mui/material";
import { GroupResponse } from "../../../api/group";
import { RequestElevation } from "./request-elevation";
import { RequestsHistory } from "./requests-history";
import { LogoutButton } from "../../../components/logout";

const MemberView = ({ groupInfo }: { groupInfo: GroupResponse[] }) => (
  <Container
    maxWidth="lg"
    sx={{
      paddingTop: 4,
      paddingBottom: 4,
      display: "flex",
      flexDirection: "column",
      gap: "20px",
    }}
  >
    <div className="p-20 bg-gray-100 rounded-lg text-center flex flex-col gap-5">
      <div>
        <h1 className="text-3xl md:text-6xl font-bold mb-4">
          Welcome Developer!
        </h1>
        <p className="text-lg">
          You are a member of the following groups. You can request elevation to
          a higher group.
        </p>
      </div>
      <LogoutButton />
    </div>

    <div className="grid gap-7">
      <div className="flex flex-col gap-7">
        <h1 className="text-4xl font-bold">Groups</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {groupInfo.map((group) => (
              <div
                key={group.groupKey.id}
                className="flex flex-col gap-2 border rounded shadow p-5 bg-white"
              >
                <h2 className="text-xl font-bold mb-2">{group.displayName}</h2>
                <div className="flex flex-wrap gap-2">
                  {group.roles.map((role) => (
                    <Chip key={role.role} label={role.role} />
                  ))}
                </div>
              </div>
            ))}
          </div>
          <RequestElevation />
        </div>
      </div>

      <div className="flex flex-col gap-7">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold">Requests History</h1>
          <p className="text-md">
            Here you can see the history of your requests.
          </p>
        </div>
        <RequestsHistory />
      </div>
    </div>
  </Container>
);

export default MemberView;
