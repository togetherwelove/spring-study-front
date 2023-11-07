import { ref, Ref, computed } from "vue";
import router from "@/router";
import { defineStore } from "pinia";
import axios, { AxiosResponse } from "axios";

export interface LoginUser {
  email: string;
  password: string;
}

export interface Response {
  code: string;
  message: string;
  data: any;
  description: string | null;
  accessToken: string | null;
}

export const useAuthStore = defineStore("auth", () => {
  const user: Ref<string> = ref("");
  const token: Ref<string> = ref("");
  const returnURL: Ref<string> = ref("/");

  const currentUser = computed(() => user.value);
  const currentToken = computed(() => token.value);

  async function login(loginUser: LoginUser): Promise<Response> {
    const response: AxiosResponse = await axios.post(
      "/api/auth/login",
      { ...loginUser },
      { headers: { "Content-Type": "application/json" } }
    );
    const datas: Response = await response.data;
    if (datas.data.accessToken) {
      token.value = datas.data.accessToken;
      router.push(returnURL.value ?? "/");
    }
    return Promise.resolve(datas);
  }

  async function refresh() {
    const response = await fetch("/api/auth/refresh", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    if (response.status === 200) {
      const responseData: Response = await response.json();
      const datas = responseData.data;
      if (datas.accessToken) {
        token.value = datas.accessToken;
      } else if (responseData.code === "ERROR") {
        console.warn(responseData.message);
      }
    }
  }

  async function logout() {
    const authorizationString = "Bearer " + token.value;
    await fetch("/api/auth/logout", {
      headers: {
        "Content-Type": "application/json",
        Authorization: authorizationString,
      },
    });
    token.value = "";
    user.value = "";
    await router.push("/auth/login");
  }
  return {
    user,
    token,
    returnURL,
    currentUser,
    currentToken,
    login,
    refresh,
    logout,
  };
});

export interface SignupUser {
  email: string;
  password: string;
  passwordVerify: string;
  name: string;
}

export const useSignupStore = defineStore("signup", () => {
  async function checkRequired(user: SignupUser): Promise<boolean> {
    const response: AxiosResponse = await axios.post(
      "/api/auth/signup/check",
      { ...user },
      { headers: { "Content-Type": "application/json" } }
    );
    let checkedRequired = false;
    if ((response.data?.code ?? "ERROR") === "ERROR") {
      checkedRequired = true;
    }
    return Promise.resolve(checkedRequired);
  }

  async function requestSignup(user: SignupUser): Promise<Response> {
    const response: AxiosResponse = await axios.post(
      "/api/auth/signup/request",
      { ...user },
      { headers: { "Content-Type": "application/json" } }
    );
    return Promise.resolve(response.data);
  }

  async function resendMail(email: string) {}

  return {
    checkRequired,
    requestSignup,
    resendMail,
  };
});
