<template>
  <v-app>
    <v-app-bar> This is an auth page </v-app-bar>
    <v-main>
      <router-view></router-view>
    </v-main>
    <v-footer>
      <div>{{ new Date().getFullYear() }} — <strong>Project : Spring Demo</strong></div>
    </v-footer>
  </v-app>
</template>
