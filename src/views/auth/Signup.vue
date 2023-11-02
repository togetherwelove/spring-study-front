<script setup>
import { useSignupStore } from "@/store/signupService";
import rules from "@/plugins/rules";
import { ref, reactive, computed, watch } from "vue";
const singupService = useSignupStore();
const loading = ref(false);
const signupRequest = reactive({
  name: "dean",
  email: "user@user.dev",
  password: "qwer1234",
  passwordVerify: "qwer1234",
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

async function signup() {
  loading.value = true;
  singupService.signup(signupRequest);
  loading.value = false;
}

const passwordVerifyRules = computed(() => [
  (value) => {
    if (value === signup.password) return true;
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
              <v-form validate-on="submit" @submit.prevent="signup">
                <v-text-field density="compact" v-model="signupRequest.name" label="이름" :rules="rules.name"></v-text-field>
                <v-text-field density="compact" v-model="signupRequest.email" label="이메일(아이디)" :rules="rules.email"></v-text-field>
                <v-row>
                  <v-col>
                    <v-text-field density="compact" type="password" v-model="signupRequest.password" label="비밀번호" :rules="rules.password" autocomplete="off"></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field density="compact" type="password" v-model="signupRequest.passwordVerify" label="비밀번호(확인)" :rules="passwordVerifyRules" autocomplete="off"></v-text-field>
                  </v-col>
                </v-row>
              </v-form>
            </v-card-text>
          </v-window-item>

          <v-window-item :value="2">
            <v-card-text class="text-center">
              <v-icon icon="mdi-check-circle" color="success" size="128"></v-icon>
              <h3 class="title font-weight-bold mb-2">회원가입을 축하드립니다.</h3>
            </v-card-text>
          </v-window-item>
        </v-window>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" :loading="loading" @click="signup">{{ title }}</v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </v-app>
</template>
