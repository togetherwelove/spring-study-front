import { defineStore } from "pinia";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => {
    return {
      user: "",
      token: "",
      returnUrl: "/",
      isLogout: false,
    };
  },
  actions: {
    async login(user) {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "apllication/json" },
        body: JSON.stringify(user),
      });
      if (response.status == 200) {
        const data = await response.json();
        // TODO
      }
    },
  },
});
