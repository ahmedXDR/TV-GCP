import { useFetchQuery } from "../../hooks/useFetch";
import { getCurrentUserGroup } from "../../api/group";
import OwnerView from "./owner";
import MemberView from "./member";

const HomePage = () => {
  const { data: groupInfo, loading } = useFetchQuery(getCurrentUserGroup);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (groupInfo instanceof Error) {
    return <div>Error: {groupInfo.message}</div>;
  }

  return groupInfo.owner ? (
    <OwnerView groupInfo={groupInfo} />
  ) : (
    <MemberView groupInfo={groupInfo} />
  );
};

export default HomePage;
