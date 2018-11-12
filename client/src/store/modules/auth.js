export default {
  state: {
    authToken: null || localStorage.getItem("authToken"),
    error: "",
    username: ""
  },
  mutations: {
    setAuthUser(state, userData) {
      state.authToken = userData.authToken;
    },
    unSetAuthToken(state) {
      state.authToken = null;
    },
    setError(state, error) {
      state.error = error;
    },
    unSetError(state) {
      state.error = "";
    },
    setUsername(state, name) {
      state.username = name;
    }
  },
  actions: {
    async login({ commit }, authData) {
      try {
        const res = await window.axios.post("/api/auth/login", {
          email: authData.email,
          password: authData.password
        });
        const { token, user } = res.data;
        commit("setUsername", user.username);
        window.axios.defaults.headers.common["Authorization"] = token;
        if (authData.rememberMe) {
          localStorage.setItem("authToken", token);
        }
        commit("setAuthUser", { authToken: token });
      } catch (error) {
        commit("setError", {
          error: error.response.data.error
        });
        setTimeout(() => {
          commit("unSetError");
        }, 3000);
      }
    },
    logout({ commit }) {
      commit("unSetAuthToken");
      localStorage.setItem("authToken", "");
    }
  },
  getters: {
    authToken(state) {
      return state.authToken;
    },
    error(state) {
      return state.error;
    }
  }
};
