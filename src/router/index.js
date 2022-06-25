import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "@/views/Dashboard.vue";
import Boid from "@/views/Boid.vue";
import Company from "@/views/Company.vue";
import Transaction from "@/views/transaction/Transaction.vue";
import AllShareCompanywise from "@/views/transaction/AllShareCompanywise.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "dashboard",
      component: Dashboard,
    },
    {
      path: "/boid",
      name: "boid",
      component: Boid,
    },
    {
      path: "/company",
      name: "company",
      component: Company,
    },
    {
      path: "/transaction",
      name: "transaction",
      component: Transaction,
    },
    {
      path: "/allsharecompanywise",
      name: "allsharecompanywise",
      component: AllShareCompanywise,
    },
  ],
});

export default router;
