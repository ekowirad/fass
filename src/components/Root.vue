<template>
  <div class="root">
    <v-app style=" background:#F5F5F5;">
      <v-toolbar flat app color="white">
        <v-toolbar-title class="font-weight-light headline">
          Yayasan
          <span class="font-weight-medium">Kasih Keluarga</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items v-for="menu in menus" :key="menu.name">
          <v-btn flat @click="pushMenu(menu.link)">{{menu.name}}</v-btn>
        </v-toolbar-items>
        <!-- <v-toolbar-items>
          <v-btn color="success" @click="paymentMenu" flat>Konfirmasi Pembayaran</v-btn>
        </v-toolbar-items> -->
        <!-- <v-toolbar-items>
          <v-btn color="success" :to="{name: 'pesan'}" depressed>Pesan</v-btn>
        </v-toolbar-items> -->
      </v-toolbar>
      <v-content>
        <router-view :key="$route.fullPath"></router-view>
        <v-footer style="top:100%;" absolute >
          <v-card class="flex" flat tile >
            <v-card-title class="indigo darken-4 white--text" dark>
              <strong class="subheading">Lebih Dekat Dengan Kami!</strong>

              <v-spacer></v-spacer>

              <v-btn v-for="contact in contacts" :key="contact.name" class="mx-3" dark flat>
                <v-icon size="24px" left>{{contact.icon}}</v-icon>
                {{contact.name}}
              </v-btn>
            </v-card-title>

            <v-card-actions class=" justify-center">
              &copy;2019 —
              <strong>Yayasan Kasih Keluarga</strong>
            </v-card-actions>
          </v-card>
        </v-footer>
        <!-- <order-payment ref="orderPaymentDialog"/> -->
      </v-content>
    </v-app>
  </div>
</template>

<script>
// import OrderPayment from '../views/OrderPayment'
export default {
  components:{
    // OrderPayment
  },
  data() {
    return {
      menus: [
        { name: "Beranda", link: "home" },
        { name: "Tentang Kami", link: "about" },
        { name: "Mitra", link: "mitra" },
      ],
      contacts: [
        {name: "yayasankasihkeluarga", icon: 'fab fa-facebook'},
        {name: " (0361) 264190/ 265449", icon: 'call'}

      ],
      filter: null
    };
  },
  methods: {
    pushMenu(link) {
      this.$router.push({ name: link });
    },
    paymentMenu(){
      // this.$refs.orderPaymentDialog.dialog = true
    }
  },
  created() {}
};
</script>

<style>
</style>
