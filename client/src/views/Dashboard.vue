<template>
  <div class="container">
    <Modal></Modal>
    <nav class="mb-3">
      <div class="nav nav-tabs" id="nav-tab" role="tablist">
        <a class="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" :aria-selected="viewList" @click="viewList = false">Grid</a>
        <a class="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" :aria-selected="viewList" @click="viewList = true" >Lista</a>
      </div>
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
  }
};
</script>
