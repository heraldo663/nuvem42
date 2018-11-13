<template>
  <div class="container">
    <Modal></Modal>
    <ViewType :viewList="viewList" @changeViewList="viewList = $event"></ViewType>
    <template v-if="viewList">
      <ListView></ListView>
    </template>
    <template v-else>
      <LargeIconsView></LargeIconsView>
    </template>
    <ProgressBar v-if="isUploading"></ProgressBar>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import LargeIconsView from "./LargeIconsView";
import ListView from "./ListView";

import Modal from "../components/Modal";
import ViewType from "../components/ViewType";
import ProgressBar from "../components/ProgressBar";

export default {
  data() {
    return {
      viewList: false
    };
  },
  components: {
    Modal,
    LargeIconsView,
    ListView,
    ViewType,
    ProgressBar
  },
  methods: {
    ...mapActions(["getAllRootbuckets", "getAllAssets", "addToPrevState"])
  },
  computed: {
    isUploading() {
      return this.$store.getters.isUploading;
    }
  },
  async created() {
    await this.getAllRootbuckets();
    await this.getAllAssets();
    await this.addToPrevState();
  }
};
</script>
