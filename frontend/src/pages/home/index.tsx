import { useFetchQuery } from "../../hooks/useFetch";
import { getCurrentUserGroups } from "../../api/group";
import { useRole } from "../../hooks/useRole";
import OwnerView from "./owner";
import MemberView from "./member";

const HomePage = () => {
  const { data: groupInfo, loading } = useFetchQuery(getCurrentUserGroups);
  const { isSuperAdminOwner } = useRole(groupInfo);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (groupInfo instanceof Error) {
    return <div>Error: {groupInfo.message}</div>;
  }

  return isSuperAdminOwner ? (
    <OwnerView groupInfo={groupInfo} />
  ) : (
    <MemberView groupInfo={groupInfo} />
  );
};

export default HomePage;
