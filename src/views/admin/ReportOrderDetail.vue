<template>
  <div class="order-detail">
    <v-container grid-list-md>
      <v-layout row wrap>
        <v-flex xs12 class="mb-4">
          <v-card flat>
            <v-card-text>
              <span
                class="body-1 font-weight-medium"
              >tanggal pemesanan: {{dateFormat(order.created_at)}}</span>
              <v-toolbar dense flat>
                <v-spacer></v-spacer>
                <div class="body-2 primary--text">Nota ID: {{order.note_id}}</div>
              </v-toolbar>
            </v-card-text>
            <v-layout row wrap>
              <!-- ORDER INPUT COST -->
              <v-flex xs6>
                <v-card flat>
                  <v-card-title class="title success--text" primary-title>
                    <v-icon left color="success">subject</v-icon>Informasi Pesanan
                  </v-card-title>
                  <v-card-text>
                    <v-layout align-center row wrap class="ml-3">
                      <v-flex md1>
                        <v-icon>perm_identity</v-icon>
                      </v-flex>
                      <v-flex md11>
                        <span class="caption grey--text">Nama</span>
                        <div class="subheading">{{order.name}}</div>
                      </v-flex>
                      <v-flex xs12>
                        <v-divider></v-divider>
                      </v-flex>
                      <v-flex md1>
                        <v-icon>call</v-icon>
                      </v-flex>
                      <v-flex md11>
                        <span class="caption grey--text">Nomor Telepon</span>
                        <div class="subheading">{{order.handphone}}</div>
                      </v-flex>
                      <v-flex xs12>
                        <v-divider></v-divider>
                      </v-flex>
                      <v-flex md1>
                        <v-icon>pin_drop</v-icon>
                      </v-flex>
                      <v-flex md11>
                        <span class="caption grey--text">Alamat</span>
                        <div class="subheading">{{order.address}}</div>
                      </v-flex>
                    </v-layout>
                    <v-list>
                      <v-toolbar dense flat>
                        <v-toolbar-title class="subheading font-weight-light">Waktu pesan</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-chip
                          dark
                          label
                          :color="colors[order.time_type-1].color"
                        >{{timeTypes[order.time_type-1].text}}</v-chip>
                      </v-toolbar>
                      <v-list-tile v-if="order.hour_date != null">
                        <v-list-tile-content>
                          <v-list-tile-sub-title class="text-xs-right">Tanggal</v-list-tile-sub-title>
                          <v-list-tile-title class="text-xs-right">{{dateFormat(order.hour_date)}}</v-list-tile-title>
                        </v-list-tile-content>
                        <v-list-tile-content>
                          <v-list-tile-sub-title class="text-xs-right">Jam</v-list-tile-sub-title>
                          <v-list-tile-title
                            class="text-xs-right"
                          >{{order.hour_start}} - {{order.hour_end}}</v-list-tile-title>
                        </v-list-tile-content>
                      </v-list-tile>
                      <v-list-tile v-else-if="order.day_start != null">
                        <v-list-tile-content>
                          <v-list-tile-sub-title class="text-xs-right">Tanggal</v-list-tile-sub-title>
                          <v-list-tile-title
                            class="text-xs-right"
                          >{{dateFormat(order.day_start)}} - {{dateFormat(order.day_end)}}</v-list-tile-title>
                        </v-list-tile-content>
                      </v-list-tile>
                    </v-list>
                  </v-card-text>
                </v-card>
              </v-flex>

              <!-- ORDER CALCULATE -->
              <v-flex xs6>
                <v-card flat style="border-left: 1px solid #1a237e;">
                  <v-card-text>
                    <v-list>
                      <v-list-tile>
                        <v-list-tile-action-text
                          style="width:150px"
                        >Harga {{timeTypes[this.order.time_type-1].text}}</v-list-tile-action-text>
                        <v-list-tile-title class="text-xs-right body-1">Rp. {{formatPrice(salary)}}</v-list-tile-title>
                      </v-list-tile>
                      <v-divider></v-divider>
                      <v-list-tile>
                        <v-list-tile-action-text
                          style="width:150px"
                        >{{timeRange}} x Rp. {{formatPrice(salary)}}</v-list-tile-action-text>
                        <v-list-tile-title
                          class="text-xs-right body-1"
                        >Rp. {{formatPrice(totalSalary)}}</v-list-tile-title>
                      </v-list-tile>
                      <v-divider></v-divider>
                      <v-list-tile>
                        <v-list-tile-action-text style="width:150px">Biaya admin</v-list-tile-action-text>
                        <v-list-tile-title
                          class="text-xs-right body-1"
                        >Rp. {{formatPrice(order.admin_cost)}}</v-list-tile-title>
                      </v-list-tile>
                      <v-divider></v-divider>
                      <v-list-tile>
                        <v-list-tile-action-text style="width:150px">Total bayar</v-list-tile-action-text>
                        <v-list-tile-title
                          class="text-xs-right subheading font-weight-medium error--text"
                        >Rp. {{formatPrice(totalPay)}}</v-list-tile-title>
                      </v-list-tile>
                    </v-list>

                    <v-list>
                      <v-list-tile>
                        <v-list-tile-action-text style="width:150px">Biaya admin</v-list-tile-action-text>
                        <v-list-tile-title
                          class="text-xs-right body-1"
                        >Rp. {{formatPrice(order.admin_cost)}}</v-list-tile-title>
                      </v-list-tile>
                      <v-divider></v-divider>
                      <v-list-tile>
                        <v-list-tile-action-text style="width:150px">Potongan gaji</v-list-tile-action-text>
                        <v-list-tile-title
                          class="text-xs-right body-1"
                        >Rp. {{formatPrice(order.salary_cut)}}</v-list-tile-title>
                      </v-list-tile>
                      <v-divider></v-divider>
                      <v-list-tile>
                        <v-list-tile-action-text style="width:150px">Total biaya tambahan</v-list-tile-action-text>
                        <v-list-tile-title
                          class="text-xs-right body-1"
                        >Rp. {{formatPrice(totalAddons)}}</v-list-tile-title>
                      </v-list-tile>
                      <v-divider></v-divider>
                      <v-list-tile>
                        <v-list-tile-action-text style="width:150px">Total pendapatan</v-list-tile-action-text>
                        <v-list-tile-title
                          class="text-xs-right subheading font-weight-medium success--text"
                        >Rp. {{formatPrice(totalIncome)}}</v-list-tile-title>
                      </v-list-tile>
                    </v-list>
                  </v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
          </v-card>
        </v-flex>
        <v-flex xs6>
          <v-card flat>
            <v-card-title class="title green--text" primary-title>
              <v-icon left color="success">check</v-icon>Spesifikasi pekerja
            </v-card-title>
            <v-card-text>
              <OrderLaborReq></OrderLaborReq>
            </v-card-text>
          </v-card>
        </v-flex>

        <v-flex xs6>
          <v-card flat>
            <v-card-title class="title green--text" primary-title>
              <v-icon left color="success">check</v-icon>Pekerja yang dipilih
            </v-card-title>
            <v-card-text>
              <OrderLabor></OrderLabor>
            </v-card-text>
            <v-btn
              @click="showSelectLabor"
              :loading="progress"
              depressed
              block
              color="success"
            >Ganti pekerja</v-btn>
          </v-card>
        </v-flex>
      </v-layout>
      <v-dialog v-model="dialog" persistent scrollable max-width="750">
        <v-card>
          <v-card-title class="title green--text">
            Pekerja yang tersedia
            <v-spacer></v-spacer>
            <v-btn flat small icon depressed @click="dialog = false">
              <v-icon>clear</v-icon>
            </v-btn>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text style="height: 500px;">
            <v-text-field
              @keydown.enter="searchLabor"
              v-model="search.searchbox"
              placeholder="Cari nama atau id pekerja"
              append-icon="search"
            ></v-text-field>
            <v-list v-if="labors.data.length != 0">
              <template v-for="(labor, index) in labors.data">
                <v-list-tile ripple @click="selectLabor(labor, index)" :key="index">
                  <v-list-tile-action>
                    <v-icon color="success" v-if="selected[index]">check</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-content>
                    <v-list-tile-title>{{labor.name}}</v-list-tile-title>
                    <v-list-tile-sub-title>{{labor.register_id}}</v-list-tile-sub-title>
                  </v-list-tile-content>
                  <v-spacer></v-spacer>
                  <v-chip small>{{jobs[labor.job_id-1].text}}</v-chip>
                </v-list-tile>
                <v-divider v-if="index + 1 < labors.data.length" :key="index"></v-divider>
              </template>
            </v-list>
            <div class="subheading text-xs-center my-3 font-weight-medium" v-else>
              <v-icon>search</v-icon>Tidak ada pekerja
            </div>
            <v-footer style="background-color:transparent" class="justify-center">
              <v-pagination
                @input="isSearch? searchLabor() : fetchLabor()"
                :length="labors.meta.last_page"
                :total-visible="7"
                v-model="page"
              ></v-pagination>
            </v-footer>
          </v-card-text>
          <v-card-actions>
            <v-btn color="success" block depressed @click="changeLabor">Pilih</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </div>
