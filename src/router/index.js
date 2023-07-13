import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter) 

import Home from '../views/Home.vue'
import User from '../views/User.vue'
import Main from '../views/Main.vue'
import Mall from '../views/Mall.vue'
import PageOne from '../views/PageOne.vue'
import PageTwo from '../views/PageTwo.vue'
import Login from'../views/Login.vue'

const routes = [
    //主路由
    {
        path: '/',
        component: Main,
        name:'Main',
        redirect:'/home',
        children: [
             { path: 'home', name:'home',component: Home },
            { path: 'user', name:'user',component: User },
            { path: 'mall', name:'mall',component: Mall },
            { path: 'page1',name:'page1', component: PageOne },
            { path: 'page2',name:'page2', component: PageTwo }, 
        ]
    },
    {
        path: '/login',
        name: 'login',
        component:Login
    }

]

const router = new VueRouter({
    routes
})
export default router


const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
