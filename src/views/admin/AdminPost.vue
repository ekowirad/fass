<template>
  <div class="admin-profile mt-5">
    <v-layout row wrap>
      <v-flex xs12 md2 class="text-xs-center pb-2">
        <v-avatar size="150" color="grey lighten-2">
          <v-icon size="130">person</v-icon>
        </v-avatar>
      </v-flex>

      <v-flex xs12 md10>
        <v-card flat>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-container py-0>
              <v-layout wrap>
                <v-flex xs12 md6>
                  <v-text-field :rules="rules.common" v-model="user.username" label="Username" />
                </v-flex>
                <v-flex xs12 md6>
                  <v-text-field :rules="rules.common" v-model="user.name" label="Nama Lengkap" />
                </v-flex>
                <v-flex xs12 md6>
                  <v-text-field
                    :rules="rules.email"
                    v-model="user.email"
                    label="Email"
                    class="purple-input"
                  />
                </v-flex>
                <v-flex xs12 md6>
                  <v-text-field
                    type="number"
                    :rules="rules.phone"
                    v-model="user.phone"
                    label="Nomor Handphone"
                  />
                </v-flex>
                <v-flex xs12 md6>
                  <v-text-field
                    type="password"
                    :rules="rules.password"
                    v-model="user.password"
                    label="Kata Sandi"
                    class="purple-input"
                  />
                </v-flex>
                <v-flex xs12 md6>
                  <v-text-field
                    type="password"
                    :rules="rules.password_confirm"
                    v-model="user.password_confirmation"
                    label="Ulang Kata Sandi"
                  />
                </v-flex>
                <v-flex xs12>
                  <v-textarea :rules="rules.common" v-model="user.address" label="Alamat" />
                </v-flex>
                <v-flex xs12>
                  <v-alert dismissible v-model="alert.show" :color="alert.color" :icon="alert.icon" outline>{{alert.msg}}</v-alert>
                </v-flex>
                <v-flex xs12 text-xs-right>
                  <v-btn
                    :loading="progress"
                    depressed
                    large
                    class="mx-0 font-weight-light"
                    @click="register"
                    color="success"
                  >Register</v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
export default {
  created() {},
  data() {
    return {
      progress: false,
      user: {},
      alert: {},
      headers: {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("api_token")}`
        }
      },
      rules: {
        common: [v => !!v || "Kolom ini tidak boleh kosong"],
        email: [
          v => !!v || "Kolom ini tidak boleh kosong",
          v => /.+@.+/.test(v) || "Email tidak valid"
        ],
        phone: [
          v => !!v || "Kolom ini tidak boleh kosong",
          v => (v && v.length <= 12) || "Maksimal 12 digit"
        ],
        password: [
          v => !!v || "Kolom ini tidak boleh kosong",
          v => (v && v.length >= 8) || "Minimal 8 karakter"
        ],
        password_confirm: [
          v => !!v || "Kolom ini tidak boleh kosong",
          v => v == this.user.password || "Password tidak sama"
        ]
      }
    };
  },
  methods: {
    alertCtrl(msg, color, icon, show) {
      this.alert.icon = icon;
      this.alert.color = color;
      this.alert.msg = msg;
      this.alert.show = show;
    },
    register() {
      if (this.$refs.form.validate()) {
        this.progress = true;
        this.$http
          .post("user", this.user, this.headers)
          .then(ress => {
            this.$refs.form.reset();
            this.$refs.form.resetValidation();
            this.progress = false;
            this.alertCtrl(
              "Admin berhasil ditambah",
              "success",
              "check_circle",
              true
            );
          })
          .catch(e => {
            this.progress = false;
            if (e.response.status == 422) {
            this.alertCtrl(
              "Username atau Email telah dipakai",
              "warning",
              "priority_high",
              true
            );
            }else {
            this.alertCtrl(
              "Mohon maaf Terjadi kesalahn server",
              "error",
              "warning",
              true
            );
            }
            console.log(e)
            console.log(e.response);
          });
      }
    }
  }
};
</script>

<style scoped>
.scale-up {
  transform: scale(2.5, 2.5);
}
</style>
