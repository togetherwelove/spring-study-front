import router from "@/router";
import { defineStore } from "pinia";

export const useSignupStore = defineStore({
  id: "signup",
  state: () => {
    return {
      request: "",
      returnUrl: "/",
    };
  },
  actions: {
    async signup(request) {
      return new Promise(async (resolve, reject) => {
        try {
          const response = await fetch("/api/auth/signup/check", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(request),
          });
          if (response.status === 200) {
            const data = await response.json();

            if (data.code !== "ERROR") {
              // Request Singup
              const response = await fetch("/api/auth/signup/request", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(request),
              });

              if (response.status === 200) {
                const data = await response.json();
                if (data.code !== "ERROR") {
                  resolve(data);
                } else {
                  reject(data.message);
                }
              }
            }
          }
        } catch (error) {
          reject(error);
        }
      });
    },
  },
});
