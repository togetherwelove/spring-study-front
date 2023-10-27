import router from "@/router";
import { defineStore } from "pinia";

export const useSignupStore = defineStore({
  id: "signup",
  state: () => {
    return {
      user: "",
      returnUrl: "/",
    };
  },
  actions: {
    async check(user) {
      const response = await fetch("/api/signup/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      if (response.status === 200) {
        alert("checked");
      }
    },

    async request(user) {},
  },
});
