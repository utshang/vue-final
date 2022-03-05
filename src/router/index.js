import { createRouter, createWebHashHistory } from "vue-router";
// import HomeView from "../views/HomeView.vue";

const routes = [
  // {
  //   path: "/",
  //   name: "home",
  //   component: HomeView,
  // },
  //前台

  {
    path: "/",
    component: () => import("../views/FrontView.vue"),
    children: [
      {
        path: "",
        component: () => import("../views/IndexView.vue"),
      },
      // 前台產品列表
      {
        path: "products",
        component: () => import("../views/ProductsView.vue"),
      },
      {
        path: "product/:id",
        component: () => import("../views/ProductView.vue"),
      },
      {
        path: "cart",
        component: () => import("../views/CartView.vue"),
      },
    ],
  },

  //登入註冊
  {
    path: "/login",
    component: () => import("../views/LoginView.vue"),
  },

  //後台
  {
    path: "/admin",
    component: () => import("../views/DashboardView.vue"),
    children: [
      // 前台產品列表
      {
        path: "products",
        component: () => import("../views/AdminProducts.vue"),
      },
      {
        path: "coupon",
        component: () => import("../views/AdminCoupon.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  // 啟用的連結反黑
  // linkActiveClass: "active",
});

export default router;
