<template>
  <v-container>
    <v-layout
      align-center
      justify-center
      row
      fill-height
    >

      <v-flex
        md6
        sm8
        xs11
      >
        <v-card class="elevation-12">
          <v-alert
            :value="!!error"
            type="warning"
          >
            {{error.error}}
          </v-alert>

          <v-toolbar
            dark
            color="primary"
          >
            <v-toolbar-title>Entrar</v-toolbar-title>
            <v-spacer></v-spacer>

          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
                prepend-icon="person"
                name="login"
                label="E-mail"
                type="text"
                v-model="email"
              ></v-text-field>
              <v-text-field
                id="password"
                prepend-icon="lock"
                name="password"
                label="Senha"
                type="password"
                v-model="password"
              ></v-text-field>
              <v-checkbox
                :label="`Lembre-se`"
                color="primary"
                v-model="checkbox"
                true-value=true
                false-value=false
              ></v-checkbox>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-layout
              align-center
              justify-center
              row
            >
              <v-btn
                @click="onSubmit"
                color="primary"
              >Acessar</v-btn>
            </v-layout>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
  <!-- <div class="text-center mt4">
    <div class="container">
      <div class="row">
        <div class="col-md-6 offset-md-3">
          <div
            class="alert alert-danger"
            role="alert"
            v-if="error"
          >
            {{error.error}}
          </div>
          <form
            class="form-signin"
            @submit.prevent="onSubmit"
          >
            <h1 class="h3 mb-3 font-weight-normal">Entrar</h1>
            <div class="form-group">
              <label
                for="inputEmail"
                class="sr-only"
              >Email</label>
              <input
                type="email"
                id="inputEmail"
                v-model.trim.lazy="email"
                class="form-control"
                placeholder="E-mail"
                required
                autofocus
              >
            </div>
            <div class="form-group">
              <label
                for="inputPassword"
                class="sr-only"
              >Senha</label>
              <input
                type="password"
                id="inputPassword"
                v-model.trim.lazy="password"
                class="form-control"
                placeholder="Senha"
                required
              >
            </div>
            <div class="checkbox mb-3">
              <label>
                <input
                  type="checkbox"
                  value="remember-me"
                  true-value=true
                  false-value=false
                  v-model="rememberMe"
                > Lembre-se
              </label>
            </div>
            <button
              class="btn btn-lg btn-primary btn-block"
              type="submit"
            >Acessar</button>
          </form>
        </div>
      </div>
    </div>
  </div> -->
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
