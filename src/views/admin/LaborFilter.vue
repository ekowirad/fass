<template>
  <div>
    <v-text-field
      placeholder="Search"
      :prepend-icon="'filter_list'"
      :append-icon="'search'"
      @click:prepend="filter = !filter"
      @click:append="filter = !filter"
      flat
      solo
    ></v-text-field>
    <v-slide-y-transition>
      <v-card flat v-if="filter">
        <v-toolbar dense flat style="background-color:transparent;">
          <div class="title font-weight-medium">Filter</div>
        </v-toolbar>
        <v-container grid-list-md>
          <v-layout row wrap>
            <v-flex xs12 md3>
              <v-select :items="items" label="Status" solo></v-select>
            </v-flex>
            <v-flex xs12 md3>
              <v-select :items="items" label="Jenis Kelamin" solo></v-select>
            </v-flex>
            <v-flex xs12 md3>
              <v-select :items="items" label="Status Pernikahan" solo></v-select>
            </v-flex>
            <v-flex xs12 md3>
              <v-select :items="items" label="Agama" solo></v-select>
            </v-flex>
            <v-flex xs12 md3>
              <v-select :items="items" label="Pendidikan" solo></v-select>
            </v-flex>
            <v-flex xs12 md3>
              <v-select :items="items" label="Provinsi" solo></v-select>
            </v-flex>
            <v-flex xs12 md3>
              <v-select :items="items" label="Kabupaten" solo></v-select>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs12 md6 pr-3>
              <div class="subheading grey--text text--darken-1">Umur</div>
              <v-layout row>
                <v-flex shrink style="width: 50px">
                  <v-text-field ></v-text-field>
                </v-flex>

                <v-flex class="px-3">
                  <v-range-slider v-model="value3" :max="60" :min="17"></v-range-slider>
                </v-flex>

                <v-flex shrink style="width: 50px">
                  <v-text-field></v-text-field>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex xs12 md6 pl-3>
              <div class="subheading grey--text text--darken-1">Gaji</div>
              <v-layout row>
                <v-flex shrink style="width: 50px">
                  <v-text-field></v-text-field>
                </v-flex>

                <v-flex class="px-3">
                  <v-range-slider v-model="value3" :max="60" :min="17"></v-range-slider>
                </v-flex>

                <v-flex shrink style="width: 50px">
                  <v-text-field></v-text-field>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-slide-y-transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      filter: false
    };
  },
  created() {},
  methods: {}
};
</script>

<style scoped>
</style>
