<template>
  <div class="col-md-6 offset-md-3 mt-5">
    <div class="progress" style="height: 30px;">
      <div class="progress-bar" role="progressbar" :style="{width: progress + '%'}" :aria-valuenow="progress"
        aria-valuemin="0" aria-valuemax="100">{{progress | truncate}}%</div>
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
  filters: {
    truncate(val) {
      return Math.floor(val);
    }
  }
};
</script>
