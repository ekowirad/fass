<template>
  <div class="admin-list">
    <v-layout row wrap>
      <v-flex xs12 text-xs-right>
        <v-btn depressed color="success" class="mb-2" :to="{name: 'admin-post'}">
          <v-icon left dark>add</v-icon>Admin Baru
        </v-btn>
      </v-flex>
    </v-layout>

    <v-card>
      <v-layout class="black--text body-2" align-center row wrap>
        <v-flex xs4>
          <v-btn flat class="text-xs-right">Username</v-btn>
        </v-flex>
        <v-flex xs4>
          <v-btn flat>Nama</v-btn>
        </v-flex>
        <v-flex xs4>
          <v-btn flat>Email</v-btn>
        </v-flex>
      </v-layout>
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
                <div v-if="hover" class="options--reveal primary">
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

    <v-dialog v-model="dialog" max-width="300">
      <v-card>
        <v-card-title class="headline">Konfirmasi Penghapusan</v-card-title>
        <v-card-text>Apakah anda yakin untuk menghapus data ini?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat="flat" @click="dialog = false">Tidak</v-btn>
          <v-btn color="error" depressed dark @click="remove">Ya</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
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
    delDialog(user){
      this.user = user;
      this.dialog = true;
    },
    remove() {
      // console.log("del user", this.user.name)
      this.$http
        .delete(`user/${this.user.id}`, this.headers)
        .then(ress => {
          this.dialog = false;
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
