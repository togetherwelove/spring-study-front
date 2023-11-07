<script lang="ts" setup>
import { useRouter } from "vue-router";
import { useAuthStore, LoginUser, Response } from "@/store/authService";
import { ref, reactive } from "vue";

const authService = useAuthStore();
const { push } = useRouter();

const user: LoginUser = reactive({
  email: "",
  password: "",
});

const loading = ref(false);

async function login(event: any) {
  loading.value = true;
  const results = await event;
  const errors = await results.errors;
  if (errors?.length === 0) {
    const response: Response = await authService.login(user);
    if (response.code === "ERROR") {
      alert(response.message);
    } else if (response.code === "SUCCESS") {
      alert("login-success" + "\n" + "redirect to home page");
      push({ name: "home" });
    }
  }
  loading.value = false;
}

const emailRules = [
  (value: string) => {
    if (value) return true;
    return "email is required.";
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
      <h2>login</h2>
      <v-form validate-on="submit lazy" @submit.prevent="login">
        <v-text-field
          v-model="user.email"
          label="email"
          variant="outlined"
          density="compact"
          :rules="emailRules"
        ></v-text-field>
        <v-text-field
          v-model="user.password"
          label="password"
          type="password"
          variant="outlined"
          density="compact"
          :rules="[(v: any) => !!v || 'password is required']"
        ></v-text-field>
        <v-btn type="submit" :loading="loading" color="primary" block
          >login</v-btn
        >
      </v-form>
      <div>
        <p class="text-body-2">
          dont-have-an-account
          <router-link to="signup">sign up</router-link>
        </p>
      </div>
    </v-sheet>
  </div>
</template>
