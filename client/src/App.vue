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
@import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
.content {
  min-height: calc(100vh - 160px);
}
.footer {
  height: 50px;
}
</style>
