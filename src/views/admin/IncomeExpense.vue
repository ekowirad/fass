<template>
  <div class="income-expense">
    <v-container fluid grid-list-lg>
      <v-layout row wrap >
        <v-flex xs12>
          Tanggal:
          <span class="title">{{date}}</span>
        </v-flex>
        <v-flex xs12>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-card flat>
              <v-card-text>
                <v-layout row wrap align-center>
                  <v-flex grow>
                    <v-select
                      :rules="rField"
                      :items="types"
                      item-value="id"
                      v-model="data.type"
                      label="Kategori"
                    ></v-select>
                  </v-flex>
                  <v-flex grow>
                    <v-text-field :rules="rField" v-model="data.name" label="Keterangan"></v-text-field>
                  </v-flex>
                  <v-flex grow>
                    <v-currency-field
                      label="Nominal"
                      :error-messages="fieldErr"
                      v-model="data.nominal"
                      v-bind="currency_options"
                      prefix="Rp"
                    ></v-currency-field>
                  </v-flex>
                  <v-flex shrink>
                    <v-btn icon color="success" @click="postData()">
                      <v-icon>add</v-icon>
                    </v-btn>
                  </v-flex>
                </v-layout>
              </v-card-text>
            </v-card>
          </v-form>
        </v-flex>
        <v-flex xs6>
          <v-card flat tile>
            <v-card-title class="title" primary-title> <v-icon left>call_received</v-icon>Pemasukan</v-card-title>
            <v-card-text>
              <v-list>
                <template v-for="(income, index) in incomes">
                  <v-list-tile :key="income.id">
                    <v-list-tile-action-text class="body-1 font-weight-regular" style="width:350px">{{income.name}}</v-list-tile-action-text>
                    <v-list-tile-title
                      class="text-xs-right body-1"
                    >Rp. {{formatPrice(income.nominal)}}</v-list-tile-title>
                  </v-list-tile>
                  <v-divider :key="index"></v-divider>
                </template>
              </v-list>
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs6>
          <v-card flat tile>
            <v-card-title class="title" primary-title><v-icon left>call_made</v-icon>Pengeluaran</v-card-title>
            <v-card-text>
              <v-list>
                <template v-for="(expense, index) in expenses">
                  <v-list-tile :key="expense.id">
                    <v-list-tile-action-text class="body-1 font-weight-regular" style="width:350px">{{expense.name}}</v-list-tile-action-text>
                    <v-list-tile-title
                      class="text-xs-right body-1"
                    >Rp. {{formatPrice(expense.nominal)}}</v-list-tile-title>
                  </v-list-tile>
                  <v-divider :key="index"></v-divider>
                </template>
              </v-list>

            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import moment from "moment"
import axios from "axios"
export default {
  data() {
    return {
      currency_options: {
        thousands: ".",
        precision: 0,
        masked: false
      },
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("api_token")}`
      },
      types: [{ text: "Pengeluaran", id: 1 }, { text: "Pemasukan", id: 2 }],
      rField: [v => !!v || "Kolom ini tidak boleh kosong"],
      fieldErr: "",
      data: {
        nominal: 0
      },
      incomes: [],
      expenses: [],
      date: ""
    };
  },
  created() {
    this.date = moment().format("DD/MMMM/YYYY");
    this.fetchIncomeExpense()
  },
  methods: {
    formatPrice(value) {
      let val = (value / 1).toFixed(0).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    postData() {
      this.fieldErr =
        this.data.nominal != 0 ? false : "Kolom ini tidak boleh kosong";
      if (this.$refs.form.validate() && this.data.nominal != 0) {
        this.$http
          .post("expense_income", this.data, this.headers)
          .then(ress => {
            console.log("ress", ress);
          })
          .catch(e => {
            console.log("error", e.response);
          });
        this.data = { nominal: 0 };
        this.$refs.form.reset();
      }
    },
    fetchIncomeExpense(){
      axios
        .all([
          this.fetchData(1),
          this.fetchData(2)
        ])
        .then(
          axios.spread((expenses, incomes) => {
            this.expenses = expenses.data
            this.incomes = incomes.data

            console.log('incomes', incomes)
          })
        );
    },
    fetchData(type) {
     return this.$http.get(`expense_income/${type}`, {
        headers: this.headers
      })
    }
  }
};
</script>

<style>
</style>
