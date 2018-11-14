<template>
  <div id="app">
    <Navbar></Navbar>
    <div class="content">
     <router-view/>
    </div>
    <div class="footer">
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
export default {
  components: {
    Navbar,
    Footer
  }
};
</script>

<style lang="scss">
$theme-colors: (
  "primary": #006400
);
@import "../node_modules/bootstrap/scss/bootstrap";
@import url("https://fonts.googleapis.com/css?family=Ubuntu");

body {
  font-family: "Ubuntu", sans-serif !important;
}
.content {
  min-height: calc(100vh - 160px);
}
.footer {
  height: 50px;
}
</style>
