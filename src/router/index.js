import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("../views/frontend/FrontView.vue"),
    redirect: "",
    children: [
      {
        path: "",
        component: () => import("../views/frontend/HomeView.vue"),
      },
      // 前台產品列表
      {
        path: "products",
        component: () => import("../views/frontend/ProductsView.vue"),
      },
      {
        path: "product/:id",
        component: () => import("../views/frontend/ProductView.vue"),
      },
      {
        path: "favorite",
        component: () => import("../views/frontend/FavoriteView.vue"),
      },
      {
        path: "cart",
        component: () => import("../views/frontend/CartView.vue"),
      },
      {
        path: "checkout/:id",
        component: () => import("../views/frontend/CheckOut.vue"),
      },
      {
        path: "orderfinished",
        component: () => import("../views/frontend/OrderFinished.vue"),
      },
      {
        path: "about",
        component: () => import("../views/frontend/AboutUs.vue"),
      },
      {
        path: "faq",
        component: () => import("../views/frontend/AskedQuestion.vue"),
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
    component: () => import("../views/backend/DashboardView.vue"),
    redirect: "/admin/products",
    children: [
      // 前台產品列表
      {
        path: "products",
        component: () => import("../views/backend/AdminProducts.vue"),
      },
      {
        path: "coupon",
        component: () => import("../views/backend/AdminCoupon.vue"),
      },
      {
        path: "order",
        component: () => import("../views/backend/AdminOrder.vue"),
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
