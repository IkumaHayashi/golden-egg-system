import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";
import * as VueRouter from "vue-router";

import Home from "./components/Home.vue";
import Performance from "./components/Performance.vue";
const routes = [
  { path: "/", component: Home },
  { path: "/performance/:edinetCode", component: Performance },
];
const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes,
});

const app = createApp(App);
app.use(router);
app.mount("#app");
