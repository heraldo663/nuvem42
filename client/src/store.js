import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    authToken: null || localStorage.getItem("authToken")
  },
  mutations: {
    setAuthUser(state, userData) {
      state.authToken = userData.authToken;
    },
    unsetAuthToken(state) {
      state.authToken = null;
    }
  },
  actions: {
    async login({ commit }, authData) {
      commit("setAuthUser", {
        authToken: authData.token
      });
      axios.defaults.headers.common["Authorization"] = authData.token;
      if (authData.rememberMe) {
        localStorage.setItem("authToken", authData.token);
      }
    },
    logout({ commit }) {
      commit("unsetAuthToken");
      localStorage.setItem("authToken", "");
    }
  },
  getters: {
    authToken(state) {
      return state.authToken;
    }
  }
});
