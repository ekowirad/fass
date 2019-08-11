<template>
  <div class="admin-profile">
    <v-layout row wrap>
      <v-flex xs12 md2 class="text-xs-center pb-2">
          <v-avatar  size="150" color="grey lighten-2">
            <v-icon size="130">person</v-icon>
          </v-avatar>
        <p class="mt-1">
          <v-chip dark :style="{ 'background-color': color}">{{position}}</v-chip>
        </p>
      </v-flex>

      <v-flex xs12 md10>
        <v-card>
          <v-form>
            <v-container py-0>
              <v-layout wrap>
                <v-flex xs12 md6>
                  <v-text-field v-model="user.username" label="Username" :disabled="edit"/>
                </v-flex>
                <v-flex xs12 md6>
                  <v-text-field v-model="user.name" label="Nama Lengkap" :disabled="edit"/>
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
                  <v-text-field v-model="user.phone" label="Nomor Handphone" :disabled="edit"/>
                </v-flex>
                <v-flex xs12>
                  <v-textarea v-model="user.address" label="Alamat" :disabled="edit"/>
                </v-flex>
                <v-flex xs12 text-xs-right>
                  <v-btn
                    class="mx-0 font-weight-light"
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
  </div>
</template>
<script>
export default {
  computed: {
    color() {
      return this.user.role == 2 ? "#D4AF37" : "#000";
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
    update() {
      this.edit = !this.edit;
      if (!this.edit) {
        this.editCaption = "Update Profil";
      } else {
        this.editCaption = "Ubah Profil";
        this.$http
          .put(`user/${this.user.id}`, {
            username: this.user.username,
            email: this.user.email,
            name: this.user.name,
            address: this.user.address,
            phone: this.user.phone
          }, this.headers)
          .then(ress => {
            console.log("user", ress.data);
          })
          .catch(e => {
            console.log("err", e.response);
          });
      }
    }
  }
};
</script>

<style scoped>
</style>
