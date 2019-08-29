<template>
  <div class="admin-profile">
    <v-layout row wrap>
      <v-flex xs12 md2 class="text-xs-center pb-2">
        <v-avatar size="150" color="grey lighten-2">
          <v-icon size="130">person</v-icon>
        </v-avatar>
        <p class="mt-1">
          <v-chip dark :style="{ 'background-color': color}">{{position}}</v-chip>
        </p>
      </v-flex>

      <v-flex xs12 md10>
        <v-card flat>
          <v-form>
            <v-container py-0>
              <v-layout wrap>
                <v-flex xs12 md6>
                  <v-text-field v-model="user.username" label="Username" disabled />
                </v-flex>
                <v-flex xs12 md6>
                  <v-text-field v-model="user.name" label="Nama Lengkap" :disabled="edit" />
                </v-flex>
                <v-flex xs12 md6>
                  <v-text-field
                    v-model="user.email"
                    label="Email"
                    class="purple-input"
                    :disabled="edit"
                  />
                </v-flex>
                <v-flex xs12 md6>
                  <v-text-field v-model="user.phone" label="Nomor Handphone" :disabled="edit" />
                </v-flex>
                <v-flex xs12>
                  <v-textarea v-model="user.address" label="Alamat" :disabled="edit" />
                </v-flex>
                <v-flex xs12>
                  <v-alert
                    v-model="alert.show"
                    :color="alert.color"
                    :icon="alert.icon"
                    dismissible
                    outline
                  >{{alert.msg}}</v-alert>
                </v-flex>
                <v-flex xs12 text-xs-right>
                  <v-btn
                    class="mx-0 font-weight-light"
                    large
                    depressed
                    color="success"
                    @click="update"
                  >{{editCaption}}</v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>
        </v-card>
      </v-flex>
    </v-layout>
    <v-dialog v-model="dialog" max-width="500">
      <v-card>
        <v-card-title class="title success--text">
          <v-icon color="success" left>info</v-icon>Konfirmasi Pengubahan
        </v-card-title>
        <v-card-text
          class="subheading"
        >Anda akan mengubah data admin ini. Apakah anda yakin untuk mengubah data admin ini?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-progress-circular size="25" v-show="progress" indeterminate width="2" color="primary"></v-progress-circular>
          <v-btn flat="flat" v-if="!progress" @click="dialog = false">Tidak</v-btn>
          <v-btn color="success" v-if="!progress" depressed dark @click="postUpdate">Ya</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  computed: {
    color() {
      return this.user.role == 2 ? "#D4AF37" : "#1a237e";
    },
    position() {
      return this.user.role == 2 ? "Master Admin" : "Admin";
    }
  },
  created() {
    if (this.$route.params.data == "current") {
      this.user = this.$store.getters["user/currentUser"];
    } else {
      this.user = this.$route.params.data;
      if (this.user.id != undefined) {
        this.$store.commit("user/SET_USER", this.user);
      } else {
        this.user = this.$store.getters["user/user"];
      }
    }
  },
  method: {},
  data() {
    return {
      alert: {},
      progress: false,
      dialog: false,
      edit: true,
      editCaption: "Ubah Profil",
      user: {},
      headers: {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("api_token")}`
        }
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
    update() {
      this.edit = !this.edit;
      if (!this.edit) {
        this.editCaption = "Update Profil";
      } else {
        this.editCaption = "Ubah Profil";
        this.dialog = true;
      }
    },
    postUpdate() {
      this.progress = true;
      this.$http
        .put(
          `user/${this.user.id}`,
          {
            username: this.user.username,
            email: this.user.email,
            name: this.user.name,
            address: this.user.address,
            phone: this.user.phone
          },
          this.headers
        )
        .then(ress => {
          this.dialog = false;
          this.progress = false;
          this.alertCtrl(
            "Data admin berhasil diubah",
            "success",
            "check_circle",
            true
          );
          console.log("user", ress.data);
        })
        .catch(e => {
          this.dialog = false;
          this.progress = false;
          if (e.response.status == 422) {
            this.alertCtrl(
              "Username atau Email telah dipakai",
              "warning",
              "priority_high",
              true
            );
          } else {
            this.alertCtrl(
              "Mohon maaf Terjadi kesalahn server",
              "error",
              "warning",
              true
            );
          }
          console.log("err", e.response);
        });
    }
  }
};
</script>

<style scoped>
</style>
