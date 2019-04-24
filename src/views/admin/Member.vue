<template>
  <div class="admin-home">
    <v-layout row wrap>
      <v-flex xs12 text-xs-right>
        <v-btn depressed color="success" class="mb-2">
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
          <v-list-tile slot-scope="{hover}" :to="{}">
            <v-layout class="black--text body-1" align-center row wrap>
              <v-flex xs4 px-2 class="font-weight-bold">{{user.username}}</v-flex>
              <v-flex xs4 px-2 class="text-truncate">{{user.name}}</v-flex>
              <v-flex xs4 px-2 class="text-truncate">{{user.email}}</v-flex>
              <v-expand-x-transition>
                <div v-if="hover" class="options--reveal primary">
                  <v-btn flat icon dark>
                    <v-icon>create</v-icon>
                  </v-btn>
                  <v-btn flat icon dark>
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

    <!-- </v-card>
    <v-hover v-for="(user, index) in users" :key="index">
      <v-card slot-scope="{ hover }" class="mx-auto" fill-height flat :to="{}">
        <v-layout justify-end align-center pa-2 row wrap>
          <v-flex xs4 px-2>{{user.username}}</v-flex>
          <v-flex xs4 px-2>{{user.name}}</v-flex>
          <v-flex xs4 px-2 class="text-truncate">{{user.address}}</v-flex>
          <v-expand-x-transition>
            <div v-if="hover" class="v-card--reveal d-flex orange display-1 white--text" xs12>
              <v-btn flat icon>
                <v-icon>star_border</v-icon>
              </v-btn>
              <v-btn flat icon>
                <v-icon>settings</v-icon>
              </v-btn>
              <v-btn flat icon>
                <v-icon>power</v-icon>
              </v-btn>
            </div>
          </v-expand-x-transition>
        </v-layout>
        <v-divider v-if="index + 1 < users.length" :key="`divider-${index}`"></v-divider>
    </v-card>-->
    <!-- </v-hover> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      api_token: "",
      users: [],
      user: {}
    };
  },
  created() {
    this.$http
      .get("users", {headers: {        
        'Authorization' : `Bearer ${window.localStorage.getItem('api_token')}`
      }})
      .then(ress => {
        this.users = ress.data.data;
        console.log(this.users);
      })
      .catch(e => {
        console.log("error data: ", e.response);
      });
  }
};
</script>

<style>
.options--reveal {
  align-items: center;
  position: absolute;
  right: 0;
  opacity: 0.6;
  height: 100%;
  white-space: nowrap;
}
</style>
