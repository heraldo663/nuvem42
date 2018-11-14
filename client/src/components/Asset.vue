<template>
  <div class="item">
    <a href="#" class="delete" @click.prevent="handleDeleteAssets(asset.id)"><i class="fas fa-window-close text-danger"></i></a>
    <a href="#" class="item-link" @click.prevent="handleDownload(asset.url, asset.name)">
      <div class="row">
        <i class="fas fa-file fa-5x text-info"></i>
      </div>
      <div class="row">
        <div class="item-name">
          {{asset.name}}
        </div>
      </div>
    </a>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  props: ["asset"],
  methods: {
    ...mapActions(["downloadFile", "deleteAssets"]),
    handleDownload(urlLink, filename) {
      this.downloadFile({
        urlLink,
        filename
      });
    },
    handleDeleteAssets(assetId) {
      this.deleteAssets(assetId);
    }
  }
};
</script>

<style scoped>
a {
  color: #222;
}
</style>
