<template>
  <div class="mitra-spec">
    <v-container grid-list-xs>
      <!-- <v-layout row wrap>
          <v-flex xs10>
            <v-btn block depressed color="success" @click="searchLabor">Cari</v-btn>
          </v-flex>
          <v-flex xs2>
            <v-btn @click="reset" icon flat depressed color="success">
              <v-icon>clear</v-icon>
            </v-btn>
          </v-flex>
      </v-layout>-->
      <v-select :items="jobs" item-value="id" v-model="search.job_id" label="Pekerjaan" @input="setSpecs()"></v-select>
      <v-combobox deletable-chips v-model="search.skills" label="Keahlian" chips clearable multiple></v-combobox>
      <v-select :items="genders" item-value="idx" v-model="search.sex" label="Jenis Kelamin"></v-select>
      <v-select
        :items="marital_status"
        item-value="idx"
        v-model="search.marital_status"
        label="Status"
      ></v-select>
      <v-select :items="educations" item-value="idx" v-model="search.education" label="Pendidikan"></v-select>
      <v-select :items="religions" item-value="idx" v-model="search.religion" label="Agama"></v-select>
      <v-select :items="ethnics" item-value="id" v-model="search.ethnic_id" label="Etnik"></v-select>
      <v-range-slider
        class="mt-4 mr-2"
        color="success"
        label="Umur"
        step="10"
        ticks="always"
        thumb-label="always"
        v-model="search.age"
        max="60"
      ></v-range-slider>
      <v-checkbox color="success" label="Tidak Takut Anjing" v-model="search.dog_fear"></v-checkbox>
      <v-checkbox color="success" label="Mengerti Bahasa Inggris" v-model="search.speak_english"></v-checkbox>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currency_options: {
        thousands: ".",
        precision: 0,
        masked: false
      },
      ethnics: [],
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
      jobs: [],
      ages: ["0", "10", "20", "30", "40", "50", "60"],
      search: {
        age: [0, 60],
      },
      genders: [{ text: "Perempuan", idx: 1 }, { text: "Laki-laki", idx: 2 }]
    };
  },
  methods:{
    setSpecs(){
      this.$emit("specs-clicked", this.search);
    }

  },
  created() {
    this.ethnics = this.$store.getters["labor/ethnics"];
    this.jobs = this.$store.getters["labor/jobs"];
  }
};
</script>

<style>
</style>