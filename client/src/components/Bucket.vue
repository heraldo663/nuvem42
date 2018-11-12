<template>
  <div class="item">
    <a href="#" class="delete" @click.prevent="handleDeleteDirs(bucket.id)"><i class="fas fa-window-close text-danger"></i></a>
    <a href="#" class="item-link" @click.prevent="handleClickOnDirs(bucket.id)">
      <div class="row">
        <i class="fas fa-folder fa-5x"></i>
      </div>
      <div class="row">
        <div class="item-name">
          {{bucket.bucket}}
        </div>
      </div>
    </a>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: ["bucket"],
  methods: {
    ...mapActions([
      "getAllAssets",
      "getAllBuckets",
      "addToPrevState",
      "deleteDirs"
    ]),
    async handleClickOnDirs(bucketId) {
      await this.getAllBuckets(bucketId);
      await this.getAllAssets();
      await this.addToPrevState();
    },
    handleDeleteDirs(bucketId) {
      this.deleteDirs(bucketId);
    }
  }
};
</script>

<style lang="scss">
.item {
  padding: 0px 30px;
}

.item-name {
  max-width: 80px;
  max-height: 120px;
  overflow: auto;
}

.item-link {
  text-decoration: none;
}

.delete {
  position: relative;
  bottom: -15px;
  left: 50px;
}
</style>
