import config from "../../../config.json";
import xhrHelpers from "../../helpers/xhrHelpers";

export default {
  state: {
    assets: [],
    progress: 0,
    isUploading: false
  },
  mutations: {
    setAssets(state, assets) {
      state.assets = assets;
    },
    addAssets(state, asset) {
      state.assets.push(asset);
    },
    toggleIsUploading(state) {
      state.isUploading = !state.isUploading;
    },
    setProgress(state, val) {
      state.progress = val;
    }
  },
  getters: {
    assets(state) {
      return state.assets;
    },
    progress(state) {
      return state.progress;
    },
    isUploading(state) {
      return state.isUploading;
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
    async downloadFile({ getters }, payload) {
      let req = new XMLHttpRequest();
      req.responseType = "blob";
      req.open("GET", payload.urlLink, true);
      req.addEventListener("loadstart", xhrHelpers.loadStartFunction, false);
      req.addEventListener("progress", xhrHelpers.progressFunction, false);
      req.addEventListener("load", xhrHelpers.transferCompleteFunction, false);
      req.setRequestHeader("Authorization", getters.authToken);
      req.send();
      req.onload = () => {
        const file = req.response;
        console.log(file);
        const url = window.URL.createObjectURL(file);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", payload.filename);
        document.body.appendChild(link);
        link.click();
        window.URL.revokeObjectURL(url);
      };
    },
    async deleteAssets({ commit, getters }, assetId) {
      window.axios.delete(`/api/bucket/${this.rootBucketId}/assets/${assetId}`);
      const filteredAssets = getters.assets.filter(asset => {
        return asset.id !== assetId;
      });
      commit("setAssets", filteredAssets);
    },
    async uploadFile({ commit, getters }, e) {
      let file = e.target.files[0];
      const formData = new FormData();
      formData.append("file", file);
      let xhrObj = new XMLHttpRequest();
      xhrObj.responseType = "json";
      xhrObj.open(
        "POST",
        `${config.apiUrl}api/bucket/${getters.rootBucketId}/assets/`,
        true
      );
      xhrObj.upload.addEventListener(
        "loadstart",
        xhrHelpers.loadStartFunction,
        false
      );
      xhrObj.upload.addEventListener(
        "progress",
        xhrHelpers.progressFunction,
        false
      );
      xhrObj.upload.addEventListener(
        "load",
        xhrHelpers.transferCompleteFunction,
        false
      );
      // xhrObj.setRequestHeader("Content-type", "x-www-form-urlencoded");
      xhrObj.setRequestHeader("Authorization", getters.authToken);
      xhrObj.send(formData);

      xhrObj.onload = () => {
        var jsonResponse = xhrObj.response;
        commit("addAssets", jsonResponse);
      };
    }
  }
};
