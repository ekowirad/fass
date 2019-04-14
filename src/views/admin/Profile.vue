<template>
  <div class="profile">
    <v-layout row wrap>
      <v-flex xs12 md2 class="text-xs-center pb-2">
        <v-avatar size="150" class="card--flex-toolbar">
          <img
            src="https://images.unsplash.com/photo-1554653622-c3d14492232e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1427&q=80"
          >
        </v-avatar>
        <p class="mt-1"><v-chip >Position</v-chip></p>
      </v-flex>

      <v-flex xs12 md10>
        <v-card>
          <v-form>
            <v-container py-0>
              <v-layout wrap>
                <v-flex xs12 md4>
                  <v-text-field label="Company (disabled)" disabled/>
                </v-flex>
                <v-flex xs12 md4>
                  <v-text-field class="purple-input" label="User Name"/>
                </v-flex>
                <v-flex xs12 md4>
                  <v-text-field label="Email Address" class="purple-input"/>
                </v-flex>
                <v-flex xs12 md6>
                  <v-text-field label="First Name" class="purple-input"/>
                </v-flex>
                <v-flex xs12 md6>
                  <v-text-field label="Last Name" class="purple-input"/>
                </v-flex>
                <v-flex xs12 md12>
                  <v-text-field label="Adress" class="purple-input"/>
                </v-flex>
                <v-flex xs12 md4>
                  <v-text-field label="City" class="purple-input"/>
                </v-flex>
                <v-flex xs12 md4>
                  <v-text-field label="Country" class="purple-input"/>
                </v-flex>
                <v-flex xs12 md4>
                  <v-text-field class="purple-input" label="Postal Code" type="number"/>
                </v-flex>
                <v-flex xs12>
                  <v-textarea
                    class="purple-input"
                    label="About Me"
                    value="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                  />
                </v-flex>
                <!-- <v-flex xs12 text-xs-right>
                  <v-btn class="mx-0 font-weight-light" color="success">Update Profile</v-btn>
                </v-flex>-->
              </v-layout>
            </v-container>
          </v-form>
        </v-card>
      </v-flex>
      <!-- <v-flex xs12 md4>
        <v-card class="v-card-profile">
          <v-card-text class="text-xs-center">
            <h6 class="category text-gray font-weight-thin mb-3">CEO / CO-FOUNDER</h6>
            <h4 class="card-title font-weight-light">Alec Thompson</h4>
            <p
              class="card-description font-weight-light"
            >Don't be scared of the truth because we need to restart the human foundation in truth And I love you like Kanye loves Kanye I love Rick Owens’ bed design but the back is...</p>
            <v-btn color="success" round class="font-weight-light">Follow</v-btn>
          </v-card-text>
        </v-card>
      </v-flex>-->
    </v-layout>
  </div>
</template>
<script>
export default {
  //
};
</script>

<style scoped>
.card--flex-toolbar {
  z-index: 2;
  /* margin-top: -50px; */
}
</style>
