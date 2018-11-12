import Vue from "vue";
import Vuex from "vuex";
import auth from "./modules/auth";
import buckets from "./modules/buckets";
import assets from "./modules/assets";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    buckets,
    assets
  }
});
