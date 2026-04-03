import { create } from "zustand";
import apiInstance from "../lib/apiInstance.js";
import { toast } from "react-hot-toast";
import { useAuthStore } from "./useAuthStore.js";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isLoadingUsers: false,
  isLoadingMessages: false,

  getAllUsers: async () => {
    set({ isLoadingUsers: true });
    try {
      const res = await apiInstance.get("/message/user");
      if (res.data?.data) {
        set({ users: res.data.data });
      } else {
        throw new Error("Cannot Get Users. Try Again...");
      }
    } catch (error) {
      console.log(error.response?.data?.message || error.message);
    } finally {
      set({ isLoadingUsers: false });
    }
  },

  getAllMessages: async (selectedUserId) => {
    console.log("get messages ran");
    set({ isLoadingMessages: true, messages: [] }); //clearing messages on user switch
    if (!selectedUserId) {
      toast.error("No Receiver Id Received...");
      set({ isLoadingMessages: false });
      return;
    }
    try {
      const res = await apiInstance.get(`/message/${selectedUserId}`);
      if (res.data?.data) {
        console.log("data", res.data.data);
        set({ messages: res.data?.data });
      } else {
        throw new Error("Failed To Fetch Messages.Please Reload And Try Again");
      }
    } catch (error) {
      console.log(error.response?.data?.message || error.message);
      toast.error(error.response?.data?.message || error.message);
    } finally {
      set({ isLoadingMessages: false });
    }
  },

  setSelectedUser: (selectedUser) => {
    const { users } = get();
    set({ selectedUser: null, messages: [] });
    const findSelectedUser = users.find((u) => u._id === selectedUser._id);
    if (!findSelectedUser) {
      set({ selectedUser: null });
      toast.error(`Cannot Select ${selectedUser.name}.Try Again..`);
    } else {
      set({ selectedUser: findSelectedUser });
    }
  },

  sendMessage: async (data) => {
    const { messages, selectedUser } = get();
    try {
      console.log("data from store: ", data);
      const res = await apiInstance.post(
        `/message/send/${selectedUser._id}`,
        data,
      );
      if (res.data?.data) {
        set({ messages: [...messages, res.data.data] });
      } else {
        throw new Error(
          `Error Sending Message to ${selectedUser.name}. Please try Again`,
        );
      }
    } catch (error) {
      console.log(error.response?.data?.message || error.message);
      toast.error(error.response?.data?.message || error.message);
    }
  },

  messageSubscriber: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;
    const socket = useAuthStore.getState().socket;
    socket.on("newMessage", (newMessage) => {
      if(newMessage.senderId !== selectedUser._id) return;
      set({ messages: [...get().messages, newMessage] });
    });
  },

  unsubscribeMessage: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  },
}));
