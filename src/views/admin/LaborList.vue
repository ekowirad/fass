<template>
  <div class="labor-list">
    <v-container fluid grid-list-lg>
      <labor-filter @search-clicked="searchFilter"></labor-filter>
      <v-layout row wrap align-center>
        <v-flex xs12 md3 v-for="(labor, index) in labors.data" :key="index">
          <template>
            <v-hover>
              <v-card slot-scope="{hover}" :class="`elevation-${hover ? 7 : 0}`">
                <v-expand-transition>
                  <v-toolbar v-if="hover" dense class="options--reveal black">
                    <v-spacer></v-spacer>
                    <v-btn flat icon dark @click="laborEdit(labor.id)">
                      <v-icon>create</v-icon>
                    </v-btn>
                    <v-btn v-if="labor.work_history.length != 0" flat icon dark @click="showWorkHistory(labor.work_history)">
                      <v-icon>list_alt</v-icon>
                    </v-btn>
                  </v-toolbar>
                </v-expand-transition>
                <v-responsive class="text-xs-center pt-2">
                  <v-avatar size="100" class="grey lighten-2" style="overflow:hidden">
                    <img
                      style="width:auto; border-radius:0"
                      :src="labor.profile_pic.url"
                      v-if="labor.profile_pic != null"
                      alt
                    />
                    <v-icon v-else size="50">person</v-icon>
                  </v-avatar>
                </v-responsive>
                <div class="text-xs-center px-2 pt-2">
                  <div class="subheading font-weight-medium text-truncate">{{labor.name}}</div>
                  <div class="grey--text">ID: {{labor.register_id}}</div>
                </div>
                <v-card-text>
                  <v-layout justify-center align-center row wrap>
                    <v-flex md3>
                      <v-icon>perm_identity</v-icon>
                    </v-flex>
                    <v-flex md9>
                      Jenis Kelamin
                      <div class="font-weight-medium">{{getGender(labor.sex)}}</div>
                    </v-flex>
                    <v-flex md3>
                      <v-icon>calendar_today</v-icon>
                    </v-flex>
                    <v-flex md9>
                      Umur
                      <div class="font-weight-medium">{{labor.age}}</div>
                    </v-flex>
                    <v-flex md3>
                      <v-icon>call</v-icon>
                    </v-flex>
                    <v-flex md9>
                      No. Telepon
                      <div class="font-weight-medium">{{labor.handphone}}</div>
                    </v-flex>
                  </v-layout>
                </v-card-text>
                <v-footer :color="statusColor(labor.status)">
                  <v-layout row wrap>
                    <v-flex xs12 class="text-xs-center pa-2 white--text">{{getStatus(labor.status)}}</v-flex>
                  </v-layout>
                </v-footer>
              </v-card>
            </v-hover>
          </template>
        </v-flex>
      </v-layout>
      <v-footer style="background-color:transparent" class="mt-4 justify-center">
        <v-pagination
          :length="labors.meta.last_page"
          @input="isSearch? searchLabor() : getLabor()"
          v-model="page"
        ></v-pagination>
      </v-footer>

      <!-- WORK HISTORY DIALOG -->
      <v-dialog v-model="workHistoryDialog" scrollable max-width="750">
        <v-card>
          <v-card-title class="title">
            <v-icon left>storage</v-icon>Rotasi Kerja
            <v-spacer></v-spacer>
            <v-btn flat small icon depressed @click="workHistoryDialog = false">
              <v-icon>clear</v-icon>
            </v-btn>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text style="height: 500px;">
            <v-list two-line>
              <template v-for="(history, index) in workHistory">
                <v-list-tile
                  :to="{name: 'report-order-detail', params: {data: history.id}}"
                  :key="history.id"
                >
                  <v-list-tile-content class="pr-4">
                    <v-list-tile-title>{{history.name}}</v-list-tile-title>
                    <v-list-tile-sub-title>
                      <v-icon class="mr-1" small>call</v-icon>
                      {{history.handphone}}
                    </v-list-tile-sub-title>
                    <v-list-tile-sub-title>{{history.address}}</v-list-tile-sub-title>
                  </v-list-tile-content>
                  <v-list-tile-action>
                    <v-list-tile-action-text>{{dateFormat(history.updated_at)}}</v-list-tile-action-text>
                    <v-chip
                      dark
                      label
                      :color="colors[history.time_type-1].color"
                    >{{timeTypes[history.time_type-1].text}}</v-chip>
                  </v-list-tile-action>
                </v-list-tile>
                <v-divider v-if="index + 1 < workHistory.length" :key="index"></v-divider>
              </template>
            </v-list>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-container>
  </div>
</template>

<script>
import LaborFilter from "./LaborFilter";
import moment from "moment";
export default {
  name: "LaborList",
  components: {
    LaborFilter
  },
  data() {
    return {
      workHistoryDialog: false,
      workHistory: [],
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
      },
      labors: [],
      labor_job: "",
      filter: false,
      status_color: [
        { color: "success", id: 4 },
        { color: "warning", id: 5 },
        { color: "error", id: 6 }
      ],
      gender: ["Tidak diketahui", "Perempuan", "Laki-laki"],
      page: 0,
      search: {},
      statuses: [],
      isSearch: false
    };
  },
  created() {
    this.showLabor();
    this.statuses = this.$store.getters["labor/statuses"];
  },
  methods: {
    dateFormat(date) {
      return moment(date).format("DD/MMMM/YYYY");
    },
    showWorkHistory(workHistory) {
      this.workHistory = workHistory;
      this.workHistoryDialog = true;
    },
    searchFilter(search) {
      this.isSearch = true;
      this.search = search;
      console.log("search data", this.search);
      this.searchLabor();
    },
    statusColor(id) {
      const status = Array.from(this.status_color).find(data => data.id == id)
        .color;
      console.log("color", status);
      return status;
    },
    getStatus(status) {
      return this.statuses.find(data => data.id == status).name;
    },
    getGender(id) {
      return this.gender[id];
    },
    getLabor() {
      let url =
        this.page == 0
          ? `labors/${this.labor_job}`
          : `labors/${this.labor_job}?page=${this.page}`;
      this.$http
        .get(url, this.headers)
        .then(ress => {
          this.labors = ress.data;
          console.log(this.labors);
        })
        .catch(e => {
          console.log(e.response);
        });
    },
    searchLabor() {
      let url = this.page == 0 ? "search" : `search?page=${this.page}`;
      this.$http
        .post(url, this.search)
        .then(ress => {
          console.log(ress);
          this.labors = ress.data;
        })
        .catch(e => {
          console.log("search error", e.response);
        });
    },
    showLabor() {
      switch (this.$route.name) {
        case "prt-list":
          this.labor_job = 1;
          break;
        case "babysitter-list":
          this.labor_job = 2;
          break;
        case "caregiver-list":
          this.labor_job = 3;
          break;
        default:
          break;
      }
      this.getLabor();
    },
    laborEdit(id) {
      switch (this.$route.name) {
        case "prt-list":
          this.$router.push({ name: "prt-edit", params: { data: id } });
          break;
        case "babysitter-list":
          this.$router.push({ name: "babysitter-edit", params: { data: id } });
          break;
        case "caregiver-list":
          this.$router.push({ name: "caregiver-edit", params: { data: id } });
          break;

        default:
          break;
      }
    }
  }
};
</script>

<style scoped>
.options--reveal {
  align-items: center;
  top: 0;
  z-index: 1;
  justify-content: center;
  opacity: 0.7;
  position: absolute;
  width: 100%;
}
</style>
