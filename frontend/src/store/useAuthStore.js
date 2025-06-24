

import toast from "react-hot-toast";
import { io } from "socket.io-client";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";

const BASE_URL =  import.meta.env.MODE === "development"?"http://localhost:5001": "/"

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,

  // ✅ 1. Check if user is authenticated
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
      get().connectSocket();
    } catch (error) {
      set({ authUser: null });
      console.log("Error in checkAuth:", error);
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  // ✅ 2. Signup
  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Account created successfully");
      get().connectSocket();
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Something went wrong. Please try again."
      );
      console.error("Signup Error:", error);
    } finally {
      set({ isSigningUp: false });
    }
  },

  // ✅ 3. Login
  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Logged in successfully");
      get().connectSocket();
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      set({ isLoggingIn: false });
    }
  },

  // ✅ 4. Logout
  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
      get().disconnectSocket();
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Logout failed. Please try again."
      );
      console.error("Logout Error:", error);
    }
  },

  // ✅ 5. Update Profile
  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("Profile updated successfully");
      return true;
    } catch (error) {
      console.log("Error in updateProfile:", error);
      toast.error(
        error?.response?.data?.message || "Profile update failed. Please try again."
      );
      return false;
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  // ✅ 6. Connect Socket.IO
  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;

    const socket = io(BASE_URL, {
      query: {
        userId: authUser._id,
      },
    });

    socket.connect();
    set({ socket });

    // ✅ Corrected: use socket.on instead of socket.io
    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },

  // ✅ 7. Disconnect Socket.IO
  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },
}));
