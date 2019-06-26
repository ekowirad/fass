import Vue from 'vue'
import VueRouter from 'vue-router'

import Root from '../components/Root'
import AdminRoot from '../components/AdminRoot'
import Login from '../components/Login'
import admin from './admin'



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
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
        }

    ]
});

// admin route guard
router.beforeEach((to, from, next) => {
    const authUser = window.localStorage.getItem('api_token');
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (authUser === null) {
            next({ name: 'login' })
        } else {
            next();
        }
    } else {
        next()
    }

    // prevent to login when user has login
    // if(to.name === 'login'){
    //     if(authUser !== null){
    //        next({name: 'dashboard'}) 
    //     }else {
    //         next()
    //     }
    // }else{
    //     next()
    // }


})

export default router;