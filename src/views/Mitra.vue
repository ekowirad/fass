<template>
  <div class="user-home">
    <v-navigation-drawer app>
      <v-container grid-list-xs>
        <v-layout row wrap>
          <v-flex xs10>
            <v-btn block depressed color="success" @click="searchLabor">Cari</v-btn>
          </v-flex>
          <v-flex xs2>
            <v-btn @click="reset" icon flat depressed color="success">
              <v-icon>clear</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
        <v-select :items="jobs" item-value="id" v-model="search.job_id" label="Pekerjaan"></v-select>
        <v-combobox
          deletable-chips
          v-model="search.skills"
          label="Keahlian"
          chips
          clearable
          multiple
        ></v-combobox>
        <v-select :items="genders" item-value="idx" v-model="search.sex" label="Jenis Kelamin"></v-select>
        <v-select
          :items="marital_status"
          item-value="idx"
          v-model="search.marital_status"
          label="Status"
        ></v-select>
        <v-select
          :items="educations"
          item-value="idx"
          v-model="search.education"
          label="Pendidikan"
        ></v-select>
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
        <v-select :items="timeType" item-value="idx" v-model="search.price.type" label="Jenis Gaji"></v-select>
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

        <v-checkbox color="success" label="Tidak Takut Anjing" v-model="search.dog_fear"></v-checkbox>
        <v-checkbox color="success" label="Mengerti Bahasa Inggris" v-model="search.speak_english"></v-checkbox>
      </v-container>
    </v-navigation-drawer>

    <v-container grid-list-lg>
      <v-layout row wrap align-center v-if="labors.data.length != 0">
        <v-flex xs12 md3 v-for="labor in labors.data" :key="labor.id">
          <v-hover>
            <v-card flat slot-scope="{ hover }" :class="`elevation-${hover ? 6 : 0}`">
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
                <v-chip small>{{jobs[labor.job_id-1].text}}</v-chip>
              </div>
              <v-list>
                <v-list-tile>
                  <v-list-tile-action>
                    <v-icon>perm_identity</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-content>
                    <v-list-tile-title>{{genders[labor.sex-1].text}} ({{labor.age}} thn)</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-action>
                    <v-icon>pin_drop</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-content>
                    <v-list-tile-sub-title>Asal</v-list-tile-sub-title>
                    <v-list-tile-title>{{lowerCase(labor.birth_place)}}</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list>
              <v-card-text>
                <v-layout justify-center align-center row wrap>
                  <v-flex xs12 class="text-xs-right">
                    <v-spacer></v-spacer>
                    <div
                      class="font-weight-medium subheading indigo--text text--darken-4"
                    >Rp. {{formatPrice( labor.price_month)}}/ bulan</div>
                    <v-btn
                      small
                      outline
                      round
                      @click="detail(labor.id)"
                      color="success"
                    >Selengkapnya</v-btn>
                  </v-flex>
                </v-layout>
              </v-card-text>
            </v-card>
          </v-hover>
        </v-flex>
        <v-flex xs12>
          <v-footer style="background-color:transparent" class="mt-4 justify-center">
            <v-pagination
              @input="isSearch? searchLabor() : fetchLabor()"
              :length="labors.meta.last_page"
              v-model="page"
            ></v-pagination>
          </v-footer>
        </v-flex>
      </v-layout>
      <v-layout fill-height row wrap v-else>
        <v-flex xs12 class="text-xs-center">
          <div class="headline">
            Maaf, pekerja yang anda inginkan tidak ditemukan
          </div>
          <div
            class="subheading"
          >Anda bisa mengirimkan spesifikasi pekerja yang anda cari tadi, dan kami akan bantu carikan</div>
          <v-img class="my-4" :src="searchIlustrator" max-height="310" contain></v-img>
          <v-btn depressed large @click="order()" color="success">Pesan Sekarang</v-btn>

        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchIlustrator: require("@/assets/search_mitras.svg"),
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
        price: {
          min: 0,
          max: 0
        }
      },
      genders: [{ text: "Perempuan", idx: 1 }, { text: "Laki-laki", idx: 2 }],
      labors: {},
      isSearch: false,
      page: 0
    };
  },
  created() {
    this.ethnics = this.$store.getters["labor/ethnics"];
    this.jobs = this.$store.getters["labor/jobs"];
    this.fetchLabor();
  },
  methods: {
    order(){
      this.$store.commit("labor/SET_ORDER_MITRA", this.search)
      this.$router.push({name: 'mitra-order', params:{data: this.search}})
    },
    detail(id) {
      this.$router.push({ name: "mitra-det", params: { data: id } });
    },
    reset() {
      this.fetchLabor();
      this.search = {
        age: [0, 60],
        price: {
          min: 0,
          max: 0
        }
      };
    },
    lowerCase(text) {
      let val = text.toLowerCase().trim();
      return val;
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(0).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    fetchLabor() {
      let url = this.page == 0 ? "mitras" : `mitras?page=${this.page}`;
      this.$http
        .get(url)
        .then(ress => {
          this.labors = ress.data;
          console.log(ress);
        })
        .catch(e => {
          console.log(e.response);
        });
    },
    searchLabor() {
      this.isSearch = true;
      console.log(this.search);
      let url = this.page == 0 ? "search" : `search?page=${this.page}`;
      this.$http
        .post(url, this.search)
        .then(ress => {
          console.log(ress.data);
          this.labors = ress.data;
        })
        .catch(e => {
          console.log("search error", e.response);
        });
    }
  }
};
</script>

<style scoped>
</style>
