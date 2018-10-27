<template>
  <div id="app">
    <div id="nav">
      <Navbar></Navbar>
    </div>
    <router-view/>
  </div>
</template>

<script>
import Navbar from "./components/Navbar";
export default {
  components: {
    Navbar
  }
};
</script>

<style lang="scss">
@import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
</style>
