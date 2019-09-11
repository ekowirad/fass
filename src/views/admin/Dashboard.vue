<template>
  <div class="admin-about">
    <v-container fluid grid-list-lg>
      <v-layout row wrap align-center>
        <v-flex xs12 class="mb-5">
          <v-toolbar flat  color="grey lighten-2">
            <v-toolbar-title class="title font-weight-regular">
              <v-icon left color="orange">assignment_late</v-icon>Pesanan yang belum selesai
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn color="orange" outline flat :to="{name: 'order-list'}">Lihat lebih banyak</v-btn>
          </v-toolbar>
          <v-layout wrap row>
            <v-flex xs12 v-show="progress">
              <v-card flat color="transparent">
                <v-card-text class="text-xs-center">
                  <v-progress-circular indeterminate width="2" color="primary"></v-progress-circular>
                </v-card-text>
              </v-card>
            </v-flex>
            <v-flex xs12 v-if="orders.length != 0">
              <v-layout wrap align-center>
                <v-flex xs3 v-for="order in orders.data" :key="order.id">
                  <v-card flat>
                    <v-list>
                      <v-list-tile
                        @click="orderDetail(order.id, order.labor, order.order_labor)"
                        ripple
                      >
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
                      <v-list-tile v-if="order.labor !=null">
                        <v-list-tile-action>
                          <v-icon color="success">perm_identity</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                          <v-list-tile-title class="green--text">{{order.labor.name}}</v-list-tile-title>
                          <v-list-tile-sub-title
                            class="green--text text--lighten-3"
                          >{{jobs[order.labor.job_id-1].text}}</v-list-tile-sub-title>
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
            <v-flex xs12 v-else-if="orders.length == 0 && !progress ">
              <v-card flat color="transparent">
                <v-card-text class="text-xs-center">
                  <div class="title font-weight-regular">
                    <v-icon left color="success">check_circle</v-icon>Semua pesanan telah terselesaikan
                  </div>
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex xs4>
          <v-card tile flat height="150" style="border-left: solid 2px #934CEF">
            <v-card-title class="subheading prt--text ">
              <v-icon left color="prt">accessibility_new</v-icon>Pekerja Rumah Tangga
            </v-card-title>
            <v-card-text class="display-2 prt--text">
              <div v-if="Object.entries(prts).length === 0">
                <v-progress-circular indeterminate width="2" v-show="progress" color="prt"></v-progress-circular>
              </div>
              <div v-else>{{numberFormat(prts.size)}}</div>
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs4>
          <v-card tile flat height="150" style="border-left: solid 2px #FFA726">
            <v-card-title class="subheading caregiver--text"  >
              <v-icon left color="caregiver">accessible</v-icon>Pengasuh Lansia
            </v-card-title>
            <v-card-text class="display-2 caregiver--text">
              <div v-if="Object.entries(caregivers).length === 0">
                <v-progress-circular indeterminate width="2" v-show="progress" color="caregiver"></v-progress-circular>
              </div>
              <div v-else>{{numberFormat(caregivers.size)}}</div>
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs4>
          <v-card tile flat height="150" style="border-left: solid 2px #ED3072">
            <v-card-title class="subheading babysitter--text" >
              <v-icon left color="babysitter">child_friendly</v-icon>Pengasuh Bayi
            </v-card-title>
            <v-card-text class="display-2 babysitter--text">
              <div v-if="Object.entries(babysitters).length === 0">
                <v-progress-circular indeterminate width="2" v-show="progress" color="babysitter"></v-progress-circular>
              </div>
              <div v-else>{{numberFormat(babysitters.size)}}</div>
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs12>
          <v-toolbar flat color="grey lighten-2" class="mb-2">
            <v-toolbar-title class="title font-weight-regular black--text">
              <v-icon left color="success">how_to_reg</v-icon>Pekerja baru yang diregistrasi
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn color="success" outline :to="{name: 'labor-post'}">
              Registrasi
              <v-icon right>add</v-icon>
            </v-btn>
          </v-toolbar>
          <v-data-table :headers="labor_table_head" :items="labors.data" hide-actions>
            <template v-slot:items="props">
              <td class="text-xs-left">{{ formatDate(props.item.created_at) }}</td>
              <td class="text-xs-left">{{ props.item.register_id }}</td>
              <td class="text-xs-left">{{ props.item.name }}</td>
              <td class="text-xs-left">{{ props.item.age }}</td>
              <td class="text-xs-left">{{ jobs[props.item.job_id-1].text }}</td>
              <td class="text-xs-right">
                <v-btn small icon flat @click="laborEdit(props.item.job_id, props.item.id)">
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
      progress: false,
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
    numberFormat(num){
    const max = 10000000
    const sizeFinal = num.toString().substring(0,8).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1, ')
    const maxFormated =max.toString().substring(0,8).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1, ')
      return num > max? `${maxFormated}+` : sizeFinal
    },
    laborEdit(job_id, id) {
      switch (job_id) {
        case 1:
          this.$router.push({ name: "prt-edit", params: { data: id } });
          break;
        case 2:
          this.$router.push({ name: "babysitter-edit", params: { data: id } });
          break;
        case 3:
          this.$router.push({ name: "caregiver-edit", params: { data: id } });
          break;
        default:
          null;
          break;
      }
    },
    orderDetail(id, labor, order_labor) {
      console.log("id", id);
      this.$router.push({ name: "order-edit", params: { data: id } });
      this.$store.commit("labor/SET_ORDER_LABOR", labor);
      this.$store.commit("labor/SET_ORDER_LABOR_REQ", order_labor);
    },
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
      this.progress = true;
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
            this.progress = false;
            // console.log(dataorder);
          })
        ).catch(e => {
          this.progress =false
        })
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
