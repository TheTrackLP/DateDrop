import { createRouter, createWebHistory } from "vue-router";
import { supabase } from "@/Lib/supabase";

const routes = [
  {
    path: "/",
    name: "Login",
    component: () => import("@/Auth/Login.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

router.beforeEach(async (to) => {
  if (to.meta.requiresAuth) {
    const { data } = await supabase.auth.getSession();
    if (!data.session) return { name: "Login" };
  }
});
export default router;
