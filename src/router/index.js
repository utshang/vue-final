import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("../views/frontend/FrontView.vue"),
    children: [
      {
        path: "",
        component: () => import("../views/frontend/HomeView.vue"),
      },
      {
        path: "products",
        component: () => import("../views/frontend/ProductsView.vue"),
      },
      {
        path: "product/:id",
        name: "product",
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
        path: "checkorder",
        component: () => import("../views/frontend/CheckOrder.vue"),
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
        path: "contact",
        component: () => import("../views/frontend/ContactUs.vue"),
      },
      {
        path: "faq",
        component: () => import("../views/frontend/AskedQuestion.vue"),
      },
      {
        path: "articles",
        component: () => import("../views/frontend/AritclesView.vue"),
      },
      {
        path: "article/:id",
        component: () => import("../views/frontend/AritcleView.vue"),
      },
    ],
  },

  {
    path: "/login",
    component: () => import("../views/LoginView.vue"),
  },

  {
    path: "/login",
    component: () => import("../views/LoginView.vue"),
  },

  {
    path: "/admin",
    component: () => import("../views/backend/DashboardView.vue"),
    children: [
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
      {
        path: "articles",
        component: () => import("../views/backend/AdminArticles.vue"),
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    component: () => import("../views/NotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  // 啟用的連結反黑
  // linkActiveClass: "active",
});

export default router;
