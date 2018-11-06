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
          </tr>
        </thead>
        <tbody>
          <tr v-for="(bucket) in buckets" :key="bucket.id">
            <td>
              <a href="#" v-on:click.prevent="handleClickOnDirs(bucket.id)"> <i class="fas fa-folder fa-lg"></i> {{bucket.bucket}}</a>
            </td>
          </tr>
          <tr v-for="(asset) in assets" :key="asset.id">
            <td>
              <a href="#" v-on:click.prevent="handleDownload(asset.url, asset.name)" > <i class="fas fa-file fa-lg text-info"></i> {{asset.name}}</a>
              <a id="target" style="display: none"></a>
            </td>
          </tr>
          <tr>
            <td>
              <button class="btn btn-info mr-4" data-toggle="modal" data-target="#CreateDirModal"> <i class="fas fa-plus fa-lg mr-2"></i>Adicionar Pasta</button> 
              
              <button class="btn btn-warning"><i class="fas fa-upload fa-lg mr-2"></i>Upload</button></td>
          </tr>
        </tbody>
      </table>
      <Modal></Modal>
    </div>
  </div>
</template>

<script>
import Modal from "../components/Modal";
export default {
  components: {
    Modal
  },
  data() {
    return {
      isRoot: true,
      buckets: {},
      assets: {},
      prevState: []
    };
  },
  methods: {
    async handleClickOnDirs(bucketId) {
      try {
        const resBucket = await this.axios.get(`/api/bucket/${bucketId}`);
        const resAsset = await this.axios.get(`/api/bucket/${bucketId}/assets`);

        this.buckets = resBucket.data;
        this.assets = resAsset.data;
        this.isRoot = false;
        this.prevState.push({ buckets: this.buckets, assets: this.assets });
      } catch (error) {
        console.log(error);
      }
    },
    async handleDownload(urlLink, filename) {
      const file = await this.axios.get(urlLink, {
        method: "GET",
        responseType: "blob"
      });
      const url = window.URL.createObjectURL(new Blob([file.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
    },
    async handleCreateDir() {
      try {
        const res = this.axios.post("/api/bucket");
        this.bucket = { ...res.data };
      } catch (error) {
        console.log(error);
      }
    },
    handleBackState() {
      let { buckets, assets } = this.prevState[this.prevState.length - 2];
      this.buckets = buckets;
      this.assets = assets;
      this.prevState.pop();

      if (this.prevState.length === 1) {
        this.isRoot = true;
      }
    }
  },
  async created() {
    try {
      const res = await this.axios.get("/api/bucket");
      this.buckets = res.data;
      this.prevState.push({ buckets: this.buckets, assets: {} });
    } catch (error) {
      console.log("fail to get buckets");
    }
  }
};
</script>
