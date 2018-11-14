<template>
<div class="row mt-5">
  <div class="col-md-6">
    <div class="progress" style="height: 30px;">
      <div class="progress-bar" role="progressbar" :style="{width: progress + '%'}" :aria-valuenow="progress"
        aria-valuemin="0" aria-valuemax="100">{{progress | truncate}}%</div>
    </div>
  </div>
  <div class="col-md-1">
    <a href="#" class="delete" @click.prevent="handleStopDownload"><i class="fas fa-window-close text-danger fa-2x"></i></a>
  </div>

</div>
</template>

<script>
export default {
  computed: {
    progress() {
      return this.$store.getters.progress;
    }
  },
  methods: {
    handleStopDownload() {
      let req = this.$store.getters.req;
      req.abort();
    }
  },
  filters: {
    truncate(val) {
      return Math.floor(val);
    }
  }
};
</script>

<style scoped>
.progress-bar {
  display: inline-block;
}
a {
  display: inline;
}
.delete {
  position: relative;
  bottom: 0;
  left: 0px;
}
</style>
