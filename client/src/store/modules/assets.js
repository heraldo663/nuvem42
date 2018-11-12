export default {
  state: {
    assets: []
  },
  mutations: {
    setAssets(state, assets) {
      state.assets = assets;
    },
    addAssets(state, asset) {
      state.assets.push(asset);
    }
  },
  getters: {
    assets(state) {
      return state.assets;
    }
  },

  actions: {
    async getAllAssets({ commit, getters }) {
      try {
        const res = await window.axios.get(
          `/api/bucket/${getters.rootBucketId}/assets`
        );
        commit("setAssets", res.data);
      } catch (error) {
        console.log(error);
      }
    },
    async downloadFile(ctx, payload) {
      const file = await window.axios.get(payload.urlLink, {
        method: "GET",
        responseType: "blob"
      });
      const url = window.URL.createObjectURL(file.data);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", payload.filename);
      document.body.appendChild(link);
      link.click();
    },
    async uploadFile({ commit, getters }, e) {
      let file = e.target.files[0];
      const formData = new FormData();
      formData.append("file", file);
      const res = await window.axios.post(
        `/api/bucket/${getters.rootBucketId}/assets/`,
        formData
      );

      commit("addAssets", res.data);
    },
    async deleteAssets({ commit, getters }, assetId) {
      window.axios.delete(`/api/bucket/${this.rootBucketId}/assets/${assetId}`);

      const filteredAssets = getters.assets.filter(asset => {
        return asset.id !== assetId;
      });

      commit("setAssets", filteredAssets);
    }
  }
};
