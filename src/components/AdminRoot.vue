<template>
  <div class="admin-root">
    <v-app style=" background:#F5F5F5;">
      <v-navigation-drawer app v-model="drawer">
        <v-list>
          <v-list-tile v-for="item in items" :key="item.title" route :to="{name: item.route}">
            <v-list-tile-action>
              <v-icon>{{item.icon}}</v-icon>
            </v-list-tile-action>
            <v-list-tile-title>{{item.title}}</v-list-tile-title>
          </v-list-tile>

          <v-list-group prepend-icon="account_box">
            <template v-slot:activator>
              <v-list-tile>
                <v-list-tile-title>Pekerja</v-list-tile-title>
              </v-list-tile>
            </template>
            <v-list-tile v-for="item in labors" :key="item.title" route :to="{name: item.route}">
              <v-list-tile-action>
                <v-icon>{{item.icon}}</v-icon>
              </v-list-tile-action>
              <v-list-tile-title>{{item.title}}</v-list-tile-title>
            </v-list-tile>
          </v-list-group>
        </v-list>
      </v-navigation-drawer>

      <v-content>
        <v-toolbar flat style="background: transparent;">
          <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
          <v-toolbar-title class="font-weight-light headline">
            Yayasan
            <span class="font-weight-medium">Kasih Keluarga</span>
          </v-toolbar-title>
          <v-spacer></v-spacer>

          <v-toolbar-items>
            <v-menu
              offset-y
              :close-on-content-click="false"
              max-width="300"
              nudge-width="300"
              v-model="menu"
            >
              <v-list-tile avatar align-center slot="activator">
                <v-avatar size="35" color="grey lighten-2">
                  <v-icon size="30">person</v-icon>
                </v-avatar>
              </v-list-tile>
              <v-card>
                <v-list two-line>
                  <v-list-tile
                    avatar
                    route
                    :to="{name: 'admin-profile', params: {data: 'current'}}"
                    @click="menu = false"
                  >
                    <v-list-tile-avatar size="50" color="grey lighten-2">
                      <v-icon size="45">person</v-icon>
                    </v-list-tile-avatar>

                    <v-list-tile-content>
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
                  <v-btn color="primary" flat @click="logout()">
                    Keluar
                    <v-icon right>exit_to_app</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-menu>
          </v-toolbar-items>
        </v-toolbar>
        <v-container fluid>
          <router-view></router-view>
        </v-container>
      </v-content>
    </v-app>
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
    this.user = this.$store.getters["user/currentUser"];
  },
  methods: {
    logout() {
      this.$http
        .post("logout")
        .then(ress => {
          window.localStorage.clear()
          this.$router.push({ name: "login" })
          // this.$store.commit("labor/RESET_STATE_OBJ", "revenue")
        })
        .catch(e => {
          console.log("error logout", e.response);
        });
    }
  },
  data() {
    return {
      admin: "#033",
      user: {},
      drawer: null,
      menu: false,
      items: [
        { title: "Dashboard", icon: "dashboard", route: "dashboard" },
        // { title: "Admin", icon: "supervisor_account", route: "admin-list" },
        {
          title: "Pesanan",
          icon: "all_inbox",
          route: "order-list"
        },
        {
          title: "Pemasukan dan Pengeluaran",
          icon: "swap_horiz",
          route: "income-expense"
        },
        { title: "Laporan", icon: "assessment", route: "report" }
      ],
      labors: [
        {
          title: "Registrasi",
          icon: "add_box",
          route: "labor-post"
        },
        {
          title: "Pengasuh Bayi",
          icon: "child_friendly",
          route: "babysitter-list"
        },
        {
          title: "Pengasuh Lansia",
          icon: "accessible",
          route: "caregiver-list"
        },
        {
          title: "Pekerja Rumah Tangga",
          icon: "accessibility_new",
          route: "prt-list"
        }
      ]
    };
  }
};
</script>

<style>
</style>
