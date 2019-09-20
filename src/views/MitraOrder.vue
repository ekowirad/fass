<template>
  <div class="order-form">
    <v-container grid-list-md>
      <v-layout row wrap>
        <v-flex xs7>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-card flat>
              <v-card-title class="title" primary-title>Form Pemesanan</v-card-title>
              <v-card-text>
                <v-text-field :rules="rField" v-model="order.name" label="Nama Lengkap" />
                <v-text-field
                  :rules="rField"
                  v-model="order.handphone"
                  type="number"
                  label="Nomor Telepon"
                />
                <v-textarea :rules="rField" v-model="order.address" label="Alamat" />
                <v-radio-group :rules="rField" v-model="order.time_type" @change="reset()" row>
                  <div class="subheading mr-2 grey--text text--darken-1">Waktu Pesan</div>
                  <v-radio label="Per-jam" color="primary" value="1"></v-radio>
                  <v-radio label="Per-hari" color="primary" value="2"></v-radio>
                  <v-radio label="Tetap" color="primary" value="3"></v-radio>
                </v-radio-group>
                <div v-if="order.time_type == '1'">
                  <v-layout row wrap>
                    <v-flex xs12>
                      <v-menu
                        v-model="menu.hour_date"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        max-width="290px"
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on }">
                          <v-text-field
                            :rules="rField"
                            v-model="order.hour_date"
                            label="Tanggal"
                            prepend-icon="event"
                            readonly
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="order.hour_date"
                          no-title
                          @input="menu.hour_date = false"
                        ></v-date-picker>
                      </v-menu>
                    </v-flex>
                    <v-flex xs4>
                      <v-text-field
                        label="Durasi"
                        :rules="rField"
                        v-model="time_range"
                        @input="hourCalculate(order.hour_start)"
                        messages="*minimal 4 jam"
                        prepend-icon="access_time"
                        type="number"
                        min="4"
                        onkeydown="return false"
                        suffix="Jam"
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs4>
                      <v-menu
                        ref="menu1"
                        v-model="menu.hour_start"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        max-width="290px"
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on }">
                          <v-text-field
                            v-model="order.hour_start"
                            label=" Mulai"
                            :rules="rField"
                            readonly
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-time-picker
                          @input="hourCalculate(order.hour_start)"
                          v-model="order.hour_start"
                          @click:minute="$refs.menu1.save(order.hour_start)"
                          format="24hr"
                        ></v-time-picker>
                      </v-menu>
                    </v-flex>
                    <v-flex xs4>
                      <v-text-field v-model="order.hour_end" label=" Selesai" readonly></v-text-field>
                    </v-flex>
                  </v-layout>
                </div>

                <!-- HARIAN -->
                <div v-else-if="order.time_type == '2'">
                  <v-menu
                    v-model="menu.day_start"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    max-width="290px"
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        :rules="rField"
                        v-model="order.day_start"
                        label="Tanggal Mulai"
                        prepend-icon="event"
                        readonly
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="order.day_start"
                      @input="dateCalculate(order.day_start, order.day_end)"
                      no-title
                    ></v-date-picker>
                  </v-menu>
                  <v-menu
                    v-model="menu.day_end"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    max-width="290px"
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        :rules="rField"
                        v-model="order.day_end"
                        label="Tanggal Selesai"
                        prepend-icon="event"
                        readonly
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="order.day_end"
                      no-title
                      @input="dateCalculate(order.day_start, order.day_end)"
                    ></v-date-picker>
                  </v-menu>
                </div>
                <div v-if="labor.id != null" class="text-xs-right mt-4">
                  <div class="font-weight-medium">Perkiraan Harga:</div>
                  <div class="caption">*belum termasuk admin</div>
                  <div class="headline font-weight-bold">Rp. {{formatPrice(total)}}</div>
                  <div
                    v-if="order.time_type != null"
                    class="subheading red--text"
                  >Rp. {{formatPrice(subPrice)}} x {{time_range}}</div>
                </div>
              </v-card-text>
              <v-btn block depressed @click="pesan()" large color="success">Kirim</v-btn>
            </v-card>
          </v-form>
        </v-flex>
        <v-flex xs5>
          <v-card flat style="border-left: 2px solid #4CAF50;">
            <v-card-title class="title green--text" primary-title>
              <v-icon left color="success">check</v-icon>
              {{labor.id != null ? 'Mitra yang dipilih' : 'Spesifikasi mitra yang diinginkan'}}
            </v-card-title>
            <v-card-text v-if="labor.id != null">
              <OrderLabor></OrderLabor>
            </v-card-text>
            <v-card-text v-else>
              <OrderLaborReq></OrderLaborReq>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
      <v-dialog v-model="dialog" persistent max-width="500">
        <v-card>
          <v-card-title class="headline green--text">
            <v-icon color="success" left>check</v-icon>Pemesanan Berhasil
          </v-card-title>
          <v-card-text>Pesanan anda berhasil dikirim, kami akan konfirmasi melalui kontak yang telah anda isi</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" flat @click="confirm">Ok!</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </div>
