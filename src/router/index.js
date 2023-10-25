import { createRouter, createWebHistory } from "vue-router";
import Default from "@/layouts/Default.vue";
import Auth from "@/layouts/Auth.vue";
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
  if (auth.isLogin) {
    await auth.refresh();
  }
  if (to.meta.authRequired && !auth.isLogin) {
    next({ name: "login" });
  }
  next();
  // TODO
  // [Vue Router warn]: The "next" callback was called more than once in one navigation guard when going from "/" to "/home". It should be called exactly one time in each navigation guard. This will fail in production.
});

export default router;
