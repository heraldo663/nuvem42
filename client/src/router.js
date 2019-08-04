import Vue from "vue";
import Router from "vue-router";
import Login from "./views/Login.vue";
import Dashboard from "./views/Dashboard.vue";
import store from "./store";

Vue.use(Router);

let router = new Router({
  mode: "history",
  routes: [
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: "/register",
      name: "Register",

      component: () =>
        import(/* webpackChunkName: "Register" */ "./views/Register.vue")
    },
    {
      path: "/",
      name: "dashboard",
      component: Dashboard
    }
  ]
});

const openRoutes = ["Login", "Register"];

router.beforeEach((to, from, next) => {
  if (openRoutes.includes(to.name)) {
    next();
  } else if (store.getters.authToken) {
    next();
  } else {
    next("/login");
  }
});

export default router;
