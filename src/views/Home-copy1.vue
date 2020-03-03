<template>
  <div class="user-home">
    <div class="v-responsive" style="height:600px;">
      <v-layout row align-center justify-center fill-height>
        <v-flex xs6>
          <v-img :src="landingImg" max-height="400" contain></v-img>
        </v-flex>
        <v-flex xs6>
          <v-card flat color="transparent">
            <v-card-text>
              <span class="display-2 font-weight-bold">Selamat Datang</span>
              <p class="display-2 font-weight-light">di Yayasan Kasih Keluarga</p>
            </v-card-text>
            <v-card-text>Yayasan kasih keluarga merupakan lembaga pengasuhan pertama dan terpercaya di Bali yang berdiri sejak 1995. Lembaga ini khusus melayani Baby sitter ( Pengasuh Bayi ), pekarya kesehatan ( Pengasuh orang sakit di Rumah), Pengasuh orang tua/ Lansia di Rumah ( Care Giver ) dan Asisten Rumah Tangga ( House Maids). Staff kami sudah berpengalaman, terlatih dan profesional dalam mengelola lembaga pengasuhan Rumah Tangga. Lembaga ini terbiasa melayani tamu yang berlibur kebali khususnya daerah kuta, sanur, jimbaran,nusa dua,peti tenget, lovina,uluwatu dan Ubud. Lembaga ini mendapat ijin pendidikannya dari dari kementerian pendidikan dan penyaluran kerjanya dari kementerian tenaga kerja.Saat ini memiliki tenaga kerja tercatat 1800 orang.</v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </div>
    
    <v-layout row align-center justify-center fill-height style="background-color: #fff">
      <v-container grid-list-md fill-height>
        <v-flex xs6>
          <v-card flat color="transparent">
            <v-card-title primary-title>
              <h2>Visi</h2>
              <p>Menjadi lembaga pengasuhan yang terampil untuk masyarakat local dan internasional. Become a skilled parenting agency for local and international communities.</p>
            </v-card-title>
            <v-card-title primary-title>
              <h2>Misi</h2>
              <p>1. Mendidik dan menyalurkan baby sitter terampil untuk mengasuh bayi (Educate and distribute skilled baby sitter to nurture the baby)</p>
              <p>2. Mendidik dan menyalurkan Nany terampil mengasuh Anak Balita (Educate and channel skilled Nany to take care of Toddlers)</p>
              <p>
                3. Mendidik dan menyalurkan Pekarya kesehatan untuk mengasuh
                orang sakit di Rumah (Educate and channel Pekarya health to care for
                the sick at Home).
              </p>
              <p>4. Mendidik dan menyalurkan Care Giver untuk mengasuh orang tua atau lansia di Rumah (Educate and distribute Care Giver to care for elderly or elderly at Home)</p>

              <p>5. Mendidik dan menyalurkan Asisten Rumah Tangga untuk mengurus rumah (Educate and distribute a House Assistant to take care of the house)</p>
            </v-card-title>
          </v-card>
        </v-flex>
        <v-flex xs6 class="text-xs-center">
          <span class="display-2 font-weight-bold">Visi & Misi</span>
        </v-flex>
      </v-container>
    </v-layout>
    <v-container grid-list-lg>
      <h1 class="indigo--text text--darken-4 mb-4">Biaya dan Syarat Pengambilan Tenaga Kerja</h1>
      <v-layout row wrap>
        <v-flex xs6>
          <v-card flat>
            <v-card-title primary-title>
              <h2>Pemakaian Bulanan</h2>
            </v-card-title>
            <v-card-text>
              <p>1. Membayar administrasi Rp 1.350.000 untuk dipakai di bali</p>
              <p>2. Membayar administrasi Rp 1.700.000 untuk dipakai di luar bali</p>
              <p>
                3. Membayar gaji bulan pertama saat pengemabilan tenaga kepada yayasan, besaran gaji dalam satu bulan sebagai berikut:
                <br />&emsp; a. Pengasuh bayi/Baby sitter: Rp 2.500.000 - 3.200.000
                <br />&emsp; b. Pengasuh anak balita/Nanny: Rp 2.300.000 - 2.800.000
                <br />&emsp; c. Pengasuh orang tua/Care giver: Rp 3.200.000 - 3.500.000
                <br />&emsp; d. Pengasuh orang sakit/Pekarya kesehatan: Rp 2.500.000 - 3.500.000
                <br />&emsp; e. Pembantu momong: Rp 1.600.000 - 1.800.000
                <br />&emsp; f. Asisten rumah tangga: Rp 1.200.000 - 1.800.000
              </p>
              <p>4. Bila bekerja lebih dari 6 bulan tenaga tersebut diberi baju seragam satu pasang</p>
              <p>5. Memberi cuti satu hari dalam satu bulan atau uang pengganti Rp. 150.000</p>
              <p>6. Bila tenaga mengalami sakit ringan maka majikan wajib membelikan obat</p>
              <p>7. Dalam bekerja keperluan sehari seperti odol, sabun, dan sikat gigi ditanggung majikan</p>
              <p>
                8. Bila tenaga tersebut tidak cocok dalam 3 bulan, maka tenaga tersebut diganti satu kali dengan syarat:
                <br />&emsp; a. Tenaga pengganti disesuaikan dengan kondisi tenaga yang ada di yayasan
                <br />&emsp; b. Tenaga yang tidak cocok harus dikembalikan ke yayasan dan
                <br />&emsp; gajinya dibayar harian dan semua pakaiannya diperiksa terlebih dahulu
                <br />&emsp; c. Bila tidak minta pengganti administrasi kembali 50% dan surat perjanjianya
                <br />&emsp; dikembalikan ke yayasan
                <br />&emsp; d. Bila tenaga tersebut diberikan izin pulang masih masa garansi, yayasan
                <br />&emsp; tidak akan mengganti
              </p>
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs6>
          <v-layout wrap>
            <v-flex xs12>
              <v-card flat>
                <v-card-title primary-title>
                  <h2>Pemakaian Harian</h2>
                </v-card-title>
                <v-card-text>
                  <p>1. Membayar administrasi pengambilan Rp 200.000</p>
                  <p>2. Membayar gaji harian setelah bekerja</p>
                  <p>
                    3. Besarnya gaji baby sitter harian:
                    <br />&emsp; a. untuk perumahan full time antara Rp 150.000 - 250.000
                    <br />&emsp; b. untuk perumahan short time (8 jam) pulang kerumah
                    <br />&emsp; antara Rp 100.000 - 150.000
                    <br />&emsp; c. untuk RS/Villa/Hotel full time antara Rp 250.000 - 300.000
                    <br />&emsp; d. untuk RS/Villa/Hotel short time (8 jam) pulang kerumah
                    <br />&emsp; antara Rp 250.000 - 300.000
                  </p>
                  <p>
                    4. Besarnya gaji asisten rumah tangga harian: 125.000/hari
                  </p>
                  <p>
                    5. Besarnya gaji pengasuh orang tua/Care giver harian: 250.000 - 300.000/hari
                  </p>
                </v-card-text>
              </v-card>
            </v-flex>
            <v-flex xs12>
              <v-card flat>
                <v-card-title primary-title>
                  <h2>Pemakaian Perjam</h2>
                </v-card-title>
                <v-card-text>
                  Pemakaian tenaga per jam Rp 75.000 dan menggunakan minimal 4 jam
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>

    <div class="v-responsive">
      <v-flex xs12>
        <v-img src="https://source.unsplash.com/daily" height="400">
          <v-container style=" background-color: rgba(0, 0, 0, 0.705);" fill-height fluid>
            <v-layout class="text-xs-center" align-center row fill-height>
              <v-flex xs12>
                <span
                  class="display-1 white--text font-weight-thin"
                >Cari asisten rumah tangga, perawat bayi ataupun lansia?</span>
                <br />
                <span class="display-1 white--text font-weight-normal">Disni tempatnya</span>
                <p></p>
                <p>
                  <v-btn depressed large color="white" :to="{name: 'pesan'}">Pesan Sekarang</v-btn>
                </p>
              </v-flex>
            </v-layout>
          </v-container>
        </v-img>
      </v-flex>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      landingImg: require("@/assets/about_us3.svg"),
      apiUrl: [
        "provinces",
        "regencies",
        "districts",
        "ethnics",
        "statuses",
        "jobs"
      ]
    };
  },
  methods: {
    getDataLib() {
      axios
        .all([
          this.dataLibReq(this.apiUrl[0]),
          this.dataLibReq(this.apiUrl[1]),
          this.dataLibReq(this.apiUrl[2]),
          this.dataLibReq(this.apiUrl[3]),
          this.dataLibReq(this.apiUrl[4]),
          this.dataLibReq(this.apiUrl[5])
        ])
        .then(
          axios.spread(
            (provinces, regencies, districts, ethnics, statuses, jobs) => {
              this.$store.commit("labor/SET_PROVINCES", provinces.data);
              this.$store.commit("labor/SET_REGENCIES", regencies.data);
              this.$store.commit("labor/SET_DISTRICTS", districts.data);
              this.$store.commit("labor/SET_ETHNICS", ethnics.data);
              this.$store.commit("labor/SET_STATUSES", statuses.data);
              this.$store.commit("labor/SET_JOBS", jobs.data);
            }
          )
        )
        .catch(e => {
          console.log("catch data lib failed: ", e.reponse);
        });
    },
    dataLibReq(url) {
      return this.$http.get(`data_lib/${url}`);
    }
  },
  created() {
    if (this.$store.getters["labor/jobs"].length != 0) {
      console.log("data lib has been filled, check vuex");
    } else {
      this.getDataLib();
    }
  }
};
</script>

<style>
</style>
