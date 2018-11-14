<template>
  <div>

    <div class="row">
      <div class="d-sm-flex justify-content-start">
        <h2>
          <small @click="handleBackState" v-if="!isRoot">
            <i class="fas fa-arrow-circle-left fa-lg mr-3 text-primary"></i>
          </small>
        </h2>
        <h2 class="mr-5">
          Arquivos
        </h2>
        <button class="btn btn-info mr-4 btn-lg" data-toggle="modal" data-target="#CreateDirModal"> <i class="fas fa-plus fa-lg mr-2"></i>Adicionar
          Pasta</button>
        <div class="custom-file">
          <input type="file" v-on:change="handleUpload" style="display: none" id="customFile">
          <label class="btn btn-warning btn-lg" for="customFile"><i class="fas fa-upload mr-2"></i>Enviar</label>
        </div>

      </div>
    </div>
    <div class="row">
      <div v-for="(bucket) in buckets" :key="bucket.id">
        <Bucket :bucket="bucket"></Bucket>
      </div>
      <div v-for="(asset) in assets" :key="asset.id +500">
        <Asset :asset="asset"></Asset>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Bucket from "../components/Bucket";
import Asset from "../components/Asset";
export default {
  components: {
    Bucket,
    Asset
  },
  computed: {
    ...mapGetters(["buckets", "rootBucketId", "assets", "isRoot"])
  },
  methods: {
    ...mapActions([
      "getAllAssets",
      "getAllRootbuckets",
      "backToPrevState",
      "uploadFile",
      "addToPrevState"
    ]),
    handleBackState() {
      this.backToPrevState();
    },
    handleUpload(e) {
      this.uploadFile(e);
    }
  }
};
</script>
