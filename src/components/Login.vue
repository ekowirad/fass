<template>
  <div class="login">
    <img id="img-bg" src="https://source.unsplash.com/daily">
    <div id="img-bg1"></div>
    <v-app>
      <v-content>
        <v-container fluid fill-height>
          <v-layout align-center justify-end row wrap>
            <v-flex xs12 md8 hidden-sm-and-down>
              <h1
                class="display-3 font-weight-thin white--text"
                id="title-action"
              >Hai Administrator,</h1>
              <h1 class="display-1 font-weight-medium white--text" id="title-action1">Selamat Datang</h1>
            </v-flex>
            <v-flex xs12 md3>
              <v-card min-height="550">
                <v-container fluid class="text-xs-center">
                  <v-avatar size="140" color="grey lighten-2" class="ma-2">
                    <v-icon size="120">person</v-icon>
                  </v-avatar>
                  <v-form ref="form">
                    <v-text-field
                      v-model="login"
                      :rules="vLogin"
                      label="Username / Email"
                      class="purple-input"
                    />
                    <v-text-field
                      v-model="password"
                      :rules="vPassword"
                      type="password"
                      label="Password"
                      class="purple-input"
                    />
                    <v-footer color="white" absolute height="100">
                      <v-layout col wrap class="pa-3 mb-5">
                        <!-- <v-flex xs12>
                          <v-btn block @click="attempt" color="success">Masuk</v-btn>
                        </v-flex>-->
                        <v-flex xs12>
                          <v-progress-circular
                            size="20"
                            width="2"
                            v-show="loadShow"
                            hidden="true"
                            indeterminate
                            color="primary"
                          ></v-progress-circular>
                          <span v-show="errShow" class="caption red--text text--darken-1">{{errMsg}}</span>
                          <v-btn block @click="attempt" color="success">Masuk</v-btn>
                        </v-flex>
                      </v-layout>
                    </v-footer>
                  </v-form>
                </v-container>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      loadShow: false,
      errShow: false,
      user: {},
      errMsg: "",
      login: "",
      vLogin: [v => !!v || "Username / Email field required"],
      password: "",
      vPassword: [v => !!v || "Password field required"]
    };
  },
  created(){
    
  },
  methods: {
    attempt() {
      if (this.$refs.form.validate()) {
        this.errShow = false;
        this.loadShow = true;
        this.$http
          .post("login", {
            login: this.login,
            password: this.password
          })
          .then(ress => {
            this.$store.commit("user/SET_CURRENT_USER", ress.data);
            window.localStorage.setItem('api_token', ress.data.api_token)
            this.$router.push({ name: "dashboard" });
            this.user = this.loadShow = false;
          })
          .catch(e => {
            this.errShow = true;
            this.loadShow = false;
            console.log(e);
            if (e.response.status == 401) {
              this.errMsg = "Cek kembali email, username, dan password";
            }
            // else if (e.response.status == 500) {
            //   this.errMsg =
            //     "kesalahan pada server, silahkan coba beberapa saat lagi";
            // }
            // this.errMsg = e.response.
            // this.errMsg = e.response.
          });
      }
    }
  }
};
</script>

<style scoped>
#title-action {
  opacity: 0;
  animation: appear-text 0.5s forwards;
  animation-delay: 0.5s;
}
#title-action1 {
  opacity: 0;
  animation: appear-text 0.5s forwards;
  animation-delay: 0.7s;
}

@keyframes appear-text {
  0% {
    opacity: 0;
    transform: translateX(80px) translateY(0px);
  }

  100% {
    opacity: 1;
    transform: translateX(0px) translateY(0px);
  }
}
#img-bg {
  position: fixed;
  top: 50%;
  left: 0;
  margin: auto;
  text-align: center;
  min-width: 100%;
  transform: translateY(-50%);
  min-height: auto;
}
#img-bg1 {
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.705);
  width: 100%;
  height: 100%;
}
</style>

