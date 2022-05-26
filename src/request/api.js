// 所有的请求放在这里

import request from "./request"


// 首页数据的请求
export const GetHomeList = () => request.get("/index/index")

// 获取搜索弹出框的数据
export const GetSearchPopupData = () => request.get("/search/index")

// 获取实时搜索的文本提示的数据列表         get的params需要{},post不需要{}
// export const GetSearchTipsListData = (params) => request.get("/search/helper",{
//     params:params
// })
export const GetSearchTipsListData = (params) => request.get("/search/helper",{params})

// 获取搜索商品列表的数据
export const GetGoodsListData = (params) => request.get("/goods/list",{params})

// 清除历史记录
export const ClearHistory = () => request.post("/search/clearhistory")

// 登录请求
export const GoLogin = (params) => request.post("/auth/loginByWeb",params)

// 获取商品的详情信息
export const GetGoodsDetailData = (params) => request.get("/goods/detail",{params})

// 获取商品的相关产品
export const GetGoodsRelatedData = (params) => request.get("/goods/related",{params})

// 获取购物车产品数量
export const GetGoodsCount = () => request.get("/cart/goodscount")

// 加入购物车 
export const AddCart = (params) => request.post("/cart/add",params)
