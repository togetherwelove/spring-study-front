<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/store/authService";
const routes = useRouter()
  .getRoutes()
  .filter((r) => r.name === "default")[0]?.children;

const authStore = useAuthStore();

const logout = () => {
  console.log("logout...");
  authStore.logout();
};

const drawer = ref(false);
</script>

<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" width="175">
      <v-sheet class="ma-3">
        <v-btn @click="logout">logout</v-btn>
      </v-sheet>
      <v-list>
        <v-list-item v-for="route in routes" :key="route.path" :to="route" density="compact" :title="route.name"> </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar>
      <v-btn color="primary" icon @click.stop="drawer = !drawer"><v-icon>mdi-menu</v-icon></v-btn>
      Hello World!
    </v-app-bar>
    <v-main>
      <router-view class="ma-5"></router-view>
    </v-main>
  </v-app>
</template>
