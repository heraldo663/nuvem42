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
  }
};
