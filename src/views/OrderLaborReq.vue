<template>
  <div class="order-labor-req">
    <v-chip>
      Pekerjaan: &nbsp;
      <span
        class="body-2"
      >{{labor.job_id != null? jobs[labor.job_id-1].text : '-'}}</span>
    </v-chip>
    <v-list>
      <v-list-tile>
        <v-layout row wrap>
          <v-flex xs6>
            <v-list-tile-content>
              <v-list-tile-sub-title>Umur</v-list-tile-sub-title>
              <v-list-tile-title>{{labor.age[0]}} - {{labor.age[1]}} thn</v-list-tile-title>
            </v-list-tile-content>
          </v-flex>
          <v-flex xs6>
            <v-list-tile-content>
              <v-list-tile-sub-title>Jenis Kelamin</v-list-tile-sub-title>
              <v-list-tile-title>{{labor.sex != null? genders[labor.sex-1].text : '-'}}</v-list-tile-title>
            </v-list-tile-content>
          </v-flex>
        </v-layout>
      </v-list-tile>
      <v-divider></v-divider>
      <v-list-tile>
        <v-layout row wrap>
          <v-flex xs6>
            <v-list-tile-content>
              <v-list-tile-sub-title>Status</v-list-tile-sub-title>
              <v-list-tile-title>{{labor.marital_status != null? marital_status[labor.marital_status-1].text : '-'}}</v-list-tile-title>
            </v-list-tile-content>
          </v-flex>
          <v-flex xs6>
            <v-list-tile-content>
              <v-list-tile-sub-title>Pendidikan</v-list-tile-sub-title>
              <v-list-tile-title>{{labor.education != null? educations[labor.education-1].text : '-'}}</v-list-tile-title>
            </v-list-tile-content>
          </v-flex>
        </v-layout>
      </v-list-tile>
      <v-divider></v-divider>
      <v-list-tile>
        <v-layout row wrap>
          <v-flex xs6>
            <v-list-tile-content>
              <v-list-tile-sub-title>Agama</v-list-tile-sub-title>
              <v-list-tile-title>{{labor.religion != null? religions[labor.religion-1].text : '-'}}</v-list-tile-title>
            </v-list-tile-content>
          </v-flex>
          <v-flex xs6>
            <v-list-tile-content>
              <v-list-tile-sub-title>Suku</v-list-tile-sub-title>
              <v-list-tile-title>{{labor.ethnic_id != null? ethnics[labor.ethnic_id-1].text : '-'}}</v-list-tile-title>
            </v-list-tile-content>
          </v-flex>
        </v-layout>
      </v-list-tile>
      <v-divider></v-divider>
      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-sub-title>Gaji {{labor.price.type != null? priceType.text : ''}}</v-list-tile-sub-title>
          <v-list-tile-title>{{salary}}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-divider></v-divider>
      <v-list-tile avatar>
        <v-layout wrap>
          <v-flex xs6>
            <v-checkbox
              label="Bisa bahasa inggris"
              color="success"
              readonly
              v-model="labor.speak_english"
            ></v-checkbox>
          </v-flex>
          <v-flex xs6>
            <v-checkbox
              label="Tidak takut anjing"
              color="success"
              readonly
              v-model="labor.dog_fear"
            ></v-checkbox>
          </v-flex>
        </v-layout>
      </v-list-tile>
      <div v-if="labor.skills != null">
        <v-item-group multiple v-if="labor.skills.length != 0">
          <v-item v-for="n in labor.skills" :key="n">
            <v-chip>{{ n }}</v-chip>
          </v-item>
        </v-item-group>
      </div>
    </v-list>
  </div>
</template>

<script>
export default {
  data() {
    return {
      labor: {},
      ethnics: [],
      price: "",
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
      genders: [{ text: "Perempuan", idx: 1 }, { text: "Laki-laki", idx: 2 }],
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
        { text: "Per-Bulan(Tetap)", idx: "price_month" }
      ],
      jobs: []
    };
  },
  computed: {
    priceType() {
      let type = Array.from(this.timeType).find(
        data => data.idx == this.labor.price.type
      );
      return type;
    },
    salary() {
      let price = "";
      if (this.labor.price.min == 0 && this.labor.price.max == 0) {
        price = "-";
      } else {
        price =
          "Rp " +
          this.formatPrice(this.labor.price.min) +
          " - " +
          "Rp " +
          this.formatPrice(this.labor.price.max);
      }
      return price;
    }
  },
  created() {
    this.params = this.$store.getters["labor/orderLaborReq"];
    this.jobs = this.$store.getters["labor/jobs"];
    this.ethnics = this.$store.getters["labor/ethnics"];
    this.labor = this.params;
    console.log("order labor req", this.labor);
  },
  mounted() {},
  methods: {
    formatPrice(value) {
      let val = (value / 1).toFixed(0).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
  }
};
</script>

<style scoped>
</style>
