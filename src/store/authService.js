import router from "@/router";
import { defineStore } from "pinia";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => {
    return {
      user: "",
      token: "",
      returnUrl: "/",
    };
  },
  actions: {
    async login(user) {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      if (response.status === 200) {
        const data = await response.json();
        this.token = data.accessToken;
        await router.push(this.returnUrl || "/");
      } else if (response.status === 403) {
        await router.push({ name: "login", query: { error: 1 } });
      }
    },

    async refresh() {
      const response = await fetch("/api/auth/refresh", {
        method: "POST",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        const data = await response.json();
        this.token = data.accessToken;
      }
    },

    async logout() {
      const authorization = `Bearer ${this.token}`;
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorization,
        },
      });
      if (response.status === 200) {
        this.token = "";
        this.user = "";
        await router.push(this.returnUrl || "/login");
      }
    },
  },
});
