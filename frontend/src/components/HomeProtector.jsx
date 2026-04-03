import { useAuthStore } from "../store/useAuthStore";
import Login from "../pages/Login";
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const HomeProtector = ({ children }) => {
  const { authUser, isChecking } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isChecking && !authUser) {
      return navigate("/login");
    }
  }, [authUser, isChecking, navigate]);

  if (isChecking) {
    return (
      <div className="h-screen flex flex-col items-center justify-center">
        <span className="loading loading-bars loading-xl"></span>
      </div>
    );
  }

  return children;
};

export default HomeProtector;
