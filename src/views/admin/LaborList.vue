<template>
  <div class="labor-list">
    <v-layout row wrap>
      <v-flex xs12 text-xs-right>
        <v-btn depressed color="success" class="mb-2" :to="{name: 'labor-post'}">
          <v-icon left dark>add</v-icon>Pekerja Baru
        </v-btn>
      </v-flex>
    </v-layout>
    <LaborFilter></LaborFilter>
    <v-container grid-list-lg>
      <v-layout row wrap align-center>
        <v-flex xs12 md3 v-for="(labor, index) in labors" :key="index">
          <template>
            <v-hover>
              <v-card slot-scope="{hover}" :class="`elevation-${hover ? 7 : 0}`">
                <v-expand-transition>
                  <v-toolbar v-if="hover" dense class="options--reveal primary">
                    <v-spacer></v-spacer>
                    <v-btn flat icon dark>
                      <v-icon>create</v-icon>
                    </v-btn>
                    <v-btn flat icon dark @click.stop="delDialog(user)">
                      <v-icon>delete</v-icon>
                    </v-btn>
                  </v-toolbar>
                </v-expand-transition>
                <v-responsive class="text-xs-center pt-2">
                  <v-avatar size="100" color="grey lighten-2">
                    <v-icon size="50">person</v-icon>
                  </v-avatar>
                </v-responsive>
                <div class="text-xs-center px-2 pt-2">
                  <div class="subheading font-weight-medium text-truncate">{{labor.name}}</div>
                  <div class="grey--text">ID: BYI001018329483</div>
                </div>
                <v-card-text >
                  <v-layout justify-center align-center row wrap>
                    <v-flex md3><v-icon>perm_identity</v-icon></v-flex>
                    <v-flex md9> Jenis Kelamin
                      <div class="font-weight-medium">Laki-laki</div>
                      </v-flex>
                    <v-flex md3><v-icon>calendar_today</v-icon></v-flex>
                    <v-flex md9> Umur
                      <div class="font-weight-medium">Laki-laki</div>
                      </v-flex>
                    <v-flex md3><v-icon>call</v-icon></v-flex>
                    <v-flex md9> No. Telepon
                      <div class="font-weight-medium">Laki-laki</div>
                      </v-flex>
                  </v-layout>
                </v-card-text>
                <v-footer color="amber lighten-1">
                  <v-layout row wrap>
                    <v-flex xs12 class="text-xs-center pa-2 white--text">Tersedia</v-flex>
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
import LaborFilter from './LaborFilter';
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
      filter: false
    };
  },
  created() {
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
    if (this.$route.name == "prt-list") {
    }
  },
  methods: {
    getLabor(id) {
      this.$http
        .get(`labors/${id}`, this.headers)
        .then(ress => {
          this.labors = ress.data.data;
          console.log(this.labors);
        })
        .catch(e => {
          console.log(e.response);
        });
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