</template>

<script>
import moment from "moment";
import OrderLaborReq from "./OrderLaborReq";
import OrderLabor from "./OrderLabor";
import { constants } from 'crypto';
export default {
  components: {
    OrderLaborReq,
    OrderLabor
  },
  data() {
    return {
      valid: true,
      dialog: false,
      menu: {
        day_start: false,
        day_end: false,
        hour_date: false,
        hour_start: false,
        hour_end: false
      },
      time_range: 0,
      total: 0,
      dialog: false,
      order: {},
      labor: {},
      params: {},
      order_labor: {},
      tempHour: 2,
      jobs: [],
      genders: [{ text: "Perempuan", idx: 1 }, { text: "Laki-laki", idx: 2 }],
      rField: [v => !!v || "Kolom ini tidak boleh kosong"]
    };
  },
  created() {
    this.labor = this.$store.getters["labor/orderMitra"]
  
    console.log("mitra order", this.labor);
    if (this.labor.id != null) {
      // if there is labor selected
      this.order.labor_id = this.labor.id;
    }else{
      // if there is no labor selected
      this.order.order_labor = this.labor
    }
    this.jobs = this.$store.getters["labor/jobs"];
  },
  mounted() {},
  destroyed() {
    this.$store.commit("labor/RESET_STATE_OBJ", 'orderMitra')
  },
  computed: {
    subPrice: function() {
      switch (this.order.time_type) {
        case "1":
          return this.labor.price_hour;
          break;
        case "2":
          return this.labor.price_day;
          break;
        case "3":
          return this.labor.price_month;
          break;
        default:
          return 0;
          break;
      }
    }
  },
  methods: {
    dateCalculate(start, end) {
      const startDate = moment(start, "YYYY-MM-DD");
      const endDate = moment(end, "YYYY-MM-DD");
      if (end != null) {
        this.time_range = moment.duration(endDate.diff(startDate)).asDays();
        this.total = this.labor.price_day * this.time_range;
      }
      this.menu.day_start = false;
      this.menu.day_end = false;
    },
    hourCalculate(start) {
      const startTime = moment(start, "hh");
      let total = moment(start, "hh:mm")
        .add(this.time_range, "hours")
        .format("HH:mm");
      this.order.hour_end = total;
      this.total = this.labor.price_hour * this.time_range;
    },
    reset() {
      this.order.day_start = null;
      this.order.day_end = null;
      this.order.hour_date = null;
      this.order.hour_start = null;
      this.order.hour_end = null;
      if (this.order.time_type == 1) {
        this.time_range = 4;
        this.total = this.labor.price_hour * this.time_range;
      } else if (this.order.time_type == 2) {
        this.time_range = 0;
        this.total = this.labor.price_day;
      } else {
        this.time_range = 0;
        this.total = this.labor.price_month;
      }
    },
    confirm() {
      this.$router.replace({ name: "mitra" });
      this.dialog = false;
    },
    pesan() {
      if (this.$refs.form.validate()) {
        this.order.status_id = 1;
        console.log("order", this.order);
        this.sendOrder();
      }
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(0).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    sendOrder() {
      this.$http
        .post("order", this.order)
        .then(ress => {
          this.dialog = true;
          console.log("ress order", ress);
        })
        .catch(e => {
          console.log("err order", e.response);
        });
    }
  }
};
</script>

<style>
</style>
