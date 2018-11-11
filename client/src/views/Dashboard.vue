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
      <Modal @newBucket="handleNewBucket" :rootBucketId="rootBucketId"></Modal>
    </div>
  </div>
</template>

<script>
import Modal from "../components/Modal";
import TableRowBucket from "../components/TableRowBucket";
import TableRowAssets from "../components/TableRowAssets";
export default {
  components: {
    Modal,
    TableRowBucket,
    TableRowAssets
  },
  data() {
    return {
      isRoot: true,
      buckets: [],
      assets: {},
      prevState: [],
      rootBucketId: "",
      file: {}
    };
  },
  methods: {
    async handleClickOnDirs(bucketId) {
      try {
        const resBucket = await this.axios.get(`/api/bucket/${bucketId}`);
        const resAsset = await this.axios.get(`/api/bucket/${bucketId}/assets`);

        this.buckets = resBucket.data;
        this.assets = resAsset.data;
        this.rootBucketId = bucketId;
        this.isRoot = false;
        this.prevState.push({
          buckets: this.buckets,
          assets: this.assets,
          rootBucketId: bucketId
        });
      } catch (error) {
        console.log(error);
      }
    },
    async handleDownload(urlLink, filename) {
      const file = await this.axios.get(urlLink, {
        method: "GET",
        responseType: "blob"
      });
      console.log(file);
      const url = window.URL.createObjectURL(file.data);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
    },

    handleBackState() {
      let { buckets, assets, rootBucketId } = this.prevState[
        this.prevState.length - 2
      ];
      this.buckets = buckets;
      this.assets = assets;
      this.rootBucketId = rootBucketId;
      this.prevState.pop();

      if (this.prevState.length === 1) {
        this.isRoot = true;
      }
    },
    handleNewBucket(e) {
      this.buckets.push(e);
    },
    async handleDeleteDirs(bucketId) {
      try {
        const res = await this.axios.delete(
          `http://nuvem42.ddns.net/api/bucket/${bucketId}`
        );
        if (res.data.success) {
          let filteredBuckets = this.buckets.filter(bucket => {
            if (bucket.id != bucketId) {
              return true;
            } else {
              return false;
            }
          });
          this.buckets = filteredBuckets;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async handleUpload(e) {
      this.file = e.target.files[0];
      const formData = new FormData();
      formData.append("file", this.file);

      const res = await this.axios.post(
        `/api/bucket/${this.rootBucketId}/assets/`,
        formData
      );

      this.assets.push(res.data);
    },
    async handleDeleteAssets(assetId) {
      this.axios.delete(`/api/bucket/${this.rootBucketId}/assets/${assetId}`);

      const filteredAssets = this.assets.filter(asset => {
        return asset.id !== assetId;
      });

      this.assets = filteredAssets;
    }
  },
  async created() {
    try {
      const resBucket = await this.axios.get("/api/bucket");
      this.buckets = resBucket.data.buckets;
      this.rootBucketId = resBucket.data.rootId;
      const resAsset = await this.axios.get(
        `/api/bucket/${this.rootBucketId}/assets`
      );
      this.assets = resAsset.data;
      this.prevState.push({
        buckets: this.buckets,
        assets: this.assets,
        rootBucketId: this.rootBucketId
      });
    } catch (error) {
      console.log("fail to get buckets");
    }
  }
};
</script>
