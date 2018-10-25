<template>
  <div>
    <Navbar></Navbar>
    <h1>Dashboard</h1>
  </div>
</template>

<script>
import Navbar from "./../components/Navbar";
export default {
  data() {
    return {
      posts: {}
    };
  },
  components: {
    Navbar
  },
  methods: {}
};
</script>
