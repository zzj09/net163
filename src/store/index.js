import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isShowPopupShadow:false
  },
  getters: {
  },
  mutations: {
    changeIsShowPopupShadow(state,payload){
      state.isShowPopupShadow = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
