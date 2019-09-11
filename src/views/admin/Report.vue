<template>
  <div class="report">
    <v-container grid-list-lg>
      <v-toolbar flat color="transparent" class="mb-3">
        <v-spacer></v-spacer>
        <v-toolbar-title>
          <v-layout wrap align-center>
            <v-flex grow>
              <v-menu
                v-model="menu.start_date"
                :close-on-content-click="false"
                transition="scale-transition"
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    :rules="rField"
                    :value="formatDate(filter.start_date)"
                    label="Dari Tanggal"
                    prepend-icon="event"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  :max="date_now"
                  @input="menu.start_date = !menu.start_date"
                  v-model="filter.start_date"
                  no-title
                ></v-date-picker>
              </v-menu>
            </v-flex>
            <v-flex grow>
              <v-menu
                v-model="menu.end_date"
                :close-on-content-click="false"
                transition="scale-transition"
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    :rules="rField"
                    :value="formatDate(filter.end_date)"
                    label="Sampai Tanggal"
                    prepend-icon="event"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  @input="menu.end_date = !menu.end_date"
                  :max="date_now"
                  v-model="filter.end_date"
                  no-title
                ></v-date-picker>
              </v-menu>
            </v-flex>
            <v-flex shrink>
              <v-btn color="success" @click="fetchReport" depressed>
                Filter</v-btn>
            </v-flex>
          </v-layout>
        </v-toolbar-title>
      </v-toolbar>
      <v-toolbar flat>
        <v-toolbar-title>
          <v-icon left>whatshot</v-icon>Pekerja Yang Banyak Diminati
        </v-toolbar-title>
      </v-toolbar>
      <v-card flat class="mb-4">
        <v-progress-linear height="5" v-if="progress" indeterminate></v-progress-linear>
        <v-card-text>
          <v-layout row wrap align-center>
            <v-flex xs12 class="text-xs-center subheading" v-if="progress"></v-flex>
            <v-flex xs4>
              <canvas style="width:240px; height:240px;" id="labor-chart"></canvas>
            </v-flex>
            <v-flex xs8>
              <v-layout wrap>
                <v-flex xs4 v-for="label in dataLaborLabels" :key="label.name">
                  <v-responsive class="text-xs-center">
                    <v-avatar size="40" :style="{ 'background-color': label.color}">
                      <v-icon size="25" dark>{{label.icon}}</v-icon>
                    </v-avatar>
                  </v-responsive>
                  <v-card flat>
                    <div class="text-xs-center">
                      <div class="subheading">{{label.name}}</div>
                      <br />
                      <div class="title">{{numberFormat(label.size)}}</div>
                    </div>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
      <v-toolbar flat>
        <v-toolbar-title>
          <v-icon left>bar_chart</v-icon>Laporan Pendapatan dan Pengeluaran
        </v-toolbar-title>
      </v-toolbar>
      <v-card flat class="mb-4">
        <v-progress-linear height="5" v-if="progress" indeterminate></v-progress-linear>
        <v-card-text>
          <canvas id="planet-chart"></canvas>
        </v-card-text>
      </v-card>
      <v-toolbar color="transparent" flat>
        <v-toolbar-title>
          <v-icon left>subject</v-icon>Detail Pendapatan dan Pengeluaran
        </v-toolbar-title>
      </v-toolbar>
      <report-table></report-table>
    </v-container>
  </div>
</template>

