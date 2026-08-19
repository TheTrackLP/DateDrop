import { createRouter, createWebHistory } from "vue-router";
import { supabase } from "@/lib/supabase";

const routes = [
  {
    path: "/",
    name: "AuthLogin",
    component: () => import("@/pages/Login.vue"),
  },
  {
    path: "/home",
    component: () => import("@/layouts/AppShell.vue"),
    children: [
      {
        path: "/main",
        name: "Home",
        component: () => import("@/pages/MainPage.vue"),
      },
      {
        path: "/places-list",
        name: "ListPlaces",
        component: () => import("@/pages/Places.vue"),
      },
      {
        path: "/categories",
        name: "Categories",
        component: () => import("@/pages/Categories.vue"),
      },
    ],
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 };
  },
});

router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth) {
    const { data } = await supabase.auth.getSession();
    if (!data.session) {
      next({ name: "AdminLogin" });
      return;
    }
  }
  next();
});

export default router;
