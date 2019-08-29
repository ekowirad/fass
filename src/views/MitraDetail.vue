<template>
  <div class="mitra-det">
    <v-container grid-list-md>
      <v-layout row wrap>
        <v-flex xs12 md9>
          <v-card flat>
            <v-card-text>
              <v-layout row wrap>
                <v-flex xs6>
                  <v-card flat>
                    <v-toolbar flat>
                      <v-toolbar-side-icon>
                        <v-icon>account_box</v-icon>
                      </v-toolbar-side-icon>
                      <v-toolbar-title class="font-weight-light subheading">Profil</v-toolbar-title>
                    </v-toolbar>
                    <v-list two-line>
                      <v-list-tile>
                        <v-list-tile-content>
                          <v-list-tile-sub-title>Jenis Kelamin</v-list-tile-sub-title>
                          <v-list-tile-title>{{genders[labor.sex-1].text}}</v-list-tile-title>
                        </v-list-tile-content>
                      </v-list-tile>
                      <v-divider></v-divider>
                      <v-list-tile>
                        <v-list-tile-content>
                          <v-list-tile-sub-title>Status</v-list-tile-sub-title>
                          <v-list-tile-title>{{marital_status[labor.marital_status-1].text}}</v-list-tile-title>
                        </v-list-tile-content>
                      </v-list-tile>
                      <v-divider></v-divider>
                      <v-list-tile>
                        <v-list-tile-content>
                          <v-list-tile-sub-title>Kelahiran</v-list-tile-sub-title>
                          <v-list-tile-title>{{labor.birth_date}}</v-list-tile-title>
                        </v-list-tile-content>
                      </v-list-tile>
                      <v-divider></v-divider>
                      <v-list-tile>
                        <v-list-tile-content>
                          <v-list-tile-sub-title>Umur</v-list-tile-sub-title>
                          <v-list-tile-title>{{labor.age}}</v-list-tile-title>
                        </v-list-tile-content>
                      </v-list-tile>
                      <v-divider></v-divider>
                      <v-list-tile>
                        <v-list-tile-content>
                          <v-list-tile-sub-title>Asal</v-list-tile-sub-title>
                          <v-list-tile-title>{{lowerCase(labor.birth_place)}}</v-list-tile-title>
                        </v-list-tile-content>
                      </v-list-tile>
                      <v-divider></v-divider>
                      <v-list-tile>
                        <v-list-tile-content>
                          <v-list-tile-sub-title>Suku</v-list-tile-sub-title>
                          <v-list-tile-title>{{ethnic}}</v-list-tile-title>
                        </v-list-tile-content>
                      </v-list-tile>
                      <v-divider></v-divider>
                      <v-list-tile>
                        <v-list-tile-content>
                          <v-list-tile-sub-title>Pendidikan</v-list-tile-sub-title>
                          <v-list-tile-title>{{educations[labor.education-1].text}}</v-list-tile-title>
                        </v-list-tile-content>
                      </v-list-tile>
                      <v-divider></v-divider>
                      <v-list-tile>
                        <v-list-tile-content>
                          <v-list-tile-sub-title>Agama</v-list-tile-sub-title>
                          <v-list-tile-title>{{religions[labor.religion-1].text}}</v-list-tile-title>
                        </v-list-tile-content>
                      </v-list-tile>
                      <v-divider></v-divider>
                      <v-list-tile>
                        <v-list-tile-content>
                          <v-list-tile-sub-title>Berat Badan</v-list-tile-sub-title>
                          <v-list-tile-title>{{labor.weight}} Kg</v-list-tile-title>
                        </v-list-tile-content>
                      </v-list-tile>
                      <v-divider></v-divider>
                      <v-list-tile>
                        <v-list-tile-content>
                          <v-list-tile-sub-title>Tinggi Badan</v-list-tile-sub-title>
                          <v-list-tile-title>{{labor.height}} Cm</v-list-tile-title>
                        </v-list-tile-content>
                      </v-list-tile>
                      <v-divider></v-divider>
                    </v-list>
                  </v-card>
                </v-flex>
                <v-flex xs6>
                  <v-card flat>
                    <v-toolbar flat>
                      <v-toolbar-side-icon>
                        <v-icon>flag</v-icon>
                      </v-toolbar-side-icon>
                      <v-toolbar-title class="font-weight-light subheading">Keahlian</v-toolbar-title>
                    </v-toolbar>
                    <v-list>
                      <v-list-tile>
                        <v-checkbox label="Tidak takut anjing" color="success" readonly v-model="labor.dog_fear"></v-checkbox>
                      </v-list-tile>
                      <v-divider></v-divider>
                      <v-list-tile>
                        <v-checkbox
                          label="Bisa bahasa inggris"
                          color="success"
                          readonly
                          v-model="labor.speak_english"
                        ></v-checkbox>
                      </v-list-tile>
                      <v-divider></v-divider>
                      <template v-for="(skill, index) in labor.skills">
                        <v-list-tile :key="index">
                          <v-list-tile-title>
                            <v-icon>keyboard_arrow_right</v-icon>
                            {{skill}}
                          </v-list-tile-title>
                        </v-list-tile>
                        <v-divider v-if="index + 1 < labor.skills.length" :key="`divider-${index}`"></v-divider>
                      </template>
                    </v-list>
                  </v-card>
                  <v-card flat>
                    <v-toolbar flat>
                      <v-toolbar-side-icon>
                        <v-icon>event_note</v-icon>
                      </v-toolbar-side-icon>
                      <v-toolbar-title class="font-weight-light subheading">Pengalaman</v-toolbar-title>
                    </v-toolbar>
                    <v-list v-if="labor.carriers.length != 0">
                      <template v-for="(carrier, index) in labor.carriers">
                        <v-list-tile :key="index">
                          <v-list-tile-content>
                            <v-list-tile-title>{{carrier.name}}</v-list-tile-title>
                            <v-list-tile-sub-title>{{carrier.start}} - {{carrier.end}}</v-list-tile-sub-title>
                          </v-list-tile-content>
                        </v-list-tile>
                        <v-divider
                          v-if="index + 1 < labor.carriers.length"
                          :key="`divider-${index}`"
                        ></v-divider>
                      </template>
                    </v-list>
                    <v-card-title primary-title v-else>
                      <v-icon left>info</v-icon>
                      <span class="subheading">Tidak ada pengalaman</span>
                    </v-card-title>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs12 md3>
          <v-card flat>
            <v-card-text>
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
                <div class="title font-weight-regular">{{labor.name}}</div>
                <div class="body-1 grey--text">ID: {{labor.register_id}}</div>
                <v-chip>{{jobs[labor.job_id-1].text}}</v-chip>
              </div>

              <div class="mt-4 text-xs-center indigo--text text--darken-4">
                <div class="headline font font-weight-medium ">
                  Rp. {{formatPrice( labor.price_month)}}
                  <span class="body-1 grey--text">/Bulan</span>
                </div>
                <div class="subheading">
                  Rp. {{formatPrice( labor.price_day)}}
                  <span class="body-1 grey--text">/Hari</span>
                </div>
                <div class="subheading">
                  Rp. {{formatPrice( labor.price_hour)}}
                  <span class="body-1 grey--text">/Jam</span>
                </div>
              </div>
            </v-card-text>
            <v-btn large block depressed color="success" @click="order()">Pesan Sekarang</v-btn>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      labor: {},
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
      jobs: [],
      genders: [{ text: "Perempuan", idx: 1 }, { text: "Laki-laki", idx: 2 }]
    };
  },
  computed: {
    ethnic() {
      let ethnic = Array.from(this.ethnics).find(
        data => data.id == this.labor.ethnic_id
      );
      return ethnic.name;
    }
  },
  created() {
    this.ethnics = this.$store.getters["labor/ethnics"]
    this.jobs = this.$store.getters['labor/jobs']
    this.fetchLabor(this.$route.params.data);
  },
  methods: {
    lowerCase(text) {
      let val = text.toLowerCase().trim();
      return val;
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(0).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    order(){
      this.$router.push({name: 'mitra-order', params:{data:this.labor}})
      this.$store.commit("labor/SET_ORDER_MITRA",this.labor)
    },
    fetchLabor(id) {
      this.$http
        .get(`mitra/${id}`)
        .then(ress => {
          this.labor = ress.data;
          console.log(ress);
        })
        .catch(e => {
          console.log(e.response);
        });
    }
  }
};
</script>

<style>
</style>
