<template>
  <div class="admin-about">
    <v-container fluid grid-list-lg>
      <v-layout row wrap align-center>
        <v-flex xs12 class="mb-5">
          <v-toolbar flat color="grey lighten-2">
            <v-toolbar-title class="title font-weight-regular primary--text">
              <v-icon left color="primary">assignment_late</v-icon>Pesanan yang belum selesai
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn color="primary" outline flat>Lihat lebih banyak</v-btn>
          </v-toolbar>
          <v-layout wrap align-center v-if="orders.length != 0">
            <v-flex xs3 v-for="order in orders" :key="order.id">
              <v-card flat>
                <v-list>
                  <v-list-tile @click ripple>
                    <v-list-tile-content>
                      <v-list-tile-title class="body-2">{{formatDate(order.created_at)}}</v-list-tile-title>
                    </v-list-tile-content>
                    <v-list-tile-action>
                      <v-icon>keyboard_arrow_right</v-icon>
                    </v-list-tile-action>
                  </v-list-tile>
                  <v-divider></v-divider>
                  <v-list-tile>
                    <v-list-tile-content>
                      <v-list-tile-title>{{order.name}}</v-list-tile-title>
                      <v-list-tile-sub-title class="caption">
                        <v-icon class="mr-1" small>call</v-icon>
                        {{order.handphone}}
                      </v-list-tile-sub-title>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile  v-if="order.labor !=null">
                    <v-list-tile-action>
                      <v-icon color="success">perm_identity</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title class="green--text">{{order.labor.name}}</v-list-tile-title>
                      <v-list-tile-sub-title class="green--text text--lighten-3">{{jobs[order.labor.job_id-1].text}}</v-list-tile-sub-title>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile v-else>
                    <v-list-tile-content>
                      <v-chip color="orange" small label outline>Prefensi pekerja terlampir</v-chip>
                    </v-list-tile-content>                    
                  </v-list-tile>
                </v-list>
              </v-card>
            </v-flex>
          </v-layout>
        </v-flex>
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
        <v-flex xs12>
          <v-toolbar flat color="grey lighten-2" class="mb-2">
            <v-toolbar-title class="title font-weight-regular primary--text">
              <v-icon left color="primary">how_to_reg</v-icon>Pekerja baru yang diregistrasi
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn color="success" outline>Registrasi <v-icon right>add</v-icon></v-btn>
          </v-toolbar>
          <v-data-table :headers="labor_table_head" :items="labors.data" hide-actions>
            <template v-slot:items="props">
              <td class="text-xs-left">{{ formatDate(props.item.created_at) }}</td>
              <td class="text-xs-left">{{ props.item.register_id }}</td>
              <td class="text-xs-left">{{ props.item.name }}</td>
              <td class="text-xs-left">{{ props.item.age }}</td>
              <td class="text-xs-left">{{ jobs[props.item.job_id-1].text }}</td>
              <td class="text-xs-right">
                <v-btn small icon flat>
                  <v-icon>create</v-icon>
                </v-btn>
              </td>
            </template>
          </v-data-table>
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
      labor_table_head: [
        { text: "Tanggal register", value: "register" },
        { text: "ID register", value: "register_id" },
        { text: "Nama", value: "name" },
        { text: "Umur", value: "age" },
        { text: "Pekerjaan", value: "job", sortable: false },
        { text: "", value: "action", sortable: false }
      ],
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
    formatDate(date) {
      return moment(date).format("DD/MMMM/YYYY");
    },
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
            this.orders = orders.data;
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
