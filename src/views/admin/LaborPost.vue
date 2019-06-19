<template>
  <div class="labor-post mt-4">
    <v-layout row wrap>
      <v-flex xs12 md2 class="text-xs-center pb-2">
        <v-avatar size="150" color="grey lighten-2">
          <v-icon size="130">person</v-icon>
          <v-btn fab class="mb-3" absolute small bottom left @click="pickFile">
            <v-icon>insert_photo</v-icon>
            <input type="file" style="display:none" ref="fileInput">
          </v-btn>
        </v-avatar>
      </v-flex>

      <!-- Labor Form -->
      <v-flex xs12 md10>
        <v-form>
          <v-card class="mb-5">
            <v-toolbar flat dense>
              <v-toolbar-title class="font-weight-light subtitle">Informasi Pekerjaan</v-toolbar-title>
            </v-toolbar>
            <v-container py-0 grid-list-lg>
              <v-layout wrap>
                <v-flex xs12 md6>
                  <v-text-field v-model="user.ktp_id" label="Nomor KTP"/>
                </v-flex>
                <v-flex xs12 md6>
                  <v-text-field v-model="user.name" label="Name"/>
                </v-flex>
                <v-flex xs12 md6>
                  <v-select :items="items" v-model="user.birth_place" label="Tempat Kelahiran"></v-select>
                </v-flex>
                <v-flex xs12 md6>
                  <v-text-field v-model="user.birth_date" label="Tanggal Kelahiran"/>
                </v-flex>
                <v-flex xs12 md3>
                  <v-select :items="items" v-model="user.birth_place" label="Status"></v-select>
                </v-flex>
                <v-flex xs12 md3>
                  <v-select :items="items" v-model="user.birth_place" label="Suku"></v-select>
                </v-flex>
                <v-flex xs12 md3>
                  <v-select :items="items" v-model="user.birth_place" label="Pendidikan"></v-select>
                </v-flex>
                <v-flex xs12 md3>
                  <v-select :items="items" v-model="user.birth_place" label="Agama"></v-select>
                </v-flex>
                <v-flex xs12 md6>
                  <v-text-field type="number" v-model="user.handphone" label="Nomor Handphone"/>
                </v-flex>
                <v-flex xs12 md6>
                  <v-radio-group v-model="radioGroup" row>
                    <div class="subheading mr-2 grey--text text--darken-1">Jenis Kelamin:</div>
                    <v-radio label="Perempuan" value="radio-1"></v-radio>
                    <v-radio label="Laki-laki" value="radio-2"></v-radio>
                  </v-radio-group>
                </v-flex>
                <v-flex xs12 md4>
                  <v-select :items="items" v-model="user.birth_place" label="Provinsi"></v-select>
                </v-flex>
                <v-flex xs12 md4>
                  <v-select :items="items" v-model="user.birth_place" label="Kabupaten"></v-select>
                </v-flex>
                <v-flex xs12 md4>
                  <v-select :items="items" v-model="user.birth_place" label="Kecamatan"></v-select>
                </v-flex>
                <v-flex xs12>
                  <v-textarea v-model="user.address" label="Alamat"/>
                </v-flex>
              </v-layout>
            </v-container>

            <!-- Informasi Tambahan -->
            <v-container grid-list-lg>
              <h3 class="subtitle mb-0">Informasi Tambahan</h3>
              <v-layout wrap>
                <v-flex xs12 md6>
                  <v-text-field v-model="user.handphone" label="Nama Ayah"/>
                </v-flex>
                <v-flex xs12 md6>
                  <v-text-field v-model="user.handphone" label="Pekerjaan Ayah"/>
                </v-flex>
                <v-flex xs12 md6>
                  <v-text-field v-model="user.handphone" label="Nama Ibu"/>
                </v-flex>
                <v-flex xs12 md6>
                  <v-text-field v-model="user.handphone" label="Pekerjaan Ibu"/>
                </v-flex>
                <v-flex xs12 md3>
                  <v-text-field type="number" v-model="user.handphone" label="Tinggi Badan"/>
                </v-flex>
                <v-flex xs12 md3>
                  <v-text-field type="number" v-model="user.handphone" label="Berat Badan"/>
                </v-flex>
                <v-flex xs12 md3>
                  <v-select :items="items" v-model="user.birth_place" label="Rambut"></v-select>
                </v-flex>
                <v-flex xs12 md3>
                  <v-select :items="items" v-model="user.birth_place" label="Kulit"></v-select>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
          <v-card>
            <v-toolbar flat dense>
              <v-toolbar-title class="font-weight-light subtitle">Informasi Data Diri</v-toolbar-title>
            </v-toolbar>
            <v-container py-0 grid-list-lg>
              <v-layout wrap>
                <v-flex xs12 md12>
                  <v-select :items="items" v-model="user.birth_place" label="Mendaftar Sebagai"></v-select>
                </v-flex>
                <v-flex xs12 md12>
                  <v-combobox
                    v-model="chips"
                    :items="items"
                    label="Keahlian"
                    chips
                    clearable
                    multiple
                  ></v-combobox>
                </v-flex>
                <v-flex xs12 md3>
                  <v-checkbox v-model="checkbox" label="Tidak Takut Anjing"></v-checkbox>
                </v-flex>
                <v-flex xs12 md3>
                  <v-checkbox v-model="checkbox" label="Bahasa Inggris"></v-checkbox>
                </v-flex>
                <v-flex xs12 md3>
                  <v-checkbox v-model="checkbox" label="Tinggal di Asrama"></v-checkbox>
                </v-flex>
                <v-flex xs12 md12>
                  <v-textarea v-model="user.address" label="Alamat"/>
                </v-flex>
                <v-flex xs12 md4>
                  <v-text-field type="number" v-model="user.name" label="Gaji Bulanan"/>
                </v-flex>
                <v-flex xs12 md4>
                  <v-text-field type="number" v-model="user.name" label="Gaji Harian"/>
                </v-flex>
                <v-flex xs12 md4>
                  <v-text-field type="number" v-model="user.name" label="Gaji Jam"/>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
          <v-btn class="mx-0 font-weight-light" color="success">Update Profile</v-btn>
        </v-form>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  data: () => ({
    user: {}
  }),
  methods: {
    pickFile() {
      this.$refs.fileInput.click();
    }
  }
};
</script>

<style>
</style>
