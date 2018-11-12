export default {
  state: {
    isRoot: true,
    buckets: [],
    rootBucketId: "",
    prevState: []
  },
  mutations: {
    toggleIsRoot(state) {
      state.isRoot = !state.isRoot;
    },
    setBuckets(state, payload) {
      state.buckets = payload;
    },
    setRootBucketId(state, payload) {
      state.rootBucketId = payload;
    },
    addToPrevState(state, payload) {
      state.prevState.push(payload);
    },
    removeLastPrevState(state) {
      state.prevState.pop();
    }
  },
  getters: {
    isRoot(state) {
      return state.isRoot;
    },
    buckets(state) {
      return state.buckets;
    },
    rootBucketId(state) {
      return state.rootBucketId;
    }
  },
  actions: {
    async getAllbuckets({ commit }) {
      const res = await window.axios.get("/api/bucket");
      commit("setRootBucketId", res.data.rootId);
      commit("setBuckets", res.data.buckets);
    },
    addToPrevState({ commit, getters }) {
      commit("addToPrevState", {
        buckets: getters.buckets,
        assets: getters.buckets,
        rootBucketId: getters.rootBucketId
      });
    }
  }
};
