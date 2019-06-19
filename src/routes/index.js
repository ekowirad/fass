import Vue from 'vue'
import VueRouter from 'vue-router'

import Root from '../components/Root'
import AdminRoot from '../components/AdminRoot'
import Login from '../components/Login'
import admin from './admin'
// import guard from './guard'



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
            component: Login
        }

    ]
});

// admin route guard
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        const authUser = window.localStorage.getItem('api_token');
        console.log('authUser' ,authUser)
        if(authUser === null){
            next({name:'login'})
        }else {
            next();
        }
    }else{
        next()
    }

})



export default router;