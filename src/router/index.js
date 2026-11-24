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
      {
        path: "maps",
        name: "Maps",
        component: () => import("@/Pages/Maps.vue"),
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
  const needAuths = to.meta.requiresAuth;
  const isLogin = to.name === "Login";

  if (!needAuths && !isLogin) return;

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return needAuths ? { name: "Login" } : undefined;
  }

  const { data: profile, error } = await supabase
    .from("users")
    .select("role")
    .eq("id", session.user.id)
    .maybeSingle();

  const isAdmin = profile?.role === "admin";

  if (isLogin) {
    return isAdmin ? { name: "AdminDashboard" } : undefined;
  }

  if (needAuths && !isAdmin) {
    return { name: "Login" };
  }
});
export default router;
