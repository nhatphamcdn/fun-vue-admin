import { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    name: "home",
    path: "/",
    redirect: "/dashboard",
  },
  {
    name: "dashboard",
    path: "/dashboard",
    component: () => import("@/views/Dashboard.vue"),
  },
  {
    name: "settings",
    path: "/settings",
    component: () => import("@/views/Settings.vue"),
  },
];

export default routes;
