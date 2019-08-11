<template>
  <div class="admin-about">
    <v-container fluid grid-list-lg>
      <v-layout row wrap align-center>
        <!-- <v-flex xs5 class="mb-5">
          <v-card flat >
            <v-card-text>
              <blockquote class="blockquote">
              Tekan tombol dibawah untuk memulai bekerja agar semua aktifitas transaksi dapat diarsipkan pada database
              </blockquote>

              <v-btn block depressed large color="success">Mulai Bekerja</v-btn>
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs7 class="mb-5">
          <v-card flat color="transparent">
            <v-card-text>              
              <div >{{date}}</div>
            <div class="display-1">Hai, <span class="font-weight-medium">{{user.username}}!</span></div>
            <div class="headline font-weight-light">Apa yang mau dikerjakan hari ini?</div>
            </v-card-text>
          </v-card>
        </v-flex>-->
        <v-flex xs4>
          <v-card tile flat height="150">
            <v-card-title class="subheading">
              <v-icon left>accessibility_new</v-icon>Pekerja Rumah Tangga
            </v-card-title>
            <v-card-text class="display-3">{{prts.size}}</v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs4>
          <v-card tile flat height="150">
            <v-card-title class="subheading">
              <v-icon left>accessible</v-icon>Pengasuh Lansia
            </v-card-title>
            <v-card-text class="display-3">{{caregivers.size}}</v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs4>
          <v-card tile flat height="150">
            <v-card-title class="subheading">
              <v-icon left>child_friendly</v-icon>Pengasuh Bayi
            </v-card-title>
            <v-card-text class="display-3">{{babysitters.size}}</v-card-text>
          </v-card>
        </v-flex>
      </v-layout>

      <v-layout row wrap>
        <v-flex xs6>
          <v-card>
            <v-card-text>
              <v-list>
                <v-list-tile v-for="labor in labors.data" :key="labor.id">
                  <v-list-tile-content>
                    <v-list-tile-title>{{labor.name}}</v-list-tile-title>
                  </v-list-tile-content>
                  <v-list-tile-action>{{jobs[labor.job_id-1].text}}</v-list-tile-action>
                </v-list-tile>
              </v-list>
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs6>
          <v-card>
            <v-card-text>
              <v-list>
                <v-list-tile v-for="order in orders" :key="order.id">
                  <v-list-tile-content>
                    <v-list-tile-title>{{order.name}}</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
export default {
  data() {
    return {
      labors: {},
      prts: {},
      user: {},
      jobs: [],
      orders: [],
      date: "",
      caregivers: {},
      babysitters: {},
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("api_token")}`
      }
    };
  },
  methods: {
    fetchAllLabor() {
      return this.$http.get("mitras");
    },
    fetchLabor(id) {
      return this.$http.get(`labors/${id}`, {
        params: { type: "size" },
        headers: this.headers
      });
    },
    fetchOrder() {
      return this.$http.get(`orders`, { headers: this.headers });
    },
    getLaborData() {
      axios
        .all([
          this.fetchOrder(),
          this.fetchAllLabor(),
          this.fetchLabor(1),
          this.fetchLabor(2),
          this.fetchLabor(3)
        ])
        .then(
          axios.spread((orders, allLabors, prts, babysitters, caregivers) => {
            this.prts = prts.data;
            this.babysitters = babysitters.data;
            this.caregivers = caregivers.data;
            this.labors = allLabors.data;
            this.orders = orders.data
            // console.log(dataorder);
          })
        );
    }
  },
  mounted() {},
  created() {
    this.user = this.$store.getters["user/currentUser"];
    this.date = moment().format("DD/MMMM/YYYY");
    this.getLaborData();
    this.jobs = this.$store.getters["labor/jobs"];
  }
};
</script>

<style>
</style>
