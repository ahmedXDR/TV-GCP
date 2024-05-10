import useUser from "../hooks/useUser";
import Loading from "../components/loading";
import { Navigate, useNavigate, useLocation } from "react-router-dom";

const publicRoutes = ["/login"];

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const user = useUser();
  if (user === undefined) return <Loading />;
  if (user === null) return <Navigate replace to="/login" />;

  // Redirect to home if user is already logged in
  const { pathname } = useLocation();
  if (publicRoutes.includes(pathname)) {
    const navigate = useNavigate();
    navigate("/");
  }

  return children;
};

export default ProtectedRoute;
