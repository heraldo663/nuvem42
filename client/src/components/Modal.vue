<template>
   <div class="modal" id="CreateDirModal">
    <div class="modal-dialog">
      <div class="modal-content">
      
        <!-- Modal Header -->
        <div class="modal-header">
          <h4 class="modal-title">Criar Pasta</h4>
          <button type="button" class="close" data-dismiss="modal">&times;</button>
        </div>
        
        <!-- Modal body -->
        <form @submit.prevent="handleCreateDir">
          <div class="modal-body">
              <div class="form-group">
                <label for="name">Nome da Pasta</label>
                <input type="text" name="name" v-model="name" class="form-control">
              </div>
          </div>
          
          <!-- Modal footer -->
          <div class="modal-footer">
            <input type="submit" class="btn btn-success" value="Criar">
          </div>
        </form>
        
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bucket: {},
      name
    };
  },
  methods: {
    handleSubmit() {
      this.$emit("newBucket", this.bucket);
    },
    async handleCreateDir() {
      try {
        const res = await this.axios.post("/api/bucket", { bucket: this.name });
        this.bucket = { ...res.data };
        this.handleSubmit();
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>
