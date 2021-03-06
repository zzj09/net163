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
      activeNum:0,
      isShowTabbar:true,
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
      activeNum:1,
      isShowTabbar:true,
    },
    component: () => import('../views/Topic.vue')
  },
  {
    path: '/category',
    name: 'Category',
    meta:{
      activeNum:2,
      isShowTabbar:true,
    },
    component: () => import('../views/Category.vue')
  },
  {
    path: '/cart',
    name: 'Cart',
    meta:{
      activeNum:3,
      isShowTabbar:true,
    },
    component: () => import('../views/Cart.vue')
  },
  {
    path: '/user',
    name: 'User',
    meta:{
      activeNum:4,
      isShowTabbar:true,
    },
    component: () => import('../views/User.vue')
  },
  {
    path: '/productDetail',
    name: 'ProductDetail',
    component: () => import('../views/ProductDetail.vue')
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 路由拦截     (前置) 路由守卫
// 每次进入路由之前，执行这个函数
router.beforeEach((to, from, next)=>{

  let token = localStorage.getItem("token");
  if(to.path == "/cart"){     // 表示去往购物车页面
    if(token){
      next()
    }else{
      // 表示没有登录
      Vue.prototype.$toast("请先登录")
      setTimeout(()=>{
        next("/user");    // 跳转到user
      },500)
    }
  }else{
    next();   // 可以顺利通过要去的路由， 如果不写next(), 就不能访问到相应的路由
  }

  
})

export default router
