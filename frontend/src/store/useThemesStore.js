// import { create } from "zustand";

// export const useThemeStore = create((set) => ({
//   theme: localStorage.getItem("chat-theme") || "forest",

//   setTheme: (theme) => {
//     localStorage.setItem("chat-theme", theme);
//     document.documentElement.setAttribute("data-theme", theme); // Apply theme to <html>
//     set({ theme });
//   },
// }));
import { create } from "zustand";

// Get theme from localStorage or set default
const savedTheme = localStorage.getItem("chat-theme") || "coffee";

// Immediately apply it to the document
document.documentElement.setAttribute("data-theme", savedTheme);

export const useThemeStore = create((set) => ({
  theme: savedTheme,
  setTheme: (theme) => {
    localStorage.setItem("chat-theme", theme);
    document.documentElement.setAttribute("data-theme", theme); // ✅ Apply theme immediately
    set({ theme });
  },
}));
