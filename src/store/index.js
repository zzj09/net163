import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isShowPopupShadow:false,
    isShowHomeProduct:true,
  },
  getters: {
  },
  mutations: {
    changeIsShowPopupShadow(state,payload){
      state.isShowPopupShadow = payload
    },
    changeIsShowHomeProduct(state,payload){
      state.isShowHomeProduct = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
