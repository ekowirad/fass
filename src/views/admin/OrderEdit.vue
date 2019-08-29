<template>
  <div class="order-detail">
    <v-container grid-list-md>
      <v-layout row wrap>
        <v-flex xs12 class="mb-4">
          <v-card flat>
            <v-layout row wrap>
              <!-- ORDER INPUT COST -->
              <v-flex xs6>
                <v-card flat>
                  <v-card-text>
                    <v-currency-field
                      label="Biaya Admin"
                      v-model="cost.admin_cost"
                      v-bind="currency_options"
                      prefix="Rp"
                    ></v-currency-field>
                    <v-currency-field
                      label="Potongan Gaji"
                      v-model="cost.salary_cut"
                      v-bind="currency_options"
                      prefix="Rp"
                    ></v-currency-field>
                    <v-layout wrap align-center>
                      <v-flex xs12 lg12 md12>
                        <v-toolbar flat dense>
                          <div class="body-1 green--text">Biaya Tambahan</div>
                        </v-toolbar>
                      </v-flex>
                      <v-flex xs5>
                        <v-text-field v-model="addon.name" label="Keterangan" />
                      </v-flex>
                      <v-flex xs6>
                        <v-currency-field
                          label="Nominal"
                          v-model="addon.nominal"
                          v-bind="currency_options"
                          prefix="Rp"
                        ></v-currency-field>
                      </v-flex>
                      <v-flex xs1>
                        <v-btn icon color="success" small @click="pushAddonsCost(addon)">
                          <v-icon>add</v-icon>
                        </v-btn>
                      </v-flex>

                      <v-flex xs12 md12 lg12>
                        <v-list>
                          <template v-for="(addon, index) in cost.addons">
                            <v-list-tile
                              :key="index"
                              style="margin-left: -16px; margin-right: -16px;"
                            >
                              <v-layout row wrap align-center>
                                <v-flex class="body-1" xs6>{{addon.name}}</v-flex>
                                <v-flex xs5 class="body-1">Rp. {{formatPrice(addon.nominal)}}</v-flex>
                                <v-flex xs1>
                                  <v-btn
                                    flat
                                    icon
                                    small
                                    color="error"
                                    @click="popArray(index, cost.addons)"
                                  >
                                    <v-icon>clear</v-icon>
                                  </v-btn>
                                </v-flex>
                              </v-layout>
                            </v-list-tile>
                            <v-divider :key="index"></v-divider>
                          </template>
                        </v-list>
                      </v-flex>
                    </v-layout>
                  </v-card-text>
                </v-card>
              </v-flex>

              <!-- ORDER CALCULATE -->
              <v-flex xs6>
                <v-card flat style="border-left: 1px solid #1a237e;">
                  <v-card-text>
                    <span
                      class="caption font-weight-medium"
                    >tanggal pemesanan: {{dateFormat(order.created_at)}}</span>
                    <v-toolbar dense flat>
                      <v-spacer></v-spacer>
                      <div class="body-2 primary--text">Nota ID: {{order.note_id}}</div>
                    </v-toolbar>
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
                        >Rp. {{formatPrice(cost.admin_cost)}}</v-list-tile-title>
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
                        >Rp. {{formatPrice(cost.admin_cost)}}</v-list-tile-title>
                      </v-list-tile>
                      <v-divider></v-divider>
                      <v-list-tile>
                        <v-list-tile-action-text style="width:150px">Potongan gaji</v-list-tile-action-text>
                        <v-list-tile-title
                          class="text-xs-right body-1"
                        >Rp. {{formatPrice(cost.salary_cut)}}</v-list-tile-title>
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
                <v-btn
                  @click="finishOrder"
                  :loading="finishProgress"
                  depressed
                  block
                  color="primary"
                >Selesai</v-btn>
              </v-flex>
            </v-layout>
          </v-card>
        </v-flex>
        <v-flex xs7>
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

        <v-flex xs5>
          <v-card flat v-if="order.labor != null">
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
          <v-card flat v-else>
            <v-card-title class="title green--text" primary-title>
              <v-icon left color="success">check</v-icon>Spesifikasi pekerja
            </v-card-title>
            <v-card-text>
              <OrderLaborReq></OrderLaborReq>
            </v-card-text>
            <v-btn
              @click="showSelectLabor"
              v-if="order.labor == null"
              :loading="progress"
              depressed
              block
              color="success"
            >Pilih pekerja</v-btn>
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
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="success" depressed @click="changeLabor">Pilih</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="dialogComplete" persistent max-width="500">
        <v-card>
          <v-card-title class="title green--text">
            <v-icon color="success" left>check_circle</v-icon>Pesanan Selesai
          </v-card-title>
          <v-card-text
            class="subheading"
          >Pesanan telah selesai diproses dan telah dimasukan kedalam laporan hari ini.</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" flat depressed dark @click="confirm">Mengerti!</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </div>
</template>

<script>
import moment from "moment";
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
    pushAddonsCost(item) {
      this.cost.addons.push(item);
      this.addon = {};
      console.log(this.cost);
    },
    popArray(index, array) {
      array.splice(index, 1);
    },
    dateFormat(date) {
      moment.locale("id");
      return moment(date).format("DD/MMMM/YYYY");
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(0).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    confirm() {
      this.$router.replace({ name: "order-list" });
      this.dialogComplete = false;
    },
    finishOrder() {
      // set status order to 2 = Selesai
      this.order.status_id = 2;
      this.order.addons_cost = this.cost.addons;
      this.order.salary_cut = this.cost.salary_cut;
      this.order.admin_cost = this.cost.admin_cost;
      this.order.total_cost = this.totalIncome;
      this.order.revenue_id = this.$store.getters["labor/revenue"].id;
      this.finishProgress = true;

      console.log("order: ", this.order);
      this.updateOrder(2);
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
    updateOrder(action) {
      this.$http
        .put("order", this.order, this.headers)
        .then(ress => {
          this.moderateUpdate(action);
          console.log("update order", ress);
        })
        .catch(e => {
          console.log("update order err", e.response);
        });
    },
    moderateUpdate(action) {
      switch (action) {
        case 1:
          // update labor only
          this.fetchOrder(this.order.id);
          break;
        case 2:
          // finish order
          this.updateLabor(this.order.labor);
          break;

        default:
          null;
          break;
      }
    },
    changeLabor() {
      this.order.labor_id = this.selectedLabor.id;
      this.dialog = false;
      this.progress = true;
      console.log("order data", this.order);
      this.updateOrder(1);
    },
    updateLabor(labor) {
      console.log("labor data", labor);
      // set status 5 = sedang bekerja
      labor.status = 5;
      this.$http
        .put("labor", labor, this.headers)
        .then(ress => {
          this.finishProgress = false;
          this.dialogComplete = true;
        })
        .catch(e => {
          this.finishProgress = false;
          console.log("e update labor", e.response);
        });
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
      if (this.cost.addons.length != 0) {
        Array.from(this.cost.addons).forEach((data, idx) => {
          if (data.nominal != 0) {
            total += data.nominal;
          }
        });
      }
      return total;
    },
    totalPay() {
      return this.totalSalary + this.cost.admin_cost;
    },
    totalIncome() {
      return this.totalAddons + this.cost.admin_cost + this.cost.salary_cut;
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
