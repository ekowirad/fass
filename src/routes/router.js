import Vue from 'vue'
import VueRouter from 'vue-router'

import Root from '../components/Root'
import AdminRoot from '../components/AdminRoot'
import admin from './admin'
import guard from './guard'



Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'root',
            component: Root,
        },
        {
            path: '/admin',
            name: 'admin',
            component: AdminRoot,
            children: admin,
            meta: { requiresAuth: true }
        }

    ]
});


export default router;