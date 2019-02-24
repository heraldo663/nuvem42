<template>
  <v-toolbar
    app
    color="primary"
  >
    <v-toolbar-title class="headline">
      <span class="white--text">Nuvem42</span>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items
      hidden-sm-and-down
      class="hidden-sm-and-down"
    >
      <v-btn
        flat
        to="/login"
        dark
        v-if="!isAuthenticated"
      >Entrar</v-btn>
      <v-btn
        flat
        dark
        @click="logout"
        v-if="isAuthenticated"
      > Sair</v-btn>
    </v-toolbar-items>
  </v-toolbar>
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
