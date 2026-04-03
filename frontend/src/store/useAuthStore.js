import { create } from "zustand";
import apiInstance from "../lib/apiInstance.js";
import { toast } from "react-hot-toast";
import { io } from "socket.io-client";

//in zustand if you want to call any fn inside another fn you need to call it using get().fnName(). And get is returned in call back by zustand

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLogingIn: false,
  isUpdatingProfile: false,
  isChecking: true,
  onlineUsers: [],
  socket: null,

  checkAuth: async () => {
    try {
      const res = await apiInstance.get("/auth/check");
      if (res.data.user) {
        set({ authUser: res.data.user });
        get().connectSocket();
      }
    } catch (error) {
      set({ authUser: null });
      console.log(error.response);
    } finally {
      set({ isChecking: false });
    }
  },

  signUp: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await apiInstance.post("/auth/signup", data);
      set({ authUser: res.data.data });
      get().connectSocket();
      toast(`${res.data.data.name} Signed Up Successfully`);
    } catch (error) {
      console.log(error.response);
      toast.error(
        error.response?.data?.message || "Error Occured.Please try again",
      );
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async ({ formData, navigate }) => {
    set({ isLogingIn: true });
    try {
      const res = await apiInstance.post("/auth/login", formData);
      set({ authUser: res.data.data });
      get().connectSocket();
      toast(`${res.data.data.name} Logged In`);
      navigate("/");
    } catch (error) {
      console.log(error.response);
      toast(error.response?.data?.message || "Error Occured. Please Try Again");
    } finally {
      set({ isLogingIn: false });
    }
  },

  logout: async (navigate) => {
    try {
      await apiInstance.post("/auth/logout");
      set({ authUser: null });
      get().disconnectSocket();
      toast("Logged Out Successfully");
      navigate("/login");
    } catch (error) {
      console.log(error.response);
      toast.error(
        error.response?.data?.message || "Error Occured.Please try again",
      );
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await apiInstance.patch("/auth/update-profile", {
        profilePic: data,
      });
      if (res.data?.data) {
        set({ authUser: res.data.data });
        toast.success("Image Updated Successfully");
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.log("Upload error:", error.response?.data || error.message);
      const errorMsg =
        error.response?.data?.message ||
        error.message ||
        "Error uploading image. Please try again";
      toast.error(errorMsg);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;
    const socket = io(
      import.meta.env.VITE_MODE === "dev"
        ? import.meta.env.VITE_BACKENT_URL_DEVELOPMENT
        : "/",
      {
        query: {
          userId: authUser._id,
        },
      },
    );
    socket.connect();
    set({ socket });
    //listen for online user updates
    socket.on("getOnlineUsers", (onlineUsersId) =>
      set({ onlineUsers: onlineUsersId }),
    );
  },

  disconnectSocket: () => {
    if (!get().socket?.connected) return; //if already disconnected return
    get().socket.disconnect();
    set({ socket: null });
  },
}));
