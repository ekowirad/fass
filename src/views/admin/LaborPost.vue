<template>
  <div class="labor-post mt-4">
    <v-layout row wrap>
      <v-flex xs12 md2 class="text-xs-center">
        <div style="height:150px; width:150px; display: inline-block">
          <v-avatar size="150" color="grey lighten-2" style="overflow:hidden">
            <img style="width:auto; border-radius:0" :src="singleFile" v-if="singleFile != ''" alt />
            <v-icon v-else size="130">person</v-icon>
          </v-avatar>
          <v-btn fab class="mb-3" style="right:20%; bottom:25%" small @click="pickSingleFile">
            <v-icon>add_photo_alternate</v-icon>
            <input type="file" style="display:none" ref="singleFile" @change="onSingleFilePicked" />
          </v-btn>
        </div>
      </v-flex>

      <!-- 
        ------------------------------------------ LABOR FORM ------------------------------------------------------- 
      -->
      <v-flex xs12 md10>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-card class="mb-5">
            <v-toolbar flat dense color="grey lighten-2">
              <v-toolbar-title class="font-weight-light subtitle">Informasi Personal</v-toolbar-title>
            </v-toolbar>
            <v-container py-0 grid-list-lg>
              <v-layout wrap>
                <v-flex xs12 md6>
                  <v-text-field
                    type="number"
                    :rules="rIdNumber"
                    v-model="labor.ktp_id"
                    label="Nomor KTP"
                  />
                </v-flex>
                <v-flex xs12 md6>
                  <v-text-field v-model="labor.name" :rules="rGeneral" label="Nama Lengkap" />
                </v-flex>
                <v-flex xs12 md6>
                  <v-autocomplete
                    :items="regency"
                    v-model="labor.birth_place"
                    :rules="rSelection"
                    label="Tempat Kelahiran"
                  ></v-autocomplete>
                </v-flex>
                <v-flex xs12 md6>
                  <v-menu
                    v-model="birth_picker"
                    :close-on-content-click="false"
                    lazy
                    transition="scale-transition"
                    offset-y
                    full-width
                    max-width="290px"
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="labor.birth_date"
                        :rules="rGeneral"
                        label="Tanggal Kelahiran"
                        prepend-icon="event"
                        readonly
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="labor.birth_date"
                      no-title
                      @input="birth_picker = false"
                    ></v-date-picker>
                  </v-menu>
                </v-flex>
                <v-flex xs12 md3>
                  <v-select
                    v-model="labor.marital_status"
                    :items="marital_status"
                    item-value="idx"
                    :rules="rSelection"
                    label="Status"
                  ></v-select>
                </v-flex>
                <v-flex xs12 md3>
                  <v-select
                    :items="ethnics"
                    item-value="id"
                    v-model="labor.ethnic_id"
                    :rules="rSelection"
                    label="Suku"
                  ></v-select>
                </v-flex>
                <v-flex xs12 md3>
                  <v-select
                    :items="educations"
                    v-model="labor.education"
                    item-value="idx"
                    :rules="rSelection"
                    label="Pendidikan"
                  ></v-select>
                </v-flex>
                <v-flex xs12 md3>
                  <v-select
                    :items="religions"
                    v-model="labor.religion"
                    item-value="idx"
                    :rules="rSelection"
                    label="Agama"
                  ></v-select>
                </v-flex>
                <v-flex xs12 md6>
                  <v-text-field
                    :rules="rPhone"
                    type="number"
                    min="0"
                    v-model="labor.handphone"
                    label="Nomor Handphone"
                  />
                </v-flex>
                <v-flex xs12 md6>
                  <v-radio-group v-model="labor.sex" :rules="rSelection" row>
                    <!-- <div class="subheading mr-2 grey--text text--darken-1">Jenis Kelamin:</div> -->
                    <v-radio label="Perempuan" color="primary" value="1"></v-radio>
                    <v-radio label="Laki-laki" color="primary" value="2"></v-radio>
                  </v-radio-group>
                </v-flex>
                <v-flex xs12 md4>
                  <v-select
                    :items="provinces"
                    item-value="id"
                    v-model="labor.province_id"
                    :rules="rSelection"
                    label="Provinsi"
                  ></v-select>
                </v-flex>
                <v-flex xs12 md4>
                  <v-select
                    :items="regencies"
                    item-value="id"
                    v-model="labor.regency_id"
                    :rules="rSelection"
                    label="Kabupaten"
                  ></v-select>
                </v-flex>
                <v-flex xs12 md4>
                  <v-select
                    :items="districts"
                    item-value="id"
                    v-model="labor.district_id"
                    :rules="rSelection"
                    label="Kecamatan"
                  ></v-select>
                </v-flex>
                <v-flex xs12>
                  <v-textarea v-model="labor.address" :rules="rAddress" label="Alamat Asal" />
                </v-flex>
              </v-layout>
            </v-container>

            <!-- Informasi Tambahan -->
            <v-container grid-list-lg>
              <h3 class="subtitle mb-0 grey--text text--darken-1">Informasi Penunjang</h3>
              <v-layout wrap>
                <v-flex xs12 md6>
                  <v-text-field v-model="labor.father_name" :rules="rGeneral" label="Nama Ayah" />
                </v-flex>
                <v-flex xs12 md6>
                  <v-text-field
                    v-model="labor.father_job"
                    :rules="rGeneral"
                    label="Pekerjaan Ayah"
                  />
                </v-flex>
                <v-flex xs12 md6>
                  <v-text-field v-model="labor.mother_name" :rules="rGeneral" label="Nama Ibu" />
                </v-flex>
                <v-flex xs12 md6>
                  <v-text-field v-model="labor.mother_job" :rules="rGeneral" label="Pekerjaan Ibu" />
                </v-flex>
                <v-flex xs12 md6>
                  <v-text-field v-model="labor.fam_name" :rules="rGeneral" label="Nama Kerabat" />
                </v-flex>
                <v-flex xs12 md6>
                  <v-text-field
                    :rules="rPhone"
                    type="number"
                    min="0"
                    v-model="labor.fam_handphone"
                    label="Nomor Handphone"
                  />
                </v-flex>
                <v-flex xs12 md3>
                  <v-text-field
                    type="number"
                    suffix="Cm"
                    :rules="rGeneral"
                    v-model="labor.height"
                    label="Tinggi Badan"
                  />
                </v-flex>
                <v-flex xs12 md3>
                  <v-text-field
                    type="number"
                    suffix="Kg"
                    :rules="rGeneral"
                    v-model="labor.weight"
                    label="Berat Badan"
                  />
                </v-flex>
                <v-flex xs12 md3>
                  <v-select
                    :items="hairs"
                    v-model="labor.hair"
                    item-value="idx"
                    :rules="rSelection"
                    label="Rambut"
                  ></v-select>
                </v-flex>
                <v-flex xs12 md3>
                  <v-select
                    :items="skins"
                    v-model="labor.skin"
                    item-value="idx"
                    :rules="rSelection"
                    label="Kulit"
                  ></v-select>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>

          <!-- 
        ------------------------------------------ INFORMASI PEKERJAAN ------------------------------------------------------- 
          -->
          <v-card class="mb-5">
            <v-toolbar flat dense color="grey lighten-2">
              <v-toolbar-title class="font-weight-light subtitle">Informasi Pekerjaan</v-toolbar-title>
            </v-toolbar>
            <v-container py-0 grid-list-lg>
              <v-layout wrap align-center>
                <v-flex xs12 md12>
                  <v-select
                    :items="jobs"
                    prepend-icon="assignment_ind"
                    item-value="idx"
                    v-model="labor.job_id"
                    :rules="rSelection"
                    label="Mendaftar Sebagai"
                  ></v-select>
                </v-flex>
                <v-flex xs12 md12>
                  <v-combobox
                    v-model="labor.skills"
                    :rules="rComboBox"
                    label="Keahlian"
                    chips
                    clearable
                    multiple
                  ></v-combobox>
                </v-flex>
                <v-flex xs12 md3>
                  <v-checkbox v-model="labor.dog_fear" color="primary" label="Tidak Takut Anjing"></v-checkbox>
                </v-flex>
                <v-flex xs12 md3>
                  <v-checkbox
                    v-model="labor.speak_english"
                    color="primary"
                    label="Bisa Bahasa Inggris"
                  ></v-checkbox>
                </v-flex>
                <v-flex xs12 md3>
                  <v-checkbox v-model="labor.dorm_stay" color="primary" label="Tinggal di Asrama"></v-checkbox>
                </v-flex>
                <v-flex xs12 md12 v-if="!labor.dorm_stay">
                  <v-textarea
                    v-model="labor.address_now"
                    :rules="rAddress"
                    label="Alamat Tinggal Sekarang"
                  />
                </v-flex>

                <!-- Pengalaman Kerja -->
                <v-flex grow>
                  <v-form ref="formCarrier">
                    <v-layout wrap>
                      <v-flex xs12 lg12 md12>
                        <h3 class="subtitle mb-0 grey--text text--darken-1">Pengalaman Kerja</h3>
                      </v-flex>
                      <v-flex grow>
                        <v-text-field :rules="rGeneral" v-model="carrier.name" label="Pengalaman" />
                      </v-flex>
                      <v-flex shrink>
                        <v-text-field
                          type="number"
                          :rules="rGeneral"
                          min="0"
                          v-model="carrier.start"
                          label="Tahun Mulai"
                        />
                      </v-flex>
                      <v-flex shrink>
                        <v-text-field
                          type="number"
                          :rules="rGeneral"
                          min="0"
                          v-model="carrier.end"
                          label="Tahun selesai"
                        />
                      </v-flex>
                      <v-flex shrink style="width: 70px">
                        <v-btn icon color="success" @click="addCarrier(carrier)">
                          <v-icon>add</v-icon>
                        </v-btn>
                      </v-flex>

                      <v-flex xs12 lg12 md12>
                        <v-list>
                          <template v-for="(carrier, index) in carriers">
                            <v-list-tile
                              :key="index"
                              style="margin-left: -16px; margin-right: -16px;"
                            >
                              <v-layout row wrap align-center>
                                <v-flex
                                  grow
                                  class="text-truncate"
                                  style="width:246px "
                                >{{carrier.name}}</v-flex>
                                <v-flex shrink style="width:182px;">{{carrier.start}}</v-flex>
                                <v-flex shrink style="width:182px">{{carrier.end}}</v-flex>
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
                    </v-layout>
                  </v-form>
                </v-flex>
                <!-- End of Pengalaman Kerja -->

                <v-flex xs12 md4>
                  <v-currency-field
                    label="Gaji Bulanan"
                    v-bind="currency_config"
                    prefix="Rp"
                    v-model="labor.price_month"
                  ></v-currency-field>
                </v-flex>
                <v-flex xs12 md4>
                  <v-currency-field
                    label="Gaji Harian"
                    v-bind="currency_config"
                    prefix="Rp"
                    v-model="labor.price_day"
                  ></v-currency-field>
                </v-flex>
                <v-flex xs12 md4>
                  <v-currency-field
                    label="Gaji Jam"
                    required
                    v-bind="currency_config"
                    prefix="Rp"
                    v-model="labor.price_hour"
                  ></v-currency-field>
                </v-flex>
                <v-flex xs12 md6>
                  <v-text-field v-model="labor.ref_name" label="Nama Refferal" />
                </v-flex>
                <v-flex xs12 md6>
                  <v-text-field
                    v-model="labor.ref_handphone"
                    type="number"
                    min="0"
                    label="Nomor Handphone"
                  />
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
          <!-- END OF INFORMASI PEKERJAAN -->

          <!-- 
        ------------------------------------------ BERKAS PERSYARATAN ------------------------------------------------------- 
          -->
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
                  />
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
                  <v-dialog v-model="detdialog" max-width="650px" transition="dialog-transition">
                    <v-card>
                      <v-img :src="image" style="max-width:100%; max-height:100%;"></v-img>
                    </v-card>
                  </v-dialog>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>

          <v-alert
            v-model="alert.show"
            :color="alert.color"
            :icon="alert.icon"
            dismissible
            outline
          >{{alert.message}}</v-alert>
          
          <v-btn
            class="mx-0 font-weight-light mt-3"
            block
            :loading="loading"
            :disabled="loading"
            depressed
            large
            @click="register"
            color="success"
          >Daftar</v-btn>
        </v-form>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  data: () => ({
    alert: {
      show: false
    },
    loading: false,
    loader: null,
    currency_config: {
      thousands: ".",
      precision: 0,
      masked: false
    },
    birth_picker: false,
    // for detail image in pop up modal
    image: "",
    detdialog: false,
    labor: {},
    files: {},

    // form data initiate
    formData: new FormData(),
    provinces: [],
    regency: [],
    district: [],
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
    hairs: [
      { text: "Kriting", idx: 1 },
      { text: "Bergelombang", idx: 2 },
      { text: "Lurus", idx: 3 }
    ],
    skins: [
      { text: "Putih", idx: 1 },
      { text: "Kuning Langsat", idx: 2 },
      { text: "Sawo Matang", idx: 3 },
      { text: "Hitam", idx: 4 }
    ],
    jobs: [
      { text: "Pembantu Rumah Tanga", idx: 1 },
      { text: "Pengasuh Bayi", idx: 2 },
      { text: "Pengasuh Lansia", idx: 3 }
    ],
    carrier: {},
    carriers: [],
    singleFile: "",
    multiFiles: [],

    // Form Rules
    valid: true,
    rPhone: [
      v => !!v || "Kolom ini tidak boleh kosong",
      v => (v && v.length >= 9) || "Minimal 9 angka",
      v => (v && v.length <= 12) || "Maksimal 12 angka"
    ],
    rComboBox: [v => v.length > 0 || "Kolom ini tidak boleh Kosong"],
    rPrice: [v => !!v || "Kolom ini tidak boleh kosong"],
    rIdNumber: [
      v => !!v || "Kolom ini tidak boleh kosong",
      v => (v && v.length <= 16) || "Maksimal 16 angka"
    ],
    rAddress: [
      v => !!v || "Kolom ini tidak boleh kosong",
      v => (v && v.length >= 12) || "Alamat teralu singkat"
    ],
    rSelection: [v => !!v || "Kolom ini tidak boleh kosong"],
    rGeneral: [v => (!!v && v.trim() !== "") || "Kolom ini tidak boleh kosong"],

    // header REST
    multiFormHeader: {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${window.localStorage.getItem("api_token")}`
      }
    },
    headers: {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("api_token")}`
      }
    }
  }),
  methods: {
    register() {
      if (this.$refs.form.validate()) {
        // set status to available
        this.loading = true;
        this.labor.status = 1;
        this.$http
          .post("labor", this.labor, this.headers)
          .then(ress => {
            if (this.carriers.length != 0) {
              this.postCarrier(ress.data.data.id);
            }
            this.postFile(ress.data.data.id);
            console.log(ress);
            this.resetForm();
            this.alertCtrl('check_circle', 'success', 'Pekerja berhasil didaftarkan', true)
            this.loading = false;
          })
          .catch(e => {
            this.loading = false;
            if(e.response.status == 500){
              this.alertCtrl('warning', 'error', 'Mohon maaf terjadi kesalahan server', true)
            }
            console.log("this error:", e.response);
          });
      }else {
        this.alertCtrl("priority_high", "warning", "Mohon lengkapi form pendaftaran", true)
      }
    },
    alertCtrl(icon, color, msg, show){
      this.alert.icon = icon
      this.alert.color = color
      this.alert.message = msg
      this.alert.show = show
    },
    resetForm() {
      this.$refs.form.reset();
      this.labor.price_month = 0;
      this.labor.price_day = 0;
      this.labor.price_hour = 0;
      this.singleFile = "";
      this.multiFiles = [];
      this.carriers = [];
    },
    postCarrier(labor_id) {
      this.$http
        .post(
          "carrier",
          {
            labor_id: labor_id,
            carriers: this.carriers
          },
          this.headers
        )
        .then(ress => {
          console.log(ress);
        })
        .catch(e => {
          console.log("error upload carrier: ", e.response);
        });
    },
    postFile(labor_id) {
      this.formData.append("labor_id", labor_id);
      this.$http
        .post("files", this.formData, this.multiFormHeader)
        .then(ress => {
          console.log(ress);
        })
        .catch(e => {
          console.log("error upload file: ", e.response);
        });
    },
    pickSingleFile() {
      this.$refs.singleFile.click();
    },
    onSingleFilePicked(e) {
      const files = e.target.files;
      let reader = new FileReader();

      if (files.length != 0) {
        if (/\.(jpe?g|png|gif|svg)$/i.test(files[0].name)) {
          this.formData.append("profile_pic", files[0]);
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
            // this.requirement_file.push(file)
            this.formData.append("requirement_file[]", file);
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
      console.log("this multiple: ", this.formData);
    },

    popArray(index, array) {
      array.splice(index, 1);
    },
    addCarrier(carrier) {
      if (this.$refs.formCarrier.validate()) {
        this.carriers.push(carrier);
        this.carrier = {};
        this.$refs.formCarrier.resetValidation();
      }
    },
    detImage(image) {
      this.image = image;
      this.detdialog = true;
    },
    delImage() {
      this.multiFiles.pop;
    },
    getDataLib() {
      this.provinces = this.$store.getters["labor/provinces"];
      this.district = this.$store.getters["labor/districts"];
      this.regency = this.$store.getters["labor/regencies"];
      this.ethnics = this.$store.getters["labor/ethnics"];
    }
  },
  watch: {
    loader() {
      console.log(this.loader);
      console.log(this[this.loader]);
      // const l = this.loader
      // this[l] = !this[l]

      // setTimeout(() => (this[l] = false), 3000)

      // this.loader = null
    }
  },
  computed: {
    regencies() {
      let regencies = Array.from(this.regency).filter(
        data => data.province_id == this.labor.province_id
      );
      return regencies;
    },
    districts() {
      let districts = Array.from(this.district).filter(
        data => data.regency_id == this.labor.regency_id
      );
      return districts;
    }
  },
  created() {
    this.getDataLib();
  }
};
</script>

<style scoped>
</style>
