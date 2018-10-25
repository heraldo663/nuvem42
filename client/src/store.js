import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    authToken: null,
    username: "",
    error: ""
  },
  mutations: {
    authUser(state, userData) {
      state.authToken = userData.authToken;
      if (userData.error) state.error = userData.error;
    },
    setUsername(state, user) {
      state.username = user.username;
    },
    cleanErrors(state) {
      state.error = "";
    },
    unsetAuthToken(state) {
      state.authToken = null;
    }
  },
  actions: {
    async register({ commit }, authData) {
      try {
        await Vue.axios.post("/api/auth/register", {
          email: authData.email,
          password: authData.password,
          username: authData.username
        });
      } catch (error) {
        commit("authUser", {
          error: error.response.data.error
        });
      }
    },
    cleanErrors({ commit }) {
      commit("cleanErrors");
    },

    async login({ commit }, authData) {
      try {
        const res = await Vue.axios.post("/api/auth/login", {
          email: authData.email,
          password: authData.password
        });
        if (authData.rememberMe) {
          localStorage.setItem("authToken", res.data.token);
        }
        commit("authUser", {
          authToken: res.data.token
        });
      } catch (error) {
        commit("authUser", {
          error: error.response.data.error
        });
      }
    },
    logout({ commit }) {
      commit("unsetAuthToken");
      localStorage.setItem("authToken", "");
    }
  },
  getters: {
    errors(state) {
      return state.errors;
    }
  }
});
