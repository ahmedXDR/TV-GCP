import useUser from "../hooks/useUser";
import Loading from "../components/loading";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const user = useUser();
  if (user === undefined) return <Loading />;
  return user ? children : <Navigate replace to="/login" />;
};

export default ProtectedRoute;
