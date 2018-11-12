export default {
  state: {
    assets: []
  },
  mutations: {
    setAssets(state, assets) {
      state.assets = assets;
    }
  },
  getters: {
    assets(state) {
      return state.assets;
    }
  },

  actions: {
    async getAllAssets({ commit, getters }) {
      const res = await window.axios.get(
        `/api/bucket/${getters.rootBucketId}/assets`
      );
      commit("setAssets", res.data);
    }
  }
};
