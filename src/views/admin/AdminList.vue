<template>
  <div class="admin-list">
    <v-layout row wrap>
      <v-flex xs12 text-xs-right>
        <v-btn depressed color="success" class="mb-2" :to="{name: 'admin-post'}">
          Admin Baru
          <v-icon right dark>add</v-icon>
        </v-btn>
      </v-flex>
    </v-layout>

    <v-card flat class="mb-2">
      <v-card-text>
        <v-layout class="black--text body-2" align-center row wrap>
          <v-flex xs4 px-2>
            <div class="subheading">Username</div>
          </v-flex>
          <v-flex xs4 px-2>
            <div class="subheading">Nama</div>
          </v-flex>
          <v-flex xs4 px-2>
            <div class="subheading">Email</div>
           </v-flex>
        </v-layout>
      </v-card-text>
    </v-card>

    <v-list>
      <template v-for="(user, index) in users">
        <v-hover :key="index">
          <v-list-tile slot-scope="{hover}">
            <v-layout class="black--text body-1" align-center row wrap>
              <v-flex xs4 px-2 class="font-weight-bold">{{user.username}}</v-flex>
              <v-flex xs4 px-2 class="text-truncate">{{user.name}}</v-flex>
              <v-flex xs4 px-2 class="text-truncate">{{user.email}}</v-flex>
              <v-expand-x-transition>
                <div v-if="hover" class="options--reveal black">
                  <v-btn flat icon dark :to="{name: 'admin-profile', params: {data: user}}">
                    <v-icon>create</v-icon>
                  </v-btn>
                  <v-btn flat icon dark @click.stop="delDialog(user)">
                    <v-icon>delete</v-icon>
                  </v-btn>
                </div>
              </v-expand-x-transition>
            </v-layout>
          </v-list-tile>
        </v-hover>
        <v-divider v-if="index + 1 < users.length" :key="`divider-${index}`"></v-divider>
      </template>
    </v-list>

    <v-dialog v-model="dialog" max-width="500">
      <v-card>
        <v-card-title class="title error--text">
          <v-icon color="error" left>warning</v-icon>Konfirmasi Penghapusan
        </v-card-title>
        <v-card-text
          class="subheading"
        >Anda tidak akan melihat lagi data ini. Apakah anda yakin untuk menghapus data ini?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-progress-circular size="25" v-show="progress" indeterminate width="2" color="primary"></v-progress-circular>
          <v-btn flat="flat" v-if="!progress" @click="dialog = false">Tidak</v-btn>
          <v-btn color="error" v-if="!progress" depressed dark @click="remove">Ya</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      progress: false,
      dialog: false,
      api_token: "",
      users: [],
      user: {},
      headers: {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("api_token")}`
        }
      }
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.$http
        .get("users", this.headers)
        .then(ress => {
          this.users = ress.data.data;
          console.log(this.users);
        })
        .catch(e => {
          console.log("error data: ", e.response);
        });
    },
    delDialog(user) {
      this.user = user;
      this.dialog = true;
    },
    remove() {
      this.progress = true;
      this.$http
        .delete(`user/${this.user.id}`, this.headers)
        .then(ress => {
          this.dialog = false;
          this.progress = false;
          this.fetchData();
        })
        .catch(e => {
          console.log("error:", e.response);
        });
    }
  }
};
</script>

<style scoped>
.options--reveal {
  align-items: center;
  position: absolute;
  right: 0;
  opacity: 0.6;
  height: 100%;
  white-space: nowrap;
}
</style>
