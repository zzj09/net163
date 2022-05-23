import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function(location) {
  return originalPush.call(this, location).catch(err => {})
};

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect:"/home"
  },
  {
    path: '/home',
    name: 'Home',
    component: HomeView,
    meta:{
      activeNum:0
    },
    children:[
      {
        path: '/home/searchPopup',
        name: 'SearchPopup',
        component: () => import('../views/SearchPopup.vue')
      }
    ]
  },
  {
    path: '/topic',
    name: 'Topic',
    meta:{
      activeNum:1
    },
    component: () => import('../views/Topic.vue')
  },
  {
    path: '/category',
    name: 'Category',
    meta:{
      activeNum:2
    },
    component: () => import('../views/Category.vue')
  },
  {
    path: '/cart',
    name: 'Cart',
    meta:{
      activeNum:3
    },
    component: () => import('../views/Cart.vue')
  },
  {
    path: '/user',
    name: 'User',
    meta:{
      activeNum:4
    },
    component: () => import('../views/User.vue')
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
