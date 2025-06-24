import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  // ✅ Get Users
  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load users");
    } finally {
      set({ isUsersLoading: false });
    }
  },

  // ✅ Get Messages for selected user
  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load messages");
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  // ✅ Send Message
  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    try {
      const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
      set({ messages: [...messages, res.data] });
    } catch (error) {
      toast.error(error.response?.data?.message || "Message send failed");
    }
  },

  // ✅ Subscribe to real-time new messages via socket.io
  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;
    if (!socket) return;

    socket.on("newMessage", (newMessage) => {
      const currentSelected = get().selectedUser;
    // const isMessageSentFromSelectedUser = newMessage.senderId === selectedUser._id;
    // if(!isMessageSentFromSelectedUser) return;
      // Only update messages if they belong to current chat
      if (
        newMessage.senderId === currentSelected?._id ||
        newMessage.receiverId === currentSelected?._id
      ) 
    {
        set((state) => ({
          messages: [...state.messages, newMessage],
        }));
      }
    });
  },

  // ✅ Unsubscribe when component unmounts
  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    if (!socket) return;
    socket.off("newMessage");
  },

  // ✅ Select a user to chat with
  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
