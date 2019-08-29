<template>
  <div class="report-table">
    <v-card class="mb-4" flat v-for="report in reports" :key="report.id">
      <v-toolbar color="transparent" flat dense>
        <v-toolbar-title class="font-weight-bold subheading">{{formatDate(report.created_at)}}</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-layout wrap>
          <v-flex xs7>
            <v-toolbar flat dense>
              <v-toolbar-title class="body-2">Pesanan</v-toolbar-title>
            </v-toolbar>
            <v-data-table :headers="orderHeader" :items="report.order">
              <template v-slot:items="props">
                <td class="text-xs-left">{{ props.item.note_id}}</td>
                <td class="text-xs-left">{{ props.item.labor.name}}</td>
                <td class="text-xs-left">Rp {{ formatPrice(props.item.total_cost)}}</td>
                <td class="text-xs-right">
                  <v-btn small icon flat :to="{name: 'report-order-detail' ,params: {data: props.item.id}}">
                    <v-icon>search</v-icon>
                  </v-btn>
                </td>
              </template>
            </v-data-table>
          </v-flex>
          <v-flex xs5>
            <v-layout row wrap>
              <v-flex xs12>
                <v-toolbar flat dense>
                  <v-toolbar-title class="body-2">Uang keluar</v-toolbar-title>
                </v-toolbar>
                <v-data-table :headers="expenseHeader" :items="report.expense">
                  <template v-slot:items="props">
                    <td class="text-xs-left">{{ props.item.name}}</td>
                    <td class="text-xs-left">Rp {{ formatPrice(props.item.nominal)}}</td>
                  </template>
                </v-data-table>
              </v-flex>
              <v-flex xs12>
                <v-toolbar flat dense>
                  <v-toolbar-title class="body-2">Uang masuk</v-toolbar-title>
                </v-toolbar>
                <v-data-table :headers="incomeHeader" :items="report.income">
                  <template v-slot:items="props">
                    <td class="text-xs-left">{{ props.item.name}}</td>
                    <td class="text-xs-left">Rp {{ formatPrice(props.item.nominal)}}</td>
                  </template>
                </v-data-table>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      reports: {},
      orderHeader: [
        { text: "Nota ID", value: "nota-id" },
        { text: "Nama pekerja", value: "labor-name" },
        { text: "Jumlah transaksi", value: "transcation-cost" },
        { text: "", value: "action", sortable: false }
      ],
      expenseHeader: [
        { text: "Keterangan", value: "desc" },
        { text: "Nominal", value: "nominal" }
      ],
      incomeHeader: [
        { text: "Keterangan", value: "desc" },
        { text: "Nominal", value: "nominal" }
      ]
    };
  },
  methods: {
    formatDate(date) {
      moment.locale("id");
      return moment(date).format("DD/MMMM/YYYY");
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(0).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
  },
  created() {
    this.reports = this.$store.getters["labor/report"];

    this.$store.watch(
      state => {
        return this.$store.getters["labor/report"];
      },
      newData => {
        this.reports = newData;
      }
    );
  }
};
</script>

<style>
</style>