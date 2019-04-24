<template>
  <div class="admin-root">
    <v-app>
      <v-navigation-drawer app v-model="drawer" clipped>
        <v-list>
          <v-list-tile v-for="item in items" :key="item.title" route :to="{name: item.route}">
            <v-list-tile-action>
              <v-icon>{{item.icon}}</v-icon>
            </v-list-tile-action>
            <v-list-tile-title>{{item.title}}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>
      <v-toolbar app flat dark clipped-left color="primary">
        <v-toolbar-side-icon @click="drawer = !drawer">
        </v-toolbar-side-icon>
        <v-toolbar-title class="font-weight-light" >Yayasan <span class="font-weight-medium"> Kasih Keluarga</span></v-toolbar-title>
        <v-spacer></v-spacer>

        <v-toolbar-items>
          <v-menu offset-y :close-on-content-click="false" max-width="300" nudge-width="300" v-model="menu">
            <v-list-tile avatar align-center slot="activator">
              <v-avatar size="35" color="grey lighten-2">
                    <v-icon size="30">person</v-icon>
              </v-avatar>
            </v-list-tile>
            <v-card>
              <v-list two-line>
                <v-list-tile avatar route :to="{name: 'profile'}" @click="menu = false">
                  <v-list-tile-avatar size="50" color="grey lighten-2">
                    <v-icon size="45">person</v-icon>
                  </v-list-tile-avatar>

                  <v-list-tile-content >
                    <v-list-tile-title class="text-truncate ml-2">{{user.name}}</v-list-tile-title>
                    <v-list-tile-sub-title>
                     <v-chip dark :style="{ 'background-color': color}" small>{{position}}</v-chip>
                    </v-list-tile-sub-title>
                    
                  </v-list-tile-content>
                </v-list-tile>
              </v-list>

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" flat>
                  Keluar
                  <v-icon right>exit_to_app</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-menu>
        </v-toolbar-items>
      </v-toolbar>

      <v-content>
        <v-container fluid>
          <router-view></router-view>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script>
export default {
  computed:{
    color(){
      return this.user.role == 2 ? '#D4AF37' : '#000'
    },
    position(){
      return this.user.role == 2 ? 'Master Admin' : 'Admin'
    }
  },
  created(){
    this.user = this.$store.getters['user/user'];
  },
  data() {
    return {
      admin: '#033',
      user: {},
      drawer: null,
      menu: false,
      items: [
        { title: "Dashboard", icon: "dashboard", route: "dashboard" },
        { title: "Member", icon: "question_answer", route: "member" }
      ]
    };
  }
};
</script>

<style>
</style>
