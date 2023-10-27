<script setup>
import { useSignupStore } from "@/store/signupService";
import rules from "@/plugins/rules";
import { ref, reactive, computed } from "vue";
const useSignupSerivce = useSignupStore();
const loading = ref(false);

const user = reactive({
  name: "",
  email: "",
  password: "",
  passwordVerify: "",
});

async function signup(event) {
  loading.value = true;
  const result = await event;
  const errors = await result.errors;
  if (errors?.length === 0) {
    useSignupSerivce.check(user);
  }
  loading.value = false;
}

const passwordVerifyRule = [
  (value) => {
    if (value) return true;
    return "비밀번호를 입력해주세요.";
  },
  (value) => {
    if (value === user.password) return true;
    return "비밀번호가 일치하지 않습니다.";
  },
];
</script>

<template>
  <div class="d-flex align-center justify-center" style="height: 100%">
    <v-sheet width="550">
      <h2>회원가입</h2>
      <v-form class="mt-2" validate-on="input lazy" @submit.prevent="signup">
        <v-text-field density="compact" variant="outlined" v-model="user.name" :rules="rules.name" label="이름"></v-text-field>
        <v-text-field class="mt-3" density="compact" variant="outlined" v-model="user.email" :rules="rules.email" label="이메일 (아이디)"></v-text-field>
        <v-row class="mt-2">
          <v-col>
            <v-text-field
              density="compact"
              type="password"
              variant="outlined"
              v-model="user.password"
              :rules="rules.password"
              hint="8자 이상, 최소 1개의 대문자, 1개의 소문자, 숫자 포함, 특수 문자 포함 가능"
              label="비밀번호"
              autocomplete="none"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field density="compact" type="password" variant="outlined" v-model="user.passwordVerify" :rules="passwordVerifyRule" label="비밀번호 (확인)" autocomplete="none"></v-text-field>
          </v-col>
        </v-row>
        <v-btn class="mt-2" type="submit" :loading="loading" color="primary" block>회원가입</v-btn>
        <div class="mt-2">
          <p class="text-body-2">이미 가입되어 있는 경우 <a href="/auth/login">로그인</a>해주세요.</p>
        </div>
      </v-form>
    </v-sheet>
  </div>
</template>
