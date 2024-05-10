import useUser from "../hooks/useUser";
import Loading from "../components/loading";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const user = useUser();
  if (user === undefined) return <Loading />;
  return user ? <Navigate replace to="/" /> : children;
};

export default PublicRoute;
