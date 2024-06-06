import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/components/Home.vue';
import register from "@/components/Register.vue";
import chat from "@/components/Chat.vue";
import login from "@/components/Login.vue";

const routes = [
    { path: '/', component: Home },
    { path: '/register', component: register },
    { path: '/login', component: login },
    { path: '/chat', component: chat },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
