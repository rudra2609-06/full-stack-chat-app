import React, { useEffect } from "react";
import AllRoutes from "./Routes/AllRoutes";
import { useAuthStore } from "./store/useAuthStore.js";
import { Toaster } from "react-hot-toast";
import { useThemeStore } from "./store/useThemeStore.js";

const App = () => {
  const { checkAuth, authUser, isChecking, onlineUsers } = useAuthStore();

  const { theme } = useThemeStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isChecking && !authUser) {
    return (
      <div className="h-screen flex flex-col items-center justify-center">
        <span className="loading loading-bars loading-xl"></span>
      </div>
    );
  }

  console.log("online users", onlineUsers);
  console.log("theme: ", theme);

  return (
    <div data-theme={theme}>
      <AllRoutes />
      <Toaster toastOptions={{ duration: 3000, removeDelay: 500 }} />
    </div>
  );
};

export default App;