</template>

<script>
import moment from "moment";
import axios from 'axios'
import OrderLaborReq from "../OrderLaborReq";
import OrderLabor from "../OrderLabor";
export default {
  components: {
    OrderLaborReq,
    OrderLabor
  },
  data() {
    return {
      finishProgress: false,
      progress: false,
      dialogComplete: false,
      search: {},
      dialog: false,
      selected: [],
      selectedLabor: {},
      page: 0,
      isSearch: false,

      currency_options: {
        thousands: ".",
        precision: 0,
        masked: false
      },
      cost: {
        admin_cost: 0,
        salary_cut: 0,
        total: 0,
        addons: []
      },
      addon: {},
      order: {},
      date: "",
      jobs: [],
      labors: {},
      colors: [
        { id: 1, color: "blue" },
        { id: 2, color: "lime" },
        { id: 3, color: "dark_pink" }
      ],
      timeTypes: [
        { text: "Per-Jam", id: "price_hour" },
        { text: "Per-Hari", id: "price_day" },
        { text: "Per-Bulan (Tetap)", id: "price_month" }
      ],
      headers: {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("api_token")}`
        }
      }
    };
  },
  methods: {
    dateFormat(date) {
      moment.locale("id");
      return moment(date).format("DD/MMMM/YYYY");
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(0).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    showSelectLabor() {
      this.dialog = true;
      this.search = {};
      this.selected = [];
      this.fetchLabor();
    },
    selectLabor(labor, idx) {
      this.selected = Array(this.labors.data.length);
      const opt = true;
      if (this.selected[idx] != opt) {
        this.selected.splice(idx, 1);
        this.selected.splice(idx, 1, opt);
      } else {
        this.selected.splice(idx, 1);
        this.selected.splice(idx, 1, !opt);
      }
      this.selectedLabor = labor;
      // this.order.labor = labor
      // this.order.labor_id = labor.id;
    },
    updateOrder() {
      this.$http
        .put("order", this.order, this.headers)
        .then(ress => {
          this.multiUpdateLabor()
        })
        .catch(e => {
          console.log("update order err", e.response);
        });
    },
    fetchOrder(id) {
      this.$http
        .get(`order/${id}`, this.headers)
        .then(ress => {
          console.log("fetch order", ress.data);
          this.order = ress.data;
          this.progress = false;
          this.$store.commit("labor/SET_ORDER_LABOR", this.order.labor);
          this.$store.commit(
            "labor/SET_ORDER_LABOR_REQ",
            this.order.order_labor
          );
        })
        .catch(e => {
          this.progress = false;
          console.log("fetch order err", e.response);
        });
    },
    changeLabor() {
      this.order.labor_id = this.selectedLabor.id;
      this.dialog = false;
      this.progress = true;
      console.log("order data", this.order);
      this.updateOrder()
    },
    multiUpdateLabor(){
      axios.all([
        this.updateLabor(this.order.labor, 4),
        this.updateLabor(this.selectedLabor, 5)
      ]).then(axios.spread((prevLabor, selectedLabor) => {
          this.fetchOrder(this.order.id)
      })).catch(e => {
        console.log('error update labor',e.response)

      })

    },
    updateLabor(labor, status) {
      labor.status = status
      this.$http.put("labor", labor, this.headers)
    },
    fetchLabor() {
      let url = this.page == 0 ? "mitras" : `mitras?page=${this.page}`;
      this.$http
        .get(url, {
          params: { type: "available" }
        })
        .then(ress => {
          this.labors = ress.data;
        })
        .catch(e => {
          console.log(e.response);
        });
    },
    searchLabor() {
      this.isSearch = true;
      // search labor on available status only
      this.search.status = 4;
      console.log(this.search);
      let url = this.page == 0 ? "search" : `search?page=${this.page}`;
      this.$http
        .post(url, this.search)
        .then(ress => {
          console.log("ress data", ress);
          this.labors = ress.data;
        })
        .catch(e => {
          console.log("search error", e.response);
        });
    }
  },
  computed: {
    timeRange() {
      let time_range = 0;
      switch (this.order.time_type) {
        case "1":
          const startH = moment(this.order.hour_start, "hh:mm");
          const endH = moment(this.order.hour_end, "hh:mm");
          time_range = moment.duration(endH.diff(startH)).asHours();
          return parseInt(time_range);
          break;
        case "2":
          const startD = moment(this.order.day_start, "YYYY-MM-DD");
          const endD = moment(this.order.day_end, "YYYY-MM-DD");
          time_range = moment.duration(endD.diff(startD)).asDays();
          return parseInt(time_range);
          break;
        default:
          return time_range;
          break;
      }
    },
    totalAddons() {
      let total = 0;
      if (this.order.addons_cost != null) {
        Array.from(this.order.addons_cost).forEach((data, idx) => {
          if (data.nominal != 0) {
            total += data.nominal;
          }
        });
      }
      return total;
    },
    totalPay() {
      return this.totalSalary + this.order.admin_cost;
    },
    totalIncome() {
      return this.totalAddons + this.order.admin_cost + this.order.salary_cut;
    },
    salary() {
      if (this.order.labor != null) {
        const time_type = this.timeTypes[this.order.time_type - 1].id;
        let salary = this.order.labor[time_type];
        return salary;
      } else {
        return 0;
      }
    },
    totalSalary() {
      return this.salary * this.timeRange;
    }
  },
  destroyed() {
    this.$store.commit("labor/RESET_STATE_OBJ", "orderLaborReq");
    this.$store.commit("labor/RESET_STATE_OBJ", "orderLabor");
  },
  created() {
    this.fetchOrder(this.$route.params.data);
    this.fetchLabor();
    this.jobs = this.$store.getters["labor/jobs"];
  }
};
</script>

<style>
</style>
