<script lang="ts" setup>
import { useSignupStore, SignupUser, Response } from "@/stores/AuthService";
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";

const signupService = useSignupStore();
const { push } = useRouter();

const user: SignupUser = reactive({
  name: "dean",
  email: "user@user.dev",
  password: "1234qwer",
  passwordVerify: "1234qwer",
});

const loading = ref(false);

async function signup(event: any) {
  loading.value = true;
  const results = await event;
  const errors = await results.errors;
  if (errors?.length === 0) {
    if (await signupService.checkRequired(user)) {
      alert("required");
      loading.value = false;
      return;
    }
    const response: Response = await signupService.requestSignup(user);
    if (response.code === "ERROR") {
      alert(response.message);
      loading.value = false;
      return;
    } else if (response.code === "SUCCESS") {
      alert("회원가입 성공 로그인 페이지로 이동합니다.");
      push({ name: "login" });
    }
  }
  loading.value = false;
}

const emailRules = [
  (value: string) => {
    if (value) return true;
    return "email is requred.";
  },
  (value: string) => {
    if (/.+@.+\..+/.test(value)) return true;
    return "email must be valid.";
  },
];
</script>

<template>
  <div class="d-flex align-center justify-center" style="height: 90vh">
    <v-sheet width="400" class="mx-auto">
      <h2>sign up</h2>
      <v-form validate-on="submit lazy" @submit.prevent="signup">
        <v-text-field
          v-model="user.name"
          label="name"
          variant="outlined"
          density="compact"
          :rules="[(v: any) => !!v || 'name is required']"
        ></v-text-field>
        <v-text-field
          v-model="user.email"
          label="email"
          autocomplete="username"
          variant="outlined"
          density="compact"
          :rules="emailRules"
        ></v-text-field>
        <v-row>
          <v-col>
            <v-text-field
              v-model="user.password"
              label="password"
              type="password"
              autocomplete="new-password"
              variant="outlined"
              density="compact"
              :rules="[(v: any) => !!v || 'password is required']"
              required
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              v-model="user.passwordVerify"
              label="password(verify)"
              type="password"
              autocomplete="new-password"
              variant="outlined"
              density="compact"
              :rules="[(v: any) => !!v || 'password(verify) is required']"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-btn type="submit" color="primary" block :loading="loading"
          >sign up</v-btn
        >
      </v-form>
      <div>
        <p class="text-body-2">
          do-you-already-have-an-account
          <router-link to="/auth/login">login</router-link>
        </p>
      </div>
    </v-sheet>
  </div>
</template>
