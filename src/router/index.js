import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/Home/Home.vue";
import Character from "@/views/Character/Character.vue";

const routes = [
  { path: '/:pathMatch(.*)*', name: 'NotFound', redirect: '/' },
  {
    path: "/",
    name: "Página Inicial",
    component: Home,
  },
  { path: '/character/:id', name: "Character", component: Character }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;