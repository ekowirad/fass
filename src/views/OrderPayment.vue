<template>
  <div class="order-payment">
    <v-container grid-list-md>
      <v-dialog v-model="dialog" persistent max-width="750px">
        <v-card>
          <v-toolbar flat style="background: transparent;">
            <v-toolbar-title class="title green--text">Konfirmasi Pembayaran</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon @click="close">
              <v-icon>close</v-icon>
            </v-btn>
          </v-toolbar>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-card-text>
              <v-text-field
                :readonly="readonly"
                :rules="rField"
                v-model="payment.note_id"
                label="Nomor Nota"
              />
              <v-text-field
                :readonly="readonly"
                :rules="rField"
                v-model="payment.name"
                label="Nama Lengkap"
              />
              <v-text-field
                :readonly="readonly"
                :rules="rField"
                v-model="payment.handphone"
                type="number"
                label="Nomor Telepon"
              />
              <v-textarea
                :readonly="readonly"
                :rules="rField"
                v-model="payment.address"
                label="Alamat"
              />
            </v-card-text>
          </v-form>
          <v-container>
            <v-img
              v-if="payment.file !=''"
              :src="payment.file"
              height="300px"
              aspect-ratio="1"
              @click="dialogImg = true"
            />
            <v-flex grow class="text-xs-center" v-else>
              <v-icon size="120">collections</v-icon>
              <div class="subheader">*Foto bukti pembayaran</div>
            </v-flex>
          </v-container>
          <v-card-actions v-if="!readonly">
            <v-spacer></v-spacer>
            <v-btn :disabled="loading" flat @click="pickSingleFile">
              <input type="file" style="display:none" ref="singleFile" @change="onSingleFilePicked" />
              <v-icon left>attach_file</v-icon>Unggah foto
            </v-btn>
            <v-btn :loading="loading" color="success" depressed @click="send">Konfirmasi</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- IMAGE DIALOG -->
      <v-dialog v-model="dialogImg" max-width="800px" transition="dialog-transition">
        <v-card>
          <v-img :src="payment.file" style="max-width:100%; max-height:100%;"></v-img>
        </v-card>
      </v-dialog>

      <!-- Dialog Sucess -->
      <v-dialog v-model="dialogSucess" persistent max-width="500">
        <v-card>
          <v-card-title class="headline green--text">
            <v-icon color="success" left>check</v-icon>Konfirmasi Berhasil
          </v-card-title>
          <v-card-text>Terima kasih telah melakukan konfirmasi pembayaran, kami akan mengecek bukti pembayaran anda lebih lanjut</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" flat @click="dialogSucess = false">Ok!</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      dialogImg: false,
      dialogSucess: false,
      loading: false,
      readonly: false,
      payment: {
        file: ""
      },
      file: "",
      formData: new FormData(),
      rField: [v => !!v || "Kolom ini tidak boleh kosong"]
    };
  },
  methods: {
    send() {
      if (this.$refs.form.validate() && this.payment.file != "") {
        this.appendDataForm();
        this.loading = true;
        this.$http
          .post("order_payment", this.formData)
          .then(ress => {
            this.loading = false;
            this.dialog = false;
            this.dialogSucess = true;
            this.$refs.form.reset();
            this.payment = {
              file: ""
            };
            console.log("ress order", ress);
          })
          .catch(e => {
            this.loading = false;
            console.log("err order", e.response);
          });
      }
    },
    close() {
      this.dialog = false;
      this.$store.commit("labor/RESET_STATE_OBJ", "orderPayment");
      this.$refs.form.resetValidation();
      this.payment = {
        file: ""
      };
    },
    appendDataForm() {
      this.formData.append("name", this.payment.name);
      this.formData.append("address", this.payment.address);
      this.formData.append("note_id", this.payment.note_id);
      this.formData.append("handphone", this.payment.handphone);
    },
    pickSingleFile() {
      this.$refs.singleFile.click();
    },
    onSingleFilePicked(e) {
      const files = e.target.files;
      let reader = new FileReader();

      if (files.length != 0) {
        if (/\.(jpe?g|png|gif|svg)$/i.test(files[0].name)) {
          this.formData.append("payment_file", files[0]);
          reader.readAsDataURL(files[0]);
          reader.addEventListener("load", () => {
            this.payment.file = reader.result;
          });
        }
      }
    }
  },
  created() {
    if (Object.keys(this.$store.getters["labor/orderPayment"]).length !== 0) {
      this.readonly = true;
      this.payment = this.$store.getters["labor/orderPayment"];
      this.$store.watch(
        state => {
          return this.$store.getters["labor/orderPayment"];
        },
        (newVal, oldVal) => {
          this.payment = newVal;
        }
      );
    }
  }
};
</script>

<style>
</style>