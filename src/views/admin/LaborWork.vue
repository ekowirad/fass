<template>
  <div class="labor-work-history">
    <v-dialog v-model="dialog" scrollable max-width="750">
      <v-card>
        <v-card-title class="title">
          <v-icon left>storage</v-icon>Rotasi Kerja
          <v-spacer></v-spacer>
          <v-btn flat small icon depressed @click="dialog = false">
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
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      workHistory: [],
      dialog: false,
      colors: [
        { id: 1, color: "blue" },
        { id: 2, color: "lime" },
        { id: 3, color: "dark_pink" }
      ],
      timeTypes: [
        { text: "Per-Jam", id: "price_hour" },
        { text: "Per-Hari", id: "price_day" },
        { text: "Per-Bulan (Tetap)", id: "price_month" }
      ]
    };
  },
  methods: {
    dateFormat(date) {
      return moment(date).format("DD/MMMM/YYYY");
    },
  },
  created() {
    this.workHistory = this.$store.getters["labor/workHistory"];
    this.$store.watch(
      state => {
        return this.$store.getters["labor/workHistory"];
      },
      (newVal, oldVal) => {
        this.workHistory = newVal;
      })
  }
};
</script>

<style>
</style>