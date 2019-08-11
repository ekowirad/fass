<template>
  <div class="order-labor">
    <v-layout row>
      <v-flex md4>
        <v-responsive class="text-xs-center">
          <v-avatar size="100" class="grey lighten-2" style="overflow:hidden">
            <img
              style="width:auto; border-radius:0"
              :src="labor.profile_pic.url"
              v-if="labor.profile_pic != null"
            />
            <v-icon v-else size="50">person</v-icon>
          </v-avatar>
        </v-responsive>
      </v-flex>
      <v-flex md8>
        <v-chip small>{{jobs[labor.job_id-1].text}}</v-chip>
        <v-list>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-sub-title>Nama</v-list-tile-sub-title>
              <v-list-tile-title>{{labor.name}}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider></v-divider>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-sub-title>ID</v-list-tile-sub-title>
              <v-list-tile-title>{{labor.register_id}}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider></v-divider>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-sub-title>Jenis Kelamin (Umur)</v-list-tile-sub-title>
              <v-list-tile-title>{{genders[labor.sex-1].text}} ({{labor.age}})</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider></v-divider>
        </v-list>
        <div class="text-xs-right">
          <div class="subheading font-weight-medium">
            Rp. {{formatPrice( labor.price_month)}}
            <span class="body-1 grey--text">/Bulan</span>
          </div>
          <div class="subheading font-weight-medium">
            Rp. {{formatPrice( labor.price_day)}}
            <span class="body-1 grey--text">/Hari</span>
          </div>
          <div class="subheading font-weight-medium">
            Rp. {{formatPrice( labor.price_hour)}}
            <span class="body-1 grey--text">/Jam</span>
          </div>
        </div>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  data(){
    return {
      labor: {},
      genders: [{ text: "Perempuan", idx: 1 }, { text: "Laki-laki", idx: 2 }],
      jobs: []
    }
  },
  created(){
    this.labor = this.$store.getters['labor/orderLabor']
    this.jobs = this.$store.getters['labor/jobs']

    console.log("this order labor", this.labor)
  },
  methods: {
    formatPrice(value) {
      let val = (value / 1).toFixed(0).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

  }
};
</script>

<style>
</style>
