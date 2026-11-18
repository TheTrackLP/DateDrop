import { createRouter, createWebHistory } from "vue-router";
import { supabase } from "@/Lib/supabase";

const routes = [
  {
    path: "/",
    name: "Login",
    component: () => import("@/Auth/Login.vue"),
  },
  {
    path: "/admin",
    component: () => import("@/Layout/AdminLayout.vue"),
    children: [
      {
        path: "dashboard",
        name: "AdminDashboard",
        component: () => import("@/Pages/Admin/Dashboard.vue"),
      },
      {
        path: "places",
        name: "Places",
        component: () => import("@/Pages/Places.vue"),
      },
      {
        path: "categories",
        name: "Categories",
        component: () => import("@/Pages/Categories.vue"),
      },
      {
        path: "memories",
        name: "Memories",
        component: () => import("@/Pages/Memories.vue"),
      },
    ],
    meta: { requiresAuth: true },
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
