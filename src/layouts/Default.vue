<script setup>
import { RouteRecordRaw, userRouter } from "vue-router";
const routes = userRouter()
  .getRoutes()
  .filter((r) => r.name === "default")[0]?.children;
</script>

<template>
  <v-navigation-drawer>
    <v-list>
      <v-list-item v-for="route in routes" :key="route.name" :to="route" density="compact" :title="t(route.name?.toString() ?? '')"> </v-list-item>
    </v-list>
  </v-navigation-drawer>
  <v-app>
    <v-app-bar> Hello World! </v-app-bar>
    <v-main>
      <router-view></router-view>
    </v-main>
    <v-footer>
      <div>{{ new Date().getFullYear() }} — <strong>Project : Spring Demo</strong></div>
    </v-footer>
  </v-app>
</template>
