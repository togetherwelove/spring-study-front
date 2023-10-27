<script setup>
import { useAuthStore } from "@/store/authService";
import rules from "@/plugins/rules";
import { ref, reactive } from "vue";
const authService = useAuthStore();
const user = reactive({
  email: "user@user.dev",
  password: "1234",
});

const loading = ref(false);

async function login(event) {
  loading.value = true;
  const result = await event;
  const errors = await result.errors;
  if (errors?.length === 0) {
    authService.login(user);
  }
  loading.value = false;
}
</script>

<template>
  <div class="d-flex align-center justify-center" style="height: 100%">
    <v-sheet width="350">
      <h2>Hello World!</h2>
      <v-form class="mt-3" validate-on="input" @submit.prevent="login">
        <v-text-field variant="outlined" v-model="user.email" label="이메일" :rules="rules.email"></v-text-field>
        <v-text-field class="mt-2" type="password" variant="outlined" v-model="user.password" :rules="rules.password" label="비밀번호" autocomplete="none"></v-text-field>
        <v-btn class="mt-2" type="submit" :loading="loading" color="primary" block>로그인</v-btn>
        <p class="mt-2 text-body-2 text-red" v-if="$route.query.error">아이디 혹은 비밀번호가 잘못되었습니다.</p>
      </v-form>
      <div class="mt-2">
        <p class="text-body-2">로그인하려면 계정이 필요합니다. <a href="/auth/signup">회원가입</a></p>
      </div>
    </v-sheet>
  </div>
</template>
