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
        <div class="modal-body">
          <form>
            <div class="form-group">
              <label for="name">Nome da Pasta</label>
              <input type="text" name="name" class="form-control">
              <input type="submit" class="btn btn-success" value="Criar">
            </div>
          </form>
        </div>
        
        <!-- Modal footer
        <div class="modal-footer">
          <button type="button" class="btn btn-danger" data-dismiss="modal">Fechar</button>
        </div> -->
        
      </div>
    </div>
  </div>
</template>
