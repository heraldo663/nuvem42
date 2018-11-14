<template>
<nav class="navbar navbar-expand-lg navbar-light mb-5 bg-primary">
  <div class="container">
    <router-link class="navbar-brand" to="/" >Nuvem42</router-link> 
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
      <ul class="navbar-nav ml-auto mt-2 mt-lg-0">
        <li class="nav-item">
          <router-link class="nav-link" v-if="!isAuthenticated" to="/login">Entrar</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" v-if="!isAuthenticated" to="/register">Registrar-se</router-link>
        </li>
        <li class="nav-item">
          <a href="#" @click="logout"  v-if="isAuthenticated" class="nav-link">Sair</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
</template>

<script>
export default {
  name: "navbar",
  data() {
    return {
      isAuthenticated: false
    };
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$router.push("/login");
    },
    isLoggedIn() {
      let isLoggedin = !!(
        this.$store.getters.authToken || localStorage.getItem("authToken")
      );
      if (isLoggedin) {
        this.isAuthenticated = true;
      } else {
        this.isAuthenticated = false;
      }
    }
  },
  watch: {
    $route: function() {
      this.isLoggedIn();
    }
  },
  created() {
    this.isLoggedIn();
  }
};
</script>
