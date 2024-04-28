import { PropsWithChildren, useEffect } from "react";
import { useNavigate } from "react-router-dom";

type ProtectedRouteProps = PropsWithChildren;

export const ProtectedRoute: React.FC<ProtectedRouteProps> = (props) => {
  const { children } = props;

  const navigate = useNavigate();

  useEffect(() => {
    const userData = sessionStorage.getItem("user");
    if (!userData) {
      navigate("/", { replace: true });
    } 
    // else {
    //   const user = JSON.parse(userData);
    //   if (user.role === "admin") {
    //     navigate("/adminDashboard", { replace: true });
    //   } else if (user.role === "customer") {
    //     navigate("/customerDashboard");
    //   }
    // }
  }, [navigate]);

  return <>{children}</>;
};
