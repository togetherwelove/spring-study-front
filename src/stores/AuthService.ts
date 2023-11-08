import { ref, Ref, computed } from "vue";
import router from "@/router";
import { defineStore } from "pinia";
import instance from "@/utils/axios-interceptor";
import { AxiosResponse } from "axios";

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
    const response: AxiosResponse = await instance.post("/auth/login", {
      ...loginUser,
    });
    const datas: Response = await response.data;
    if (datas.data.accessToken) {
      token.value = datas.data.accessToken;
      router.push(returnURL.value ?? "/");
    }
    return Promise.resolve(datas);
  }

  async function refresh() {
    const response: AxiosResponse = await instance.post("/auth/refresh");
    const responseData: Response = await response.data;
    const data = responseData.data;
    if (data.accessToken) {
      token.value = await data.accessToken;
    } else if (responseData.code === "ERROR") {
      console.warn(responseData.message);
    }
  }

  async function logout() {
    const response: AxiosResponse = await instance.post("/auth/logout");
    // TODO
    console.log(response);
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
    const response: AxiosResponse = await instance.post("/auth/signup/check", {
      ...user,
    });
    let checkedRequired = false;
    console.log(response);
    // TODO
    return Promise.resolve(checkedRequired);
  }

  async function requestSignup(user: SignupUser): Promise<Response> {
    const response: AxiosResponse = await instance.post(
      "/auth/signup/request",
      { ...user }
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
