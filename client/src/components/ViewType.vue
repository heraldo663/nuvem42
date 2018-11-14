<template>
  <nav class="mb-3">
    <ul class="nav nav-pills navbar-light mb-3" id="pills-tab" role="tablist">
      <li class="nav-item">
        <a class="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home"
          :aria-selected="viewList" @click="handleClick(false)">Grade</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" id="pills-profile-tab" data-toggle="pill" href="#pills-profile" role="tab" aria-controls="pills-profile"
          :aria-selected="viewList" @click="handleClick(true)">Lista</a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: ["viewList"],
  methods: {
    handleClick(val) {
      this.$emit("changeViewList", val);
    }
  }
};
</script>

<style scoped>
a {
  color: #222;
}
.nav-link.active {
  color: #222;
}
</style>
