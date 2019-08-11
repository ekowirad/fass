<template>
  <div class="labor-list">
    <!-- <v-layout row wrap>
      <v-flex xs12 text-xs-right>
        <v-btn depressed color="success" class="mb-2" :to="{name: 'labor-post'}">
          <v-icon left dark>add</v-icon>Pekerja Baru
        </v-btn>
      </v-flex>
    </v-layout> -->
    <LaborFilter></LaborFilter>
    <v-container grid-list-lg>
      <v-layout row wrap align-center>
        <v-flex xs12 md3 v-for="(labor, index) in labors.data" :key="index">
          <template>
            <v-hover>
              <v-card slot-scope="{hover}" :class="`elevation-${hover ? 7 : 0}`">
                <v-expand-transition>
                  <v-toolbar v-if="hover" dense class="options--reveal black">
                    <v-spacer></v-spacer>
                    <v-btn flat icon dark @click="laborEdit(labor.id)">
                      <v-icon>create</v-icon>
                    </v-btn>
                    <v-btn flat icon dark @click.stop="delDialog(user)">
                      <v-icon>list_alt</v-icon>
                    </v-btn>
                  </v-toolbar>
                </v-expand-transition>
                <v-responsive class="text-xs-center pt-2">
                  <v-avatar size="100" class="grey lighten-2" style="overflow:hidden">
                    <img
                      style="width:auto; border-radius:0"
                      :src="labor.profile_pic.url"
                      v-if="labor.profile_pic != null"
                      alt
                    />
                    <v-icon v-else size="50">person</v-icon>
                  </v-avatar>
                </v-responsive>
                <div class="text-xs-center px-2 pt-2">
                  <div class="subheading font-weight-medium text-truncate">{{labor.name}}</div>
                  <div class="grey--text">ID: {{labor.register_id}}</div>
                </div>
                <v-card-text>
                  <v-layout justify-center align-center row wrap>
                    <v-flex md3>
                      <v-icon>perm_identity</v-icon>
                    </v-flex>
                    <v-flex md9>
                      Jenis Kelamin
                      <div class="font-weight-medium">{{getGender(labor.sex)}}</div>
                    </v-flex>
                    <v-flex md3>
                      <v-icon>calendar_today</v-icon>
                    </v-flex>
                    <v-flex md9>
                      Umur
                      <div class="font-weight-medium">{{labor.age}}</div>
                    </v-flex>
                    <v-flex md3>
                      <v-icon>call</v-icon>
                    </v-flex>
                    <v-flex md9>
                      No. Telepon
                      <div class="font-weight-medium">{{labor.handphone}}</div>
                    </v-flex>
                  </v-layout>
                </v-card-text>
                <v-footer :color="statusColor(labor.status)">
                  <v-layout row wrap>
                    <v-flex xs12 class="text-xs-center pa-2 white--text">{{getStatus(labor.status)}}</v-flex>
                  </v-layout>
                </v-footer>
              </v-card>
            </v-hover>
          </template>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import LaborFilter from "./LaborFilter"
export default {
  components: {
    LaborFilter
  },
  data() {
    return {
      headers: {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("api_token")}`
        }
      },
      labors: [],
      filter: false,
      status: ["Tidak diketahui", "Tersedia", "Sedang Bekerja", "Tidak Aktif"],
      status_color: ["primary", "success", "warning", "error"],
      gender: ["Tidak diketahui", "Perempuan", "Laki-laki"]
    };
  },
  created() {
    this.showLabor();
  },
  methods: {
    statusColor(id) {
      return this.status_color[id];
    },
    getStatus(status) {
      return this.status[status];
    },
    getGender(id) {
      return this.gender[id];
    },
    getLabor(id) {
      this.$http
        .get(`labors/${id}`, this.headers)
        .then(ress => {
          this.labors = ress.data;
          console.log(this.labors);
        })
        .catch(e => {
          console.log(e.response);
        });
    },
    showLabor() {
      switch (this.$route.name) {
        case "prt-list":
          this.getLabor(1);
          break;
        case "babysitter-list":
          this.getLabor(2);
          break;
        case "caregiver-list":
          this.getLabor(3);
          break;

        default:
          break;
      }
    },
    laborEdit(id) {
      switch (this.$route.name) {
        case "prt-list":
          this.$router.push({ name: "prt-edit", params: {data:id }});
          break;
        case "babysitter-list":
          this.$router.push({ name: "babysitter-edit", params: {data:id }});
          break;
        case "caregiver-list":
          this.$router.push({ name: "caregiver-edit", params: {data:id }});
          break;

        default:
          break;
      }
    }
  }
};
</script>

<style scoped>
.options--reveal {
  align-items: center;
  top: 0;
  z-index: 1;
  justify-content: center;
  opacity: 0.7;
  position: absolute;
  width: 100%;
}
</style>
