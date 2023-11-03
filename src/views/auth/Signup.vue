<script setup>
import { useSignupStore } from "@/store/signupService";
import rules from "@/plugins/rules";
import { ref, reactive, computed, watch } from "vue";
const singupService = useSignupStore();
const loading = ref(false);
const signupRequest = reactive({
  name: "",
  email: "user@user.dev",
  password: "1234qwer",
  passwordVerify: "1234qwer",
});

let step = ref(1);

const title = computed(() => {
  switch (step.value) {
    case 1:
      return "회원가입";
    case 2:
      return "홈으로";
  }
});

async function signup(event) {
  loading.value = true;
  try {
    const result = await event;
    const errors = await result.errors;
    if (errors?.length === 0) {
      console.log("signup...");
      await singupService.signup(signupRequest);
      console.log("signup success...");
      step.value++;
    } else {
      console.log("value error...");
      console.log(errors);
    }
  } catch (error) {
    console.log("signup error...");
    console.log(error);
    alert(error);
  } finally {
    loading.value = false;
  }
}

const passwordVerifyRules = computed(() => [
  (value) => {
    if (value) return true;
    return "비밀번호를 입력해주세요.";
  },
  (value) => {
    if (value === signupRequest.password) return true;
    return "비밀번호가 일치하지 않습니다.";
  },
]);
</script>

<template>
  <v-app>
    <div class="d-flex align-center justify-center" style="height: 100%">
      <v-card class="mx-auto" width="100%" max-width="490">
        <v-card-title class="title font-weight-regular d-flex justify-space-between">
          <div>
            <span><strong>회원가입</strong></span>
            <p class="text-body-2">이미 계정이 있다면 <a href="/auth/login">로그인</a>해주세요.</p>
          </div>
        </v-card-title>

        <v-window v-model="step">
          <v-window-item :value="1">
            <v-card-text>
              <v-form validate-on="input lazy" @submit.prevent="signup">
                <v-text-field density="compact" v-model="signupRequest.email" :rules="rules.email">
                  <template v-slot:label> <span>이메일</span><span style="color: red">*</span></template>
                </v-text-field>
                <v-row>
                  <v-col>
                    <v-text-field density="compact" type="password" v-model="signupRequest.password" :rules="rules.password" autocomplete="off">
                      <template v-slot:label> <span>비밀번호</span><span style="color: red">*</span></template>
                    </v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field density="compact" type="password" v-model="signupRequest.passwordVerify" :rules="passwordVerifyRules" autocomplete="off">
                      <template v-slot:label> <span>비밀번호(확인)</span><span style="color: red">*</span></template>
                    </v-text-field>
                  </v-col>
                </v-row>
                <v-text-field density="compact" v-model="signupRequest.name" label="이름" :rules="rules.name"></v-text-field>
                <v-row>
                  <v-spacer></v-spacer>
                  <v-col cols="auto">
                    <v-btn class="mt-2" type="submit" color="primary" :loading="loading">{{ title }}</v-btn>
                  </v-col>
                </v-row>
              </v-form>
            </v-card-text>
          </v-window-item>

          <v-window-item :value="2">
            <v-card-text class="text-center">
              <v-icon icon="mdi-check-circle" color="success" size="128"></v-icon>
              <h3 class="title font-weight-bold mb-2">회원가입을 축하드립니다.</h3>
              <v-row>
                <v-spacer></v-spacer>
                <v-col cols="auto">
                  <v-btn class="mt-2" color="primary" :loading="loading">{{ title }}</v-btn>
                </v-col>
              </v-row>
            </v-card-text>
          </v-window-item>
        </v-window>
      </v-card>
    </div>
  </v-app>
</template>
