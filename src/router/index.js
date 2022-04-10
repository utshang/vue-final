import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("../views/FrontEnd/FrontView.vue"),
    children: [
      {
        path: "",
        component: () => import("../views/FrontEnd/HomeView.vue"),
      },
      // 前台產品列表
      {
        path: "products",
        component: () => import("../views/FrontEnd/ProductsView.vue"),
      },
      {
        path: "product/:id",
        component: () => import("../views/FrontEnd/ProductView.vue"),
      },
      {
        path: "favorite",
        component: () => import("../views/FrontEnd/FavoriteView.vue"),
      },
      {
        path: "cart",
        component: () => import("../views/FrontEnd/CartView.vue"),
      },
      {
        path: "checkout/:id",
        component: () => import("../views/FrontEnd/CheckOut.vue"),
      },
      {
        path: "orderfinished",
        component: () => import("../views/FrontEnd/OrderFinished.vue"),
      },
      {
        path: "about",
        component: () => import("../views/FrontEnd/AboutUs.vue"),
      },
      {
        path: "faq",
        component: () => import("../views/FrontEnd/AskedQuestion.vue"),
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
    component: () => import("../views/BackEnd/DashboardView.vue"),
    children: [
      // 前台產品列表
      {
        path: "products",
        component: () => import("../views/BackEnd/AdminProducts.vue"),
      },
      {
        path: "coupon",
        component: () => import("../views/BackEnd/AdminCoupon.vue"),
      },
      {
        path: "order",
        component: () => import("../views/BackEnd/AdminOrder.vue"),
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
