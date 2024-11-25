import { createRouter, createWebHistory } from 'vue-router';
import Home from '../vue/Home.vue';
import Login from '../vue/Connexion.vue';
import Register from '../vue/Inscription.vue';
import Settings from '../vue/Settings.vue';

const routes = [
    { path: '/', component: Home, meta: { requiresAuth: true } },
    { path: '/login', component: Login, meta: { requiresGuest: true } },
    { path: '/register', component: Register, meta: { requiresGuest: true } },
    {path: '/settings', component: Settings, meta: { requiresAuth: true } }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token');

    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!token) {
            next({ path: '/login' });
        } else {
            next();
        }
    } else if (to.matched.some(record => record.meta.requiresGuest)) {
        if (token) {
            next({ path: '/planning' });
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;