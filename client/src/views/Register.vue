<template>
  <div class="text-center mt-4">
    <div class="container">
      <div class="row">
        <div class="col-md-6 offset-md-3">
           <div class="alert alert-danger" role="alert" v-if="error">
            {{error}}
          </div>
           <div class="alert alert-success" role="alert" v-if="success">
            Usuário registrando com sucesso
          </div>
          <form class="form-signin" @submit.prevent="onSubmit">
            <h1 class="h3 mb-3 font-weight-normal">Registro</h1>
            <div class="form-group">
              <label for="inputEmail" class="sr-only">Email</label>
              <input type="email" id="inputEmail" v-model="email" class="form-control" name="email" placeholder="Email" required autofocus>
            </div>
            <div class="form-group">
              <label for="inputEmail" class="sr-only">Nome</label>
              <input type="text" id="name" v-model="name" class="form-control" name="name" placeholder="Nome" required autofocus>
            </div>
            <div class="form-group">
              <label for="inputPassword" class="sr-only">Password</label>
              <input type="password" v-model="password" id="inputPassword" class="form-control" name="password" placeholder="Password" required> 
            </div>
            <button class="btn btn-lg btn-primary btn-block" type="submit">Enviar</button>
            <p class="mt-5 mb-3 text-muted">&copy; 2017-2018</p>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      name: "",
      error: "",
      success: false
    };
  },
  name: "register",
  methods: {
    async onSubmit() {
      try {
        await this.axios.post("/api/auth/register", {
          email: this.email,
          password: this.password,
          username: this.name
        });
        this.$router.push("/login");
      } catch (error) {
        this.error = error.response.data.error;
        setTimeout(() => {
          this.error = "";
        }, 3500);
      }
    }
  }
};
</script>
