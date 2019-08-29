<template>
  <div class="order-list">
    <v-container fluid grid-list-lg>
      <v-toolbar flat color="transparent" dense>
        <v-spacer></v-spacer>
        <v-pagination v-if="orders.data.length != 0" @input="fetchOrder" :total-visible="7" color="primary" :length="orders.meta.last_page" v-model="page"></v-pagination>
      </v-toolbar>
      <v-layout class="mt-2" row wrap align-center>
        <v-flex xs12 v-if="orders.data.length != 0">
          <v-layout row wrap alignce>
            <v-flex xs6 v-for="(order, index) in orders.data" :key="index">
              <template>
                <v-hover>
                  <v-card slot-scope="{hover}" :class="`elevation-${hover ? 7 : 0}`">
                    <v-expand-transition>
                      <v-toolbar v-if="hover" dense class="options--reveal black">
                        <v-spacer></v-spacer>
                        <v-btn
                          flat
                          icon
                          dark
                          @click="detail(order.id, order.labor, order.order_labor)"
                        >
                          <v-icon>create</v-icon>
                        </v-btn>
                        <v-btn flat icon dark @click.stop="delDialog(order.id)">
                          <v-icon>clear</v-icon>
                        </v-btn>
                      </v-toolbar>
                    </v-expand-transition>
                    <v-card-text>
                      <v-layout align-center row wrap>
                        <v-flex xs5>
                          <v-chip
                            dark
                            label
                            :color="colors[order.time_type-1].color"
                          >{{timeTypes[order.time_type-1].text}}</v-chip>
                        </v-flex>
                        <v-flex xs7 class="text-xs-right">
                          <span class="caption">dipesan tanggal: {{dateOrder(order.created_at)}}</span>
                          <div class="body-2 text-truncate">Nota ID: {{order.note_id}}</div>
                        </v-flex>
                      </v-layout>

                      <v-list>
                        <v-toolbar dense flat>
                          <v-toolbar-title class="subheading font-weight-light">Pemesan</v-toolbar-title>
                        </v-toolbar>
                        <v-list-tile>
                          <v-list-tile-action>
                            <v-icon>perm_identity</v-icon>
                          </v-list-tile-action>
                          <v-list-tile-content>
                            <v-list-tile-sub-title>Nama</v-list-tile-sub-title>
                            <v-list-tile-title>{{order.name}}</v-list-tile-title>
                          </v-list-tile-content>
                        </v-list-tile>
                        <v-divider></v-divider>
                        <v-list-tile>
                          <v-list-tile-action>
                            <v-icon>call</v-icon>
                          </v-list-tile-action>
                          <v-list-tile-content>
                            <v-list-tile-sub-title>Nomor Telepon</v-list-tile-sub-title>
                            <v-list-tile-title>{{order.handphone}}</v-list-tile-title>
                          </v-list-tile-content>
                        </v-list-tile>
                        <v-divider></v-divider>
                        <v-list-tile>
                          <v-list-tile-action>
                            <v-icon>pin_drop</v-icon>
                          </v-list-tile-action>
                          <v-list-tile-content>
                            <v-list-tile-sub-title>Alamat</v-list-tile-sub-title>
                            <v-list-tile-title>{{order.address}}</v-list-tile-title>
                          </v-list-tile-content>
                        </v-list-tile>
                      </v-list>

                      <v-list>
                        <v-toolbar dense flat>
                          <v-toolbar-title class="subheading font-weight-light">Pekerja yang dipilih</v-toolbar-title>
                        </v-toolbar>
                        <v-list-tile v-if="order.labor != null">
                          <v-list-tile-content>
                            <v-list-tile-title
                              class="text-xs-right green--text"
                            >{{order.labor.name}}</v-list-tile-title>
                            <v-list-tile-sub-title
                              class="text-xs-right green--text text--lighten-3"
                            >{{jobs[order.labor.job_id-1].text}}</v-list-tile-sub-title>
                          </v-list-tile-content>
                          <v-list-tile-action>
                            <v-icon color="success">perm_identity</v-icon>
                          </v-list-tile-action>
                        </v-list-tile>
                        <v-list-tile v-else>
                          <v-spacer></v-spacer>
                          <v-chip color="orange" label outline>Prefensi pekerja terlampir</v-chip>
                        </v-list-tile>
                      </v-list>
                    </v-card-text>
                  </v-card>
                </v-hover>
              </template>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex xs12 v-else-if="orders.data.length == 0 && !fetchProgress ">
          <v-card flat class="text-xs-center" color="transparent">
            <v-card-text class="grey--text text-lighten-2">
              <v-icon size="150" color="grey lighten-2">assignment</v-icon>
              <div class="headline">Tidak ada pesanan</div>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
      
      <!-- Fetch order loader -->
      <v-layout row wrap v-if="fetchProgress">
        <v-flex xs12 class="text-xs-center">
          <v-progress-circular size="55" indeterminate width="2" color="primary"></v-progress-circular>
        </v-flex>
      </v-layout>
    </v-container>

    <!-- Dialog reject order -->
    <v-dialog v-model="dialog" max-width="500">
      <v-card>
        <v-card-title class="title error--text">
          <v-icon color="error" left>warning</v-icon>Tolak Pesanan
        </v-card-title>
        <v-card-text
          class="subheading"
        >Anda tidak akan melihat pesanan ini lagi. Apakah anda yakin menolak pesanan ini?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-progress-circular size="25" v-show="progress" indeterminate width="2" color="primary"></v-progress-circular>
          <v-btn flat="flat" v-if="!progress" @click="dialog = false">Tidak</v-btn>
          <v-btn color="error" v-if="!progress" depressed dark @click="delOrder()">Ya</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      orders: {
        data: []
      },
      fetchProgress: false,
      progress: false,
      dialog: false,
      page: 0,
      order_id: "",
      date: "",
      jobs: [],
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
    fetchOrder() {
      this.fetchProgress = true;
      let url = this.page == 0 ? "orders" : `orders?page=${this.page}`;
      this.$http
        .get(url, this.headers)
        .then(ress => {
          this.orders = ress.data;
          this.fetchProgress = false;
          console.log(ress.data);
        })
        .catch(e => {
          this.fetchProgress = false;
          console.log(e.response);
        });
    },
    delOrder() {
      this.progress = true;
      this.$http
        .delete(`order/${this.order_id}`, this.headers)
        .then(ress => {
          this.dialog = false;
          this.progress = false;
          this.fetchOrder();
        })
        .catch(e => {
          this.progress = false;
          console.log(e.response);
        });
    },
    delDialog(id) {
      this.dialog = true;
      this.order_id = id;
    },
    dateOrder(date) {
      moment.locale('id')
      return moment(date).format("DD/MMMM/YYYY");
    },
    detail(id, labor, order_labor) {
      console.log("id", id);
      this.$router.push({ name: "order-edit", params: { data: id } });
      // this.$store.commit("labor/SET_ORDER_LABOR", labor);
      // this.$store.commit("labor/SET_ORDER_LABOR_REQ", order_labor);
    }
  },
  created() {
    this.fetchOrder();
    this.jobs = this.$store.getters["labor/jobs"];
  }
};
</script>

<style scoped>
.options--reveal {
  align-items: center;
  top: 0;
  z-index: 4;
  justify-content: center;
  opacity: 0.7;
  position: absolute;
  width: 100%;
}
</style>
