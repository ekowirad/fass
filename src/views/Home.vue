<template>
  <div class="user-home">
    <div class="v-responsive">
      <v-flex xs12>
        <v-img src="https://source.unsplash.com/daily" height="600">
          <v-container style=" background-color: rgba(0, 0, 0, 0.705);" fill-height fluid>
            <v-layout class="text-xs-center" align-center row fill-height>
              <v-flex xs12>
                <span
                  class="display-1 white--text font-weight-thin"
                >Cari asisten rumah tangga, perawat bayi ataupun lansia?</span>
                <br />
                <span class="display-1 white--text font-weight-normal">Disni tempatnya</span>
                <p></p>
                <p>
                  <v-btn depressed large color="white" :to="{name: 'mitra'}">Lihat Mitra Kami</v-btn>
                </p>
              </v-flex>
            </v-layout>
          </v-container>
        </v-img>
      </v-flex>
    </div>
    <v-container grid-list-lg>
      <v-layout row wrap align-center>
        <v-flex xs12 md3 v-for="labor in labors.data" :key="labor.id">
          <v-hover>
            <v-card flat slot-scope="{ hover }" :class="`elevation-${hover ? 6 : 0}`">
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
              <v-chip small>{{jobs[labor.job_id-1].text}}</v-chip>
            </div>
            <v-list>
              <v-list-tile>
                <v-list-tile-action>
                  <v-icon>perm_identity</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>{{genders[labor.sex-1].text}} ({{labor.age}} thn)</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-action>
                  <v-icon>pin_drop</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-sub-title>Asal</v-list-tile-sub-title>
                  <v-list-tile-title>{{lowerCase(labor.birth_place)}}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
            <v-card-text>
              <v-layout justify-center align-center row wrap>
                <v-flex xs12 class="text-xs-right">
                  <v-spacer></v-spacer>
                  <div
                    class="font-weight-medium subheading indigo--text text--darken-4"
                  >Rp. {{formatPrice( labor.price_month)}}/ bulan</div>
                  <v-btn small outline round @click="detail(labor.id)" color="success">Selengkapnya</v-btn>
                </v-flex>
              </v-layout>
            </v-card-text>
          </v-card>
          </v-hover>
        </v-flex>
        <v-flex xs12 class="text-xs-right">
          <v-btn depressed outline color="primary" :to="{name: 'mitra'}">
            Tampilkan lebih banyak
            <v-icon right>keyboard_arrow_right</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      labors: {},
      jobs: [],
      genders: [{ text: "Perempuan", idx: 1 }, { text: "Laki-laki", idx: 2 }],
      apiUrl: [
        "provinces",
        "regencies",
        "districts",
        "ethnics",
        "statuses",
        "jobs"
      ]
    };
  },
  methods: {
    fetchLabor() {
      this.$http
        .get("mitras")
        .then(ress => {
          this.labors = ress.data;
          console.log(ress);
        })
        .catch(e => {
          console.log(e.response);
        });
    },
    getDataLib() {
      axios
        .all([
          this.dataLibReq(this.apiUrl[0]),
          this.dataLibReq(this.apiUrl[1]),
          this.dataLibReq(this.apiUrl[2]),
          this.dataLibReq(this.apiUrl[3]),
          this.dataLibReq(this.apiUrl[4]),
          this.dataLibReq(this.apiUrl[5])
        ])
        .then(
          axios.spread(
            (provinces, regencies, districts, ethnics, statuses, jobs) => {
              this.$store.commit("labor/SET_PROVINCES", provinces.data);
              this.$store.commit("labor/SET_REGENCIES", regencies.data);
              this.$store.commit("labor/SET_DISTRICTS", districts.data);
              this.$store.commit("labor/SET_ETHNICS", ethnics.data);
              this.$store.commit("labor/SET_STATUSES", statuses.data);
              this.$store.commit("labor/SET_JOBS", jobs.data);
            }
          )
        ).catch(e => {
          console.log('catch data lib failed: ',e.reponse)
        })
    },
    dataLibReq(url) {
      return this.$http.get(`data_lib/${url}`);
    },
    detail(id) {
      this.$router.push({ name: "mitra-det", params: { data: id } });
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(0).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    lowerCase(text) {
      let val = text.toLowerCase().trim();
      return val;
    }
  },
  created() {
    if (this.$store.getters["labor/jobs"].length != 0) {
      console.log("data lib has been filled, check vuex");
    } else {
      this.getDataLib();
    }
    this.fetchLabor();
    this.jobs = this.$store.getters["labor/jobs"];
  }
};
</script>

<style>
</style>
