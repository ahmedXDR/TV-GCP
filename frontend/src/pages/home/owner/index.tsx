import { useState } from "react";
import { RequestsHistory } from "./requests-history";
import { FilterHistory, FilterType } from "./filter-history";
import { Container } from "@mui/material";
import { LogoutButton } from "../../../components/logout";

const OwnerView = () => {
  const [filter, setFilter] = useState<FilterType>("all");

  return (
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
          <h1 className="text-6xl font-bold mb-4">Welcome Admin!</h1>
          <p className="text-lg">
            You can see the history of requests and accept or reject the pending
            ones.
          </p>
        </div>
        <LogoutButton />
      </div>
      <div className="flex flex-col gap-10">
        <div className="flex flex-wrap justify-between items-center gap-5">
          <h3 className="text-3xl font-bold">Requests History</h3>
          <FilterHistory filter={filter} setFilter={setFilter} />
        </div>
        <RequestsHistory filter={filter} />
      </div>
    </Container>
  );
};

export default OwnerView;
