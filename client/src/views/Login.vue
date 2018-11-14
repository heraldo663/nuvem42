<template>
  <div class="text-center mt4">
    <div class="container">
      <div class="row">
        <div class="col-md-6 offset-md-3">
          <div class="alert alert-danger" role="alert" v-if="error">
            {{error.error}}
          </div>
          <form class="form-signin" @submit.prevent="onSubmit">
            <h1 class="h3 mb-3 font-weight-normal">Acessar</h1>
            <div class="form-group">
              <label for="inputEmail" class="sr-only">Email</label>
              <input type="email" id="inputEmail" v-model.trim.lazy="email" class="form-control" placeholder="Email" required autofocus>
            </div>
            <div class="form-group">
              <label for="inputPassword" class="sr-only">Password</label>
              <input type="password" id="inputPassword" v-model.trim.lazy="password" class="form-control" placeholder="Password" required> 
            </div>
            <div class="checkbox mb-3">
              <label>
                <input type="checkbox" value="remember-me" true-value=true
                  false-value=false v-model="rememberMe"> Lembre de mim
              </label>
            </div>
            <button class="btn btn-lg btn-primary btn-block" type="submit">Entrar</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import mapGetters from "vuex";
export default {
  data() {
    return {
      email: "",
      password: "",
      rememberMe: false
    };
  },
  name: "login",
  computed: {
    error() {
      return this.$store.getters.error;
    }
  },
  methods: {
    async onSubmit() {
      await this.$store.dispatch("login", {
        email: this.email,
        password: this.password,
        rememberMe: this.rememberMe
      });
      this.$router.push("/");
    }
  }
};
</script>
