import { createRouter, createWebHistory } from "vue-router";
// import { supabase } from "@/lib/supabase";

const routes = [
  {
    path: "/",
    component: () => import("@/layouts/AppShell.vue"),
    children: [
      {
        path: "",
        name: "Home",
        component: () => import("@/pages/MainPage.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 };
  },
});

// router.beforeEach(async (to, from, next) => {
//   if (to.meta.requiresAuth) {
//     const { data } = await supabase.auth.getSession();
//     if (!data.session) {
//       next({ name: "AdminLogin" });
//       return;
//     }
//   }
//   next();
// });

export default router;
