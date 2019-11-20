<template>
  <div class="report-payment">
    <v-card flat class="mb-2">
      <v-card-text>
        <v-layout class="black--text body-2" align-center row wrap>
          <v-flex xs5 px-2>
            <div class="subheading">Nomor Nota</div>
          </v-flex>
          <v-flex xs4 px-2>
            <div class="subheading">Nama</div>
          </v-flex>
          <v-flex xs3 px-2>
            <div class="subheading">Tanggal Konfirmasi</div>
          </v-flex>
        </v-layout>
      </v-card-text>
    </v-card>

    <v-list>
      <template v-for="(payment, index) in payments.data">
        <v-list-tile :key="index" @click="detail(payment)">
          <v-layout class="black--text body-1" align-center row wrap>
            <v-flex xs5 px-2 class="text-truncate font-weight-bold">{{payment.note_id}}</v-flex>
            <v-flex xs4 px-2 class="text-truncate">{{payment.name}}</v-flex>
            <v-flex xs3 px-2 class="text-truncate">{{dateFormat(payment.created_at)}}</v-flex>
          </v-layout>
        </v-list-tile>
        <v-divider v-if="index + 1 < payments.data.length" :key="`divider-${index}`"></v-divider>
      </template>
      <v-layout row wrap v-if="fetchProgress">
        <v-flex xs12 class="text-xs-center">
          <v-progress-circular size="55" indeterminate width="2" color="primary"></v-progress-circular>
        </v-flex>
      </v-layout>
    </v-list>
    <v-toolbar flat color="transparent" dense>
      <v-spacer></v-spacer>
      <v-pagination
        v-if="payments.data.length != 0"
        @input="fetchData"
        :total-visible="7"
        color="primary"
        :length="payments.meta.last_page"
        v-model="page"
      ></v-pagination>
    </v-toolbar>
    <order-payment ref="paymentDetail" />
  </div>
</template>

<script>
import moment from "moment";
import OrderPayment from "../OrderPayment";
export default {
  components: {
    OrderPayment
  },
  data() {
    return {
      fetchProgress: false,
      payments: {
        data: []
      },
      page: 0,
      headers: {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("api_token")}`
        }
      }
    };
  },
  methods: {
    fetchData() {
      this.fetchProgress = true;
      let url =
        this.page == 0 ? "order_payments" : `order_payments?page=${this.page}`;
      this.$http
        .get(url, this.headers)
        .then(ress => {
          this.fetchProgress = false;
          this.payments = ress.data;
        })
        .catch(e => {
          this.fetchProgress = false;
          console.log(e.response);
        });
    },
    detail(data) {
      this.$store.commit("labor/SET_ORDER_PAYMENT", data);
      this.$refs.paymentDetail.dialog = true;
    },
    dateFormat(date) {
      moment.locale("id");
      return moment(date).format("DD/MMMM/YYYY");
    }
  },
  created() {
    this.fetchData();
  }
};
</script>

<style>
</style>