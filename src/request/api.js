// 所有的请求放在这里

import request from "./request"


// 首页数据的请求
export const GetHomeList = () => request.get("/index/index")

// 获取搜索弹出框的数据
export const GetSearchPopupData = () => request.get("/search/index")
