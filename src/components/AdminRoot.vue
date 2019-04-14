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
      <v-toolbar app flat clipped-left>
        <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
        <v-toolbar-title>Admin</v-toolbar-title>
        <v-spacer></v-spacer>

        <v-toolbar-items>
          <v-menu offset-y :close-on-content-click="false" max-width="300" nudge-width="300" v-model="menu">
            <v-list-tile avatar align-center slot="activator">
              <v-avatar size="35" color="grey">
                <img src="../assets/logo.png" alt="alt">
              </v-avatar>
            </v-list-tile>
            <v-card>
              <v-list two-line>
                <v-list-tile avatar route :to="{name: 'profile'}" @click="menu = false">
                  <v-list-tile-avatar size="50" >
                    <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John">
                  </v-list-tile-avatar>

                  <v-list-tile-content >
                    <v-list-tile-title class="text-truncate">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum commodi blanditiis rem adipisci nulla aliquam ullam nesciunt cumque ipsa, vitae, optio repudiandae quis facere ratione aliquid quam architecto! Fuga, laudantium.</v-list-tile-title>
                    <v-list-tile-sub-title>
                     <v-chip dark color="primary" small>Outline</v-chip>
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
  data() {
    return {
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
