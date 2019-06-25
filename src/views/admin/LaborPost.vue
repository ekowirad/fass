<template>
  <div class="labor-post mt-4">
    <v-layout row wrap>
      <v-flex xs12 md2 class="text-xs-center">
        <div style="height:150px; width:150px; display: inline-block">
          <v-avatar size="150" color="grey lighten-2" style="overflow:hidden">
            <img style="width:auto; border-radius:0" :src="singleFile" v-if="singleFile != ''" alt>
            <v-icon v-else size="130">person</v-icon>
          </v-avatar>
          <v-btn fab class="mb-3" style="right:20%; bottom:25%" small @click="pickSingleFile">
            <v-icon>add_photo_alternate</v-icon>
            <input type="file" style="display:none" ref="singleFile" @change="onSingleFilePicked">
          </v-btn>
        </div>
      </v-flex>

      <!-- LABOR FORM -->
      <v-flex xs12 md10>
        <v-form>
          <v-card class="mb-5">
            <v-toolbar flat dense color="grey lighten-2">
              <v-toolbar-title class="font-weight-light subtitle">Informasi Personal</v-toolbar-title>
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
                  <v-textarea v-model="user.address" label="Alamat Asal"/>
                </v-flex>
              </v-layout>
            </v-container>

            <!-- Informasi Tambahan -->
            <v-container grid-list-lg>
              <h3 class="subtitle mb-0 grey--text text--darken-1">Informasi Penunjang</h3>
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
                <v-flex xs12 md6>
                  <v-text-field v-model="user.handphone" label="Nama Kerabat"/>
                </v-flex>
                <v-flex xs12 md6>
                  <v-text-field v-model="user.handphone" label="Nomor Handphone"/>
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

          <!-- INFORMASI PEKERJAAN -->
          <v-card class="mb-5">
            <v-toolbar flat dense color="grey lighten-2">
              <v-toolbar-title class="font-weight-light subtitle">Informasi Pekerjaan</v-toolbar-title>
            </v-toolbar>
            <v-container py-0 grid-list-lg>
              <v-layout wrap align-center>
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
                  <v-checkbox v-model="isDorm" label="Tinggal di Asrama"></v-checkbox>
                </v-flex>
                <v-flex xs12 md12 v-if="!isDorm">
                  <v-textarea v-model="user.address" label="Alamat Tinggal Sekarang"/>
                </v-flex>

                <!-- Pengalaman Kerja -->
                <v-flex xs12 lg12 md12>
                  <h3 class="subtitle mb-0 grey--text text--darken-1">Pengalaman Kerja</h3>
                </v-flex>
                <v-flex grow>
                  <v-text-field v-model="carrier.name" label="Pengalaman"/>
                </v-flex>
                <v-flex shrink>
                  <v-text-field v-model="carrier.start" label="Tahun Mulai"/>
                </v-flex>
                <v-flex shrink>
                  <v-text-field v-model="carrier.end" label="Tahun selesai"/>
                </v-flex>
                <v-flex shrink style="width: 70px">
                  <v-btn icon color="success" @click="addCarrier(carrier)">
                    <v-icon>add</v-icon>
                  </v-btn>
                </v-flex>

                <v-flex grow>
                  <v-list>
                    <template v-for="(carrier, index) in carriers">
                      <v-list-tile :key="index" style="margin-left: -16px; margin-right: -16px;">
                        <v-layout row wrap align-center>
                          <v-flex grow class="text-truncate" style="width:246px ">{{carrier.name}}</v-flex>
                          <v-flex
                            shrink
                            style="width:182px;"
                            class="text-xs-center"
                          >{{carrier.start}}</v-flex>
                          <v-flex shrink style="width:182px" class="text-xs-center">{{carrier.end}}</v-flex>
                          <v-flex shrink style="width: 70px">
                            <v-btn flat icon color="error" @click="popArray(index, carriers)">
                              <v-icon>clear</v-icon>
                            </v-btn>
                          </v-flex>
                        </v-layout>
                      </v-list-tile>
                      <v-divider :key="index"></v-divider>
                    </template>
                  </v-list>
                </v-flex>
                <!-- End of Pengalaman Kerja -->

                <v-flex xs12 md4>
                  <v-text-field type="number" v-model="user.name" label="Gaji Bulanan"/>
                </v-flex>
                <v-flex xs12 md4>
                  <v-text-field type="number" v-model="user.name" label="Gaji Harian"/>
                </v-flex>
                <v-flex xs12 md4>
                  <v-text-field type="number" v-model="user.name" label="Gaji Jam"/>
                </v-flex>
                <v-flex xs12 md6>
                  <v-text-field :readonly="read" v-model="user.handphone" label="Nama Refferal"/>
                </v-flex>
                <v-flex xs12 md6>
                  <v-text-field v-model="user.handphone" label="Nomor Handphone"/>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
          <!-- END OF INFORMASI PEKERJAAN -->

          <!-- FILE SYARAT DAN KETENTUAN -->
          <v-card class="mb-5">
            <v-toolbar flat dense color="grey lighten-2">
              <v-toolbar-title class="font-weight-light subtitle">Berkas Persyaratan</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-toolbar-items>
                <v-btn flat @click="pickMultiFile">
                  <v-icon left dark>add</v-icon>Unggah Berkas
                  <input
                    type="file"
                    multiple
                    style="display:none"
                    ref="multiFile"
                    @change="onMultiFilePicked"
                  >
                </v-btn>
              </v-toolbar-items>
            </v-toolbar>

            <v-container py-0 grid-list-lg>
              <v-layout wrap align-center>
                <v-flex grow class="text-xs-center pa-5" v-if="multiFiles.length == 0">
                  <v-icon size="120">collections</v-icon>
                  <div class="subheader">*Mohon unggah berkas dalam bentuk foto</div>
                </v-flex>
                <v-flex v-else grow>
                  <v-layout row wrap>
                    <v-flex md3 v-for="(image, index) in multiFiles" :key="index">
                      <v-card flat tile class="d-flex">
                        <v-img :src="image" aspect-ratio="1">
                          <v-btn
                            icon
                            flat
                            color="error"
                            absolute
                            style="right:0"
                            @click="popArray(index, multiFiles)"
                          >
                            <v-icon>clear</v-icon>
                          </v-btn>
                          <v-btn icon flat absolute style="right:16%" @click="detImage(image)">
                            <v-icon>search</v-icon>
                          </v-btn>
                        </v-img>
                      </v-card>
                    </v-flex>
                  </v-layout>
                  <v-dialog v-model="detdialog"  max-width="650px" transition="dialog-transition">
                    <v-card>
                      <v-img :src="image" style="max-width:100%; max-height:100%;"></v-img>
                    </v-card>
                  </v-dialog>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>

          <v-btn class="mx-0 font-weight-light" block depressed large color="success">Daftar</v-btn>
        </v-form>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  data: () => ({
    read: false,
    image: "",
    detdialog: false,
    deldialog: false,
    user: {},
    carrier: {},
    images: true,
    carriers: [
      {
        name:
          "lorem ipsum dsakjd sakdj askdjsa dksja dksajdksa dksajd sakjdksajd",
        start: "2015",
        end: "2019"
      },
      {
        name: "Bekerja paruh waktu di perusahaan x",
        start: "2015",
        end: "2019"
      }
    ],
    singleFile: "",
    multiFiles: []
  }),
  methods: {
    pickSingleFile() {
      this.$refs.singleFile.click();
    },
    onSingleFilePicked(e) {
      const files = e.target.files;
      let reader = new FileReader();

      if (files.length != 0) {
        if (/\.(jpe?g|png|gif|svg)$/i.test(files[0].name)) {
          reader.readAsDataURL(files[0]);
          reader.addEventListener("load", () => {
            this.singleFile = reader.result;
          });
        }
      }
    },
    pickMultiFile() {
      this.$refs.multiFile.click();
    },
    onMultiFilePicked(e) {
      const files = e.target.files || e.dataTransfer.files;

      if (files.length != 0) {
        Array.from(files).forEach((file, idx) => {
          if (/\.(jpe?g|png|gif|svg)$/i.test(file.name)) {
            let reader = new FileReader();
            const getResult = new Promise(resolve => {
              reader.onload = e => {
                this.multiFiles.push(e.target.result);
              };
            });

            reader.readAsDataURL(file);
          }
        });
      }
      console.log("this multiple: ", this.multiFiles);
    },

    popArray(index, array) {
      array.splice(index, 1);
    },
    addCarrier(carrier) {
      // create new obj
      var newCarrier = {};
      newCarrier.name = carrier.name;
      newCarrier.start = carrier.start;
      newCarrier.end = carrier.end;
      // push new obj
      this.carriers.push(newCarrier);

      carrier.name = "";
      carrier.start = "";
      carrier.end = "";
    },
    detImage(image) {
      this.image = image;
      this.detdialog = true;
    },
    delImage() {
      this.multiFiles.pop;
    }
  }
};
</script>

<style scoped>
</style>
