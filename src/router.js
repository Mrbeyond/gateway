// @ts-nocheck
import Vue from "vue";
import VueRouter from "vue-router";
import AuthGuard from "./utils/auth.guard";
import { adminRoot } from "./constants/config";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: () => import(/* webpackChunkName: "home" */ "./views/home"),
  },
  {
    path: adminRoot,
    component: () => import(/* webpackChunkName: "app" */ "./views/app"),
    redirect: `${adminRoot}`,
    meta: { loginRequired: true },
    /*
    define with Authorization :
    meta: { loginRequired: true, roles: [UserRole.Admin, UserRole.Editor] },
    */
    children: [
      {
        path: "",
        component: () =>
          import(/* webpackChunkName: "blank-page" */ "./views/app/dashboards/DashBoard/DBCover.vue")
        },
        {
          path: "customers",
          component: () => import(/* webpackChunkName: "error" */ "./views/app/dashboards/Customers/CustomersCover")
        },
        {
          path: "business",
          component: () => import(/* webpackChunkName: "error" */ "./views/app/dashboards/Business/Businesses")
        },
        {
          path: "business/:id",
          component: () => import(/* webpackChunkName: "error" */ "./views/app/dashboards/Business/BusinessDetails.vue")
        },
        {
          path: "payouts",
          component: () => import(/* webpackChunkName: "error" */ "./views/app/dashboards/Payouts/Payout")
        },
        {
          path: "wallets",
          component: () => import(/* webpackChunkName: "error" */ "./views/app/dashboards/Wallet/Wallet.vue")
        },
        {
          path: "transactions",
          component: () => import(/* webpackChunkName: "error" */ "./views/app/dashboards/Transactions/TransactionsCover.vue")
        },
        {
          path: "settings",
          component: () => import(/* webpackChunkName: "error" */ "./views/app/dashboards/Settings/SettingsCover.vue")
        },
        {
          path: "invoices",
          component: () => import(/* webpackChunkName: "error" */ "./views/app/dashboards/Invoices/InvoicesCover.vue")
        },
    ]
  },
  {
    path: "blank-page",
    component: () =>
      import(/* webpackChunkName: "blank-page" */ "./views/app/blank-page")
  },
  {
    path: "/error",
    component: () => import(/* webpackChunkName: "error" */ "./views/Error")
  },
  {
    path: "/unauthorized",
    component: () => import(/* webpackChunkName: "error" */ "./views/Unauthorized")
  },
  {
    path: "/user",
    component: () => import(/* webpackChunkName: "user" */ "./views/user"),
    redirect: "/user/login",
    children: [
      {
        path: "login",
        component: () =>
          import(/* webpackChunkName: "user" */ "./views/user/Login")
      },
      {
        path: "register",
        component: () =>
          import(/* webpackChunkName: "user" */ "./views/user/Register")
      },
      {
        path: "update",
        component: () =>
          import(/* webpackChunkName: "user" */ "./views/user/Update")
      },
      {
        path: "forgot-password",
        component: () =>
          import(/* webpackChunkName: "user" */ "./views/user/ForgotPassword")
      },
      {
        path: "reset-password",
        component: () =>
          import(/* webpackChunkName: "user" */ "./views/user/ResetPassword")
      },

    ]
  },
  {
    path: "*",
    component: () => import(/* webpackChunkName: "error" */ "./views/Error")
  }
];

const router = new VueRouter({
  linkActiveClass: "active",
  routes,
  mode: "history",
});
router.beforeEach(AuthGuard);
export default router;
