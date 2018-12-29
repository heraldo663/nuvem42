import Vue from "vue";
import Vuetify from "vuetify/lib";
import "vuetify/src/stylus/app.styl";

Vue.use(Vuetify, {
  iconfont: "mdi",
  theme: {
    primary: "#006400",
    secondary: "#ffc107",
    accent: "#8c9eff",
    error: "#b71c1c"
  }
});
