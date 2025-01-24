import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '../layouts/MainLayouts.vue'
import Login from '../components/auth/Login.vue'

const routes = [
    {
        path: '/',
        redirect: '/dashboard'
    },
    {
        path: '/',
        component: MainLayout,
        children: [
            {
                path: 'dashboard',
                name: 'Dashboard',
                component: () => import('../views/Dashboard.vue'),
                meta: { requiresAuth: false }
            },
            {
                path: 'categories',
                name: 'Categories',
                component: () => import('../views/Categories.vue'),
                meta: { requiresAuth: false }
            },
            {
                path: 'news',
                name: 'News',
                component: () => import('../views/News.vue'),
                meta: { requiresAuth: false }
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
    const token = localStorage.getItem('token')
    const user = localStorage.getItem('user')

    if (requiresAuth && !token) {
        next({ path: '/' })
    } else {
        next()
    }
})

export default router