<script>
import Chart from "chart.js";
import moment from "moment";
import ReportTable from "./ReportTable";
export default {
  components: {
    ReportTable
  },
  data() {
    return {
      progress: false,
      date_now: moment().format("YYYY-MM-DD"),
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("api_token")}`
      },
      filter: {
        end_date: moment().format("YYYY-MM-DD"),
        start_date: moment()
          .subtract(7, "d")
          .format("YYYY-MM-DD")
      },
      menu: {
        end_date: false,
        start_date: false
      },
      dataReport: {},
      dataLabor: {},
      dataLaborLabels: [],
      dataLaborLabel: {},
      LaborChartData: {
        type: "doughnut",
        data: {
          labels: [],
          datasets: []
        },
        options: {
          cutoutPercentage: 70,
          aspectRatio: 1,
          legend: {
            display: false
          },
          responsive: true,
          maintainAspectRatio: false
        }
      },
      ReportChartData: {
        type: "line",
        data: {
          labels: [],
          datasets: []
        },
        options: {
          responsive: true,
          lineTension: 1,
          tooltips: {
            callbacks: {
              label: function(t, d) {
                var xLabel = d.datasets[t.datasetIndex].label;
                var yLabel =
                  t.yLabel >= 1000
                    ? "Rp " +
                      t.yLabel.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                    : "Rp " + t.yLabel;
                return xLabel + ": " + yLabel;
              }
            }
          },
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                  padding: 25,
                  userCallback: function(value, index, values) {
                    // Convert the number to a string and splite the string every 3 charaters from the end
                    value = value.toString();
                    value = value.split(/(?=(?:...)*$)/);

                    // Convert the array to a string and format the output
                    value = value.join(".");
                    return "Rp " + value;
                  }
                }
              }
            ]
          }
        }
      }
    };
  },
  methods: {
    formatDate(date) {
      moment.locale("id");
      return moment(date).format("DD/MMMM/YYYY");
    },
    numberFormat(num) {
      return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1, ");
    },
    setLaborChart(laborData) {
      this.LaborChartData.data.datasets = [];
      this.LaborChartData.data.labels = [];
      this.dataLaborLabels = []
      
      const bgColor = ["#934CEF", "#ED3072", "#FFA726"];
      const icon = ["accessibility_new", "child_friendly", "accessible"];
      const brColor = ["#fff", "#fff", "#fff"];

      Array.from(this.$store.getters["labor/jobs"]).forEach((data, idx) => {
        this.LaborChartData.data.labels.push(data.name);

        this.dataLaborLabel.name = data.name;
        this.dataLaborLabel.icon = icon[idx];
        this.dataLaborLabel.size = laborData[idx];
        this.dataLaborLabel.color = bgColor[idx];
        this.dataLaborLabels.push(this.dataLaborLabel);
        this.dataLaborLabel = {};
      });

      this.chartDataSet(
        "test",
        laborData,
        bgColor,
        brColor,
        "dataLabor",
        "LaborChartData"
      );
    },
    setReportChart(reportData) {
      this.ReportChartData.data.datasets = [];
      this.ReportChartData.data.labels = [];
      let expense = [];
      let revenue = [];
      const chartData = "dataReport";
      const chart = "ReportChartData";

      Array.from(reportData).forEach(data => {
        console.log(data.id);
        expense.push(data.total_expense);
        revenue.push(data.total_revenue);
        this.ReportChartData.data.labels.push(
          moment(data.created_at).format("DD/MM/YYYY")
        );
      });

      this.chartDataSet(
        "Pengeluaran",
        expense,
        "rgba(197, 14, 41, 0.45)",
        "#C50E29",
        chartData,
        chart
      );
      this.chartDataSet(
        "Pendapatan",
        revenue,
        "rgba(38, 65, 143, 0.45)",
        "#26418F",
        chartData,
        chart
      );
    },
    chartDataSet(label, data, bgColor, brColor, chartData, chart) {
      this[chartData].label = label;
      this[chartData].data = data;
      this[chartData].backgroundColor = bgColor;
      this[chartData].borderColor = brColor;
      this[chartData].borderWidth = 1.5;

      this[chart].data.datasets.push(this[chartData]);
      this[chartData] = {};
    },
    fetchReport() {
      this.progress = true;
      this.$http
        .get("revenues", {
          params: this.filter,
          headers: this.headers
        })
        .then(ress => {
          this.$store.commit("labor/SET_REPORT", ress.data.data_report);
          this.buildLaborChart(ress.data.data_labor);
          this.buildReportChart(ress.data.data_report);
          this.progress = false;
          console.log(ress);
        })
        .catch(e => {
          console.log(e.response);
          this.progress = false;
        });
    },
    buildLaborChart(data) {
      this.setLaborChart(data);
      this.createChart("labor-chart", this.LaborChartData);
    },
    buildReportChart(data) {
      this.setReportChart(data);
      this.createChart("planet-chart", this.ReportChartData);
    },
    createChart(chartId, chartData) {
      const ctx = document.getElementById(chartId);
      const myChart = new Chart(ctx, {
        type: chartData.type,
        data: chartData.data,
        options: chartData.options
      });
    }
  },
  mounted() {
    this.fetchReport();
  }
};
</script>

<style>
</style>