<template>
  <div class="order-list">
    <v-container fluid grid-list-lg>
      <v-layout row wrap align-center>
        <v-flex xs6 v-for="(order, index) in orders" :key="index">
          <template>
            <v-hover>
              <v-card slot-scope="{hover}" :class="`elevation-${hover ? 7 : 0}`">
                <v-expand-transition>
                  <v-toolbar v-if="hover" dense class="options--reveal black">
                    <v-spacer></v-spacer>
                    <v-btn flat icon dark @click="detail(order.id, order.labor, order.order_labor)">
                      <v-icon>create</v-icon>
                    </v-btn>
                    <v-btn flat icon dark @click.stop="delDialog(user)">
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
                        <v-list-tile-title class="text-xs-right green--text">{{order.labor.name}}</v-list-tile-title>
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

                <!-- <v-card-text>{{order.id}}</v-card-text> -->
              </v-card>
            </v-hover>
          </template>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      orders: [],
      page: null,
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
      this.$http
        .get(`orders`, this.headers)
        .then(ress => {
          this.orders = ress.data;
          console.log(ress.data);
        })
        .catch(e => {
          console.log(e.response);
        });
    },
    dateOrder(date) {
      return moment(date).format("DD/MMMM/YYYY");
    },
    detail(id, labor, order_labor) {
      console.log("id", id)
      this.$router.push({ name: "order-edit", params: { data: id } });
      if (labor != null) {
        this.$store.commit("labor/SET_ORDER_LABOR", labor);
      } else {
        this.$store.commit("labor/SET_ORDER_LABOR_REQ", order_labor);
      }
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
  z-index: 1;
  justify-content: center;
  opacity: 0.7;
  position: absolute;
  width: 100%;
}
</style>
