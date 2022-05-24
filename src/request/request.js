import axios from "axios"

// 创建实例
const instance = axios.create({
    baseURL:"http://kumanxuan1.f3322.net:8001",
    timeout:5000        // 超过5s 则超时
});
// http://kumanxuan1.f3322.net:8001
// http://520it.com:8001

// 拦截器
instance.interceptors.request.use(config=>{
    // 什么时候执行这个函数？       发请求之前执行这个函数
    // 可以判断用户有没有登录， 如果没有登录，就直接return,   请求就不会出去
    // console.log("config:",config);    // 本次请求的一些信息

    return config

},err=>{

    return Promise.reject(err)
})


instance.interceptors.response.use(res=>{
    // 什么时候执行这个函数？       在接收到响应之前，在执行then方法之前

    // console.log("res:",res);    // 本次服务器响应的一些信息

    return res      // 返回的这个res  被then方法的res形参接收

},err=>{

    return Promise.reject(err)
})

export default instance;