import router from "../../router";

export default {
  state: {
    isRoot: true,
    buckets: [{}],
    rootBucketId: "",
    prevState: []
  },
  mutations: {
    setIsRoot(state, val) {
      state.isRoot = val;
    },
    setBuckets(state, buckets) {
      state.buckets = buckets;
    },
    addToBuckets(state, payload) {
      state.buckets.push(payload);
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
    },
    prevState(state) {
      return state.prevState;
    }
  },
  actions: {
    async getAllRootbuckets({ commit }) {
      try {
        const res = await window.axios.get("/api/bucket");
        commit("setRootBucketId", res.data.rootId);
        commit("setBuckets", res.data.buckets);
      } catch (error) {
        router.push("/login");
      }
    },
    async getAllBuckets({ commit }, bucketId) {
      try {
        const res = await window.axios.get(`/api/bucket/${bucketId}`);
        commit("setBuckets", res.data);
        commit("setRootBucketId", bucketId);
        commit("setIsRoot", false);
      } catch (err) {
        router.push("/login");
      }
    },
    addToPrevState({ commit, getters }) {
      commit("addToPrevState", {
        buckets: getters.buckets,
        assets: getters.assets,
        rootBucketId: getters.rootBucketId
      });
    },
    backToPrevState({ commit, getters }) {
      const { buckets, assets, rootBucketId } = getters.prevState[
        getters.prevState.length - 2
      ];
      commit("setBuckets", buckets);
      commit("setAssets", assets);
      commit("setRootBucketId", rootBucketId);
      commit("removeLastPrevState");

      if (getters.prevState.length === 1) {
        commit("setIsRoot", true);
      }
    },
    async createDirs({ commit, getters }, name) {
      try {
        const res = await window.axios.post("/api/bucket", {
          bucket: name,
          rootBucketId: getters.rootBucketId
        });
        console.log(res.data);
        commit("addToBuckets", res.data);
      } catch (error) {
        console.log(error);
      }
    },
    async deleteDirs({ commit, getters }, bucketId) {
      try {
        let res;
        if (confirm("Tem certeza que deseja deletar?")) {
          res = await window.axios.delete(`/api/bucket/${bucketId}`);
        }
        if (res.data.success) {
          let filteredBuckets = getters.buckets.filter(bucket => {
            if (bucket.id != bucketId) {
              return true;
            } else {
              return false;
            }
          });
          commit("setBuckets", filteredBuckets);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
};
