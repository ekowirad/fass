<template>
  <div>
    <v-text-field
      placeholder="Cari nama atau id registrasi pekerja "
      :prepend-icon="'filter_list'"
      :append-icon="'search'"
      v-model="search.searchbox"
      @click:prepend="filter = !filter"
      @click:append="searchFilter()"
      flat
      solo
    ></v-text-field>
    <v-slide-y-transition>
      <v-card flat v-if="filter">
        <v-toolbar dense flat color="grey lighten-2">
          <v-toolbar-title class="title font-weight-regular primary--text">
            <v-icon color="primary" left>filter_list</v-icon>Filter Pencarian
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn flat @click="resetSearch">
              <v-icon>clear</v-icon>Reset
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text>
          <v-layout row wrap>
            <v-flex xs12 md3>
              <v-select :items="statuses" item-value="id" v-model="search.status" label="Status"></v-select>
            </v-flex>
            <v-flex xs12 md3>
              <v-select
                :items="genders"
                item-value="idx"
                v-model="search.sex"
                label="Jenis Kelamin"
              ></v-select>
            </v-flex>
            <v-flex xs12 md3>
              <v-select
                :items="marital_status"
                item-value="idx"
                v-model="search.marital_status"
                label="Status Pernikahan"
              ></v-select>
            </v-flex>
            <v-flex xs12 md3>
              <v-select :items="religions" item-value="idx" v-model="search.religion" label="Agama"></v-select>
            </v-flex>
            <v-flex xs12 md3>
              <v-select
                :items="educations"
                item-value="idx"
                v-model="search.education"
                label="Pendidikan"
              ></v-select>
            </v-flex>
            <v-flex xs12 md3>
              <v-select :items="ethnics" item-value="idx" v-model="search.ethnic_id" label="Etnik"></v-select>
            </v-flex>
            <v-flex xs12 md3>
              <v-select
                label="Provinsi"
                :items="provinces"
                item-value="id"
                v-model="search.province_id"
                autocomplete
              ></v-select>
            </v-flex>
            <v-flex xs12 md3>
              <v-select
                label="Kabupaten"
                :items="regencies"
                item-value="id"
                v-model="search.regency_id"
                autocomplete
              ></v-select>
            </v-flex>
            <v-flex xs12 md12 class="mr-3">
              <v-range-slider
                color="primary"
                label="Umur"
                step="10"
                ticks="always"
                thumb-label="always"
                v-model="search.age"
                max="60"
              ></v-range-slider>
            </v-flex>
            <v-flex xs12 md3>
              <v-select
                :items="timeType"
                item-value="idx"
                v-model="search.price.type"
                label="Jenis Gaji"
              ></v-select>
            </v-flex>
            <v-flex xs12 md9>
              <v-currency-field
                label="Gaji (Minimal)"
                v-model="search.price.min"
                v-bind="currency_options"
                prefix="Rp"
              ></v-currency-field>
              <v-currency-field
                label="Gaji (Maximal)"
                v-model="search.price.max"
                v-bind="currency_options"
                prefix="Rp"
              ></v-currency-field>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-slide-y-transition>
  </div>
</template>

<script>
export default {
  name: "LaborFilter",
  methods: {
    resetSearch() {
      // this.$emit("search-reset-clicked")
      this.search = {
        job_id: this.job_id,
        age: [0, 60],
        price: {
          min: 0,
          max: 0
        }
      }
      console.log('reset search', this.search)
    },
    searchFilter() {
      this.filter = false
      this.search.job_id = this.job_id
      this.$emit("search-clicked", this.search);
    }
  },
  data() {
    return {
      job_id: "",
      currency_options: {
        thousands: ".",
        precision: 0,
        masked: false
      },
      ethnics: [],
      provinces: [],
      regency: [],
      statuses: [],
      marital_status: [
        { text: "Lajang", idx: 1 },
        { text: "Menikah", idx: 2 },
        { text: "Duda", idx: 3 },
        { text: "Janda", idx: 4 }
      ],
      educations: [
        { text: "Tidak Sekolah", idx: 1 },
        { text: "SD", idx: 2 },
        { text: "SMP", idx: 3 },
        { text: "SMA", idx: 4 }
      ],
      religions: [
        { text: "Islam", idx: 1 },
        { text: "Kristen", idx: 2 },
        { text: "Katolik", idx: 3 },
        { text: "Hindu", idx: 4 },
        { text: "Budha", idx: 5 },
        { text: "Konghucu", idx: 6 }
      ],
      timeType: [
        { text: "Per-Jam", idx: "price_hour" },
        { text: "Per-Hari", idx: "price_day" },
        { text: "Per-Bulan (Tetap)", idx: "price_month" }
      ],
      ages: ["0", "10", "20", "30", "40", "50", "60"],
      genders: [{ text: "Perempuan", idx: 1 }, { text: "Laki-laki", idx: 2 }],
      search: {
        age: [0, 60],
        price: {
          min: 0,
          max: 0
        }
      },
      filter: false
    };
  },
  computed: {
    regencies() {
      let regencies = Array.from(this.regency).filter(
        data => data.province_id == this.search.province_id
      );
      return regencies;
    }
  },
  created() {
    switch (this.$route.name) {
      case "prt-list":
        this.job_id = 1;
        break;
      case "babysitter-list":
        this.job_id = 2;
        break;
      case "caregiver-list":
        this.job_id = 3;
        break;

      default:
        break;
    }
    this.ethnics = this.$store.getters["labor/ethnics"];
    this.provinces = this.$store.getters["labor/provinces"];
    this.regency = this.$store.getters["labor/regencies"];
    this.statuses = Array.from(this.$store.getters["labor/statuses"]).filter(
      data => data.type == 2
    );
  }
};
</script>

<style scoped>
</style>
