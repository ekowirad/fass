import router from "./";

router.beforeEach((to, from, next)=> {
    if(to.meta.requiresAuth){
        
    }
})