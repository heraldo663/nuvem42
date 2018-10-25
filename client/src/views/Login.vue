<template>
  <div class="text-center">
    <div class="container">
      <div class="row">
        <div class="col-md-6 offset-md-3">
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
// @ is an alias to /src

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
      if (this.email && this.password) {
        return true;
      }

      this.errors = [];

      if (!this.name) {
        this.errors.push("Name required.");
      }
      if (!this.age) {
        this.errors.push("Age required.");
      }
    }
  }
};
</script>

<style scoped>
</style>
