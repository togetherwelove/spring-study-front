<script setup>
import { useAuthStore } from "@/store/authService";
import { reactive } from "vue";
const authStore = useAuthStore();
const user = reactive({
  email: "user@user.dev",
  password: "1234",
});

const login = () => {
  console.log("login...", user);
  authStore.login(user);
};
</script>

<template>
  <div class="d-flex align-center justify-center" style="height: 100%">
    <v-sheet width="350">
      <h2>Hello World!</h2>
      <v-form class="mt-2" @submit-prevent="login">
        <v-text-field variant="outlined" v-model="user.email" label="이메일"></v-text-field>
        <v-text-field type="password" variant="outlined" v-model="user.password" label="비밀번호" autocomplete="none"></v-text-field>
        <v-btn type="submit" @click.prevent="login" color="primary" block class="mt-2">로그인</v-btn>
      </v-form>
      <div class="mt-2">
        <p class="text-body-2">계정이 없으신가요? <a href="/auth/signup">회원가입</a></p>
      </div>
    </v-sheet>
  </div>
</template>
