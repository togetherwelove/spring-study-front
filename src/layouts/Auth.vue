<template>
  <v-app>
    <v-app-bar>
      <v-app-bar-title class="text-capitalize"> welcome! </v-app-bar-title>
    </v-app-bar>
    <v-main>
      <router-view></router-view>
    </v-main>
    <v-footer app>
      <div>{{ new Date().getFullYear() }} — <strong>Project : Spring Demo</strong></div>
    </v-footer>
  </v-app>
</template>
