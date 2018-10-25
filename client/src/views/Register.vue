<template>
  <div class="text-center">
    <div class="container">
      <div class="row">
        <div class="col-md-6 offset-md-3">
          <form class="form-signin">
            <h1 class="h3 mb-3 font-weight-normal">Registro</h1>
            <div class="form-group">
              <label for="inputEmail" class="sr-only">Email</label>
              <input type="email" id="inputEmail" class="form-control" name="email" placeholder="Email" required autofocus>
            </div>
            <div class="form-group">
              <label for="inputEmail" class="sr-only">Nome</label>
              <input type="text" id="name" class="form-control" name="name" placeholder="Email" required autofocus>
            </div>
            <div class="form-group">
              <label for="inputPassword" class="sr-only">Password</label>
              <input type="password" id="inputPassword" class="form-control" name="password" placeholder="Password" required> 
            </div>
            <button class="btn btn-lg btn-primary btn-block" type="submit">Entrar</button>
            <p class="mt-5 mb-3 text-muted">&copy; 2017-2018</p>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
