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

  async function login(loginUser: LoginUser) {
    const response: AxiosResponse = await axios.post(
      "http://localhost:8080/auth/login",
      { ...loginUser },
      { headers: { Authorization: "application/json" } }
    );
    const datas: Response = await response.data;
    if (datas.data.accessToken) {
      token.value = datas.data.accessToken;
      router.push(returnURL.value ?? "/");
    }
    return Promise.resolve(datas);
  }

  async function refresh() {
    const response = await fetch("http://localhost:8080/auth/refresh", {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      const responseData: Promise<Response> = await response.json();
      const datas = (await responseData).data;
      if (datas.accessToken) {
        token.value = datas.accessToken;
      } else if ((await responseData).code === "ERROR") {
        console.warn(JSON.stringify(await responseData));
      }
    }
  }

  async function logout() {
    const authorizationString = "Bearer " + token.value;
    await fetch("http://localhost:8080/auth/logout", {
      method: "POST",
      credentials: "same-origin",
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
      "http://localhost:8080/auth/signup/check",
      { ...user },
      { headers: { Authorization: "application/json" } }
    );
    let checkedRequired = false;
    if ((response.data?.code ?? "ERROR") === "ERROR") {
      checkedRequired = true;
    }
    return Promise.resolve(checkedRequired);
  }

  async function requestSignup(user: SignupUser): Promise<Response> {
    const response: AxiosResponse = await axios.post(
      "http://localhost:8080/auth/signup/request",
      { ...user },
      { headers: { Authorization: "application/json" } }
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
