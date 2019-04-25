import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogin: false
  },
  mutations: {
    setUserStatus(state, payload) {
      state.isLogin = payload.status
    }
  },
  actions: {
    notif({ commit }, { type, message }) {
      Swal.fire({
        type: type,
        text: message
      });
    },
  },
});
