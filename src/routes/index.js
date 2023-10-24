import Default from "../layouts/Default.vue";
import Auth from "../layouts/Auth.vue";
import { useAuthStore } from "@/store/authService";

const routes = [
  { path: "", redirect: "/home" },
  {
    name: "default",
    path: "/",
    component: Default,
    children: [
      { name: "home", path: "/home", component: () => import("@/views/Home.vue"), meta: { authRequired: true } },
      { name: "about", path: "/about", component: () => import("@/views/About.vue"), meta: { authRequired: true } },
    ],
    meta: { authRequired: true },
  },
  {
    name: "auth",
    path: "/auth",
    component: Auth,
    children: [{ name: "login", path: "/auth/login", component: () => import("@/views/auth/Login.vue"), meta: { authRequired: false } }],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const auth = useAuthStore();
  if (auth.token === "") {
    await auth.refresh();
  }
  if (to.meta.authRequired && auth.token === "") {
    next({ name: "login" });
  }
  next();
});

export default routes;
