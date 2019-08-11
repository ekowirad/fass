<template>
  <div class="user-about">
    <div class="v-responsive" style="height:600px;">
      <v-layout row align-center justify-center fill-height>
        <v-flex xs6>
          <v-img :src="landingImg" max-height="400" contain></v-img>
        </v-flex>
        <v-flex xs6>
          <v-card flat color="transparent">
              <v-card-text>
                  
              <span class="display-2 font-weight-bold">Apa itu</span>
              <p class="display-2 font-weight-light">Yayasan Kasih Keluarga?</p>
              </v-card-text>
            <v-card-text>Yayasan kasih keluarga merupakan lembaga pengasuhan pertama dan terpercaya di Bali yang berdiri sejak 1995. Lembaga ini khusus melayani Baby sitter ( Pengasuh Bayi ), pekarya kesehatan ( Pengasuh orang sakit di Rumah), Pengasuh orang tua/ Lansia di Rumah ( Care Giver ) dan Asisten Rumah Tangga ( House Maids). Staff kami sudah berpengalaman, terlatih dan profesional dalam mengelola lembaga pengasuhan Rumah Tangga. Lembaga ini terbiasa melayani tamu yang berlibur kebali khususnya daerah kuta, sanur, jimbaran,nusa dua,peti tenget, lovina,uluwatu dan Ubud. Lembaga ini mendapat ijin pendidikannya dari dari kementerian pendidikan dan penyaluran kerjanya dari kementerian tenaga kerja.Saat ini memiliki tenaga kerja tercatat 1800 orang.</v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      landingImg: require("@/assets/about_us3.svg")
    };
  }
};
</script>

<style scoped>
.about_img {
  transform: scale(0.5, 0.5);
}
</style>
