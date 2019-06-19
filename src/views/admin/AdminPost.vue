<template>
  <div class="admin-profile mt-5">
    <v-layout row wrap>
      <v-flex xs12 md2 class="text-xs-center pb-2">
        <v-hover>
          <v-avatar slot-scope="{ hover }" size="150" color="grey lighten-2">
            <v-fab-transition>
              <v-btn
                v-show="hover? true: false"
                fab
                class="mb-3"
                absolute
                small
                bottom
                left
                @click="dialog = !dialog"
              ><v-icon>insert_photo</v-icon></v-btn>
            </v-fab-transition>
            <v-icon size="130">person</v-icon>
          </v-avatar>
        </v-hover>
      </v-flex>

      <v-flex xs12 md10>
        <v-card>
          <v-form>
            <v-container py-0>
              <v-layout wrap>
                <v-flex xs12 md6>
                  <v-text-field v-model="user.username" label="Username" disabled/>
                </v-flex>
                <v-flex xs12 md6>
                  <v-text-field v-model="user.name" label="Nama Lengkap"/>
                </v-flex>
                <v-flex xs12 md6>
                  <v-text-field v-model="user.email" label="Email" class="purple-input"/>
                </v-flex>
                <v-flex xs12 md6>
                  <v-text-field v-model="user.phone" label="Nomor Handphone"/>
                </v-flex>
                <v-flex xs12>
                  <v-textarea v-model="user.address" label="Alamat"/>
                </v-flex>
                <v-flex xs12 text-xs-right>
                  <v-btn class="mx-0 font-weight-light" color="success">Update Profile</v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
export default {
  created() {
  
  },
  data() {
    return {
      user: {}
    };
  },
  methods: {}
};
</script>

<style scoped>
.scale-up {
  transform: scale(2.5, 2.5);
}
</style>
