<template>
  <div class="text-center">
    <div class="container">
      <div class="row">
        <div class="col-md-6 offset-md-3">
          <div class="alert alert-danger" role="alert" v-for="(error, index) in errors" :key="index">
            {{error}}
          </div>
          <form class="form-signin" @submit.prevent="onSubmit">
            <h1 class="h3 mb-3 font-weight-normal">Login</h1>
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
  false-value=false v-model="rememberMe"> Remember me
              </label>
            </div>
            <button class="btn btn-lg btn-primary btn-block" type="submit">Entrar</button>
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
      rememberMe: false,
      errors: []
    };
  },
  name: "login",
  methods: {
    onSubmit() {
      this.$store.dispatch("login", {
        email: this.email,
        password: this.password,
        rememberMe: this.rememberMe
      });
      this.errors = this.$store.getters.errors;
      if (this.errors.length == 0) this.$router.push("/");
    },
    cleanErrors() {
      this.$store.dispatch("cleanErrors");
      this.errors.pop();
    }
  },
  created() {
    this.interval = setInterval(() => this.cleanErrors(), 4000);
  }
};
</script>

<style scoped>
</style>
