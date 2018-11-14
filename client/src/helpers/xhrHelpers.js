import store from "../store";
export default {
  loadStartFunction() {
    store.commit("toggleIsUploading");
  },
  progressFunction(e) {
    if (e.lengthComputable) {
      let percentComplete = (e.loaded / e.total) * 100;
      store.commit("setProgress", percentComplete);
    } else {
      // Unable to compute progress information since the total size is unknown
      console.log("unknow total size");
    }
  },
  transferCompleteFunction() {
    store.commit("toggleIsUploading");
    store.commit("setProgress", 0);
  },
  abortTransfer() {
    store.commit("toggleIsUploading");
    store.commit("setProgress", 0);
  },
  transfer(getters, payload) {
    let req = new XMLHttpRequest();
    req.responseType = "blob";
    req.open("GET", payload.urlLink, true);
    req.addEventListener("loadstart", this.loadStartFunction, false);
    req.addEventListener("progress", this.progressFunction, false);
    req.addEventListener("abort", this.abortTransfer, false);
    req.addEventListener("load", this.transferCompleteFunction, false);
    req.setRequestHeader("Authorization", getters.authToken);
    return req;
  }
};
