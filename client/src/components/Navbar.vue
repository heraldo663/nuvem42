<template>
<nav class="navbar navbar-expand-lg navbar-dark mb-5 bg-primary">
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <router-link class="navbar-brand" to="/" >FileServer</router-link> 

  <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
    <ul class="navbar-nav ml-auto mt-2 mt-lg-0">
      <li class="nav-item active">
        <router-link class="nav-link" to="/">Dashboard</router-link> <span class="sr-only">(current)</span>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" v-if="!isAuthenticated" to="/login">Login</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" v-if="!isAuthenticated" to="/register">Registro</router-link>
      </li>
      <li class="nav-item">
        <a href="#" @click="logout"  v-if="isAuthenticated" class="nav-link">Sair</a>
      </li>
    </ul>
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
    }
  },
  watch: {
    $route: function() {
      if (this.$store.getters.authToken) {
        this.isAuthenticated = true;
      } else {
        this.isAuthenticated = false;
      }
    }
  }
};
</script>
