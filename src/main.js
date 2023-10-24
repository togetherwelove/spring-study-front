import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import "./style.css";
import App from "./App.vue";
import routes from "./routes";

// Router
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Vuetify
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: "mdi",
    aliases: {
      md: "mdi",
    },
  },
});

const app = createApp(App);
app.use(router);
app.use(vuetify);
app.mount("#app");
