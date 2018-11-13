<template>
  <div class="container">
    <Modal></Modal>
    <nav class="mb-3">
      <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
        <li class="nav-item">
          <a class="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home"
           :aria-selected="viewList" @click="viewList = false">Grid</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" id="pills-profile-tab" data-toggle="pill" href="#pills-profile" role="tab" aria-controls="pills-profile"
            :aria-selected="viewList" @click="viewList = true">Lista</a>
        </li>
      </ul>
    </nav>
    <template v-if="viewList">
      <ListView></ListView>
    </template>
    <template v-else>
      <LargeIconsView></LargeIconsView>
    </template>

  </div>
</template>

<script>
import { mapActions } from "vuex";
import Modal from "../components/Modal";
import LargeIconsView from "./LargeIconsView";
import ListView from "./ListView";
export default {
  data() {
    return {
      viewList: false
    };
  },
  components: {
    Modal,
    LargeIconsView,
    ListView
  },
  methods: {
    ...mapActions(["getAllRootbuckets", "getAllAssets", "addToPrevState"])
  },
  async created() {
    await this.getAllRootbuckets();
    await this.getAllAssets();
    await this.addToPrevState();
  }
};
</script>
