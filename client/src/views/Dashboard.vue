<template>
  <div class="container">
    <div class="row">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th scope="col">
              <small @click="handleBackState" v-if="!isRoot">
                <i class="fas fa-arrow-circle-left fa-lg mr-3 text-primary"></i>
              </small>Arquivos
            </th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(bucket) in buckets" :key="bucket.id">
            <td>
              <a href="#" @click.prevent="handleClickOnDirs(bucket.id)"> <i class="fas fa-folder fa-lg"></i>
                {{bucket.bucket}}</a>
            </td>
            <td>
              <a href="#" @click.prevent="handleDeleteDirs(bucket.id)"><i class="fas fa-trash-alt text-danger"></i></a>
            </td>
          </tr>
          <tr v-for="(asset, index) in assets" :key="index+999">
            <td>
              <a href="#" @click.prevent="handleDownload(asset.url, asset.name)"> <i class="fas fa-file fa-lg text-info"></i>
                {{asset.name}}</a>
              <a id="target" style="display: none"></a>
            </td>
            <td>
              <a href="#" @click.prevent="handleDeleteAssets(asset.id)"><i class="fas fa-trash-alt text-danger"></i></a>
            </td>
          </tr>
          <tr>
            <td class="d-sm-flex justify-content-start">
              <button class="btn btn-info mr-4" data-toggle="modal" data-target="#CreateDirModal"> <i class="fas fa-plus fa-lg mr-2"></i>Adicionar
                Pasta</button>
              <div class="custom-file">
                <input type="file" v-on:change="handleUpload" style="display: none" id="customFile">
                <label class="btn btn-warning" for="customFile"><i class="fas fa-upload mr-2"></i>Upload</label>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <Modal></Modal>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Modal from "../components/Modal";
export default {
  components: {
    Modal
  },
  computed: {
    ...mapGetters(["buckets", "rootBucketId", "isRoot", "assets"])
  },
  methods: {
    ...mapActions([
      "getAllRootbuckets",
      "getAllAssets",
      "addToPrevState",
      "getAllBuckets",
      "backToPrevState",
      "downloadFile",
      "deleteDirs",
      "uploadFile",
      "deleteAssets"
    ]),
    async handleClickOnDirs(bucketId) {
      await this.getAllBuckets(bucketId);
      await this.getAllAssets();
      await this.addToPrevState();
    },
    handleBackState() {
      this.backToPrevState();
    },
    handleDownload(urlLink, filename) {
      this.downloadFile({
        urlLink,
        filename
      });
    },
    handleDeleteDirs(bucketId) {
      this.deleteDirs(bucketId);
    },
    handleUpload(e) {
      this.uploadFile(e);
    },
    handleDeleteAssets(assetId) {
      this.deleteAssets(assetId);
    }
  },
  async created() {
    await this.getAllRootbuckets();
    await this.getAllAssets();
    await this.addToPrevState();
  }
};
</script>
