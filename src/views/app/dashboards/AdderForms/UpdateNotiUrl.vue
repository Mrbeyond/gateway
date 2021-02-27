<template>
  <div>
    <b-form  ref="form" @submit.prevent="onValitadeFormSubmit"
      class="av-tooltip tooltip-label-right mt-4"
    >

        <b-form-group label="Url address" class="error-l-100">
          <b-form-input v-model="$v.url.$model"
            :state="!$v.url.$error"
          />
          <b-form-invalid-feedback v-if="!$v.url.required">Url <address></address>Url address is required</b-form-invalid-feedback>
           <b-form-invalid-feedback v-if="!$v.url.url">Url <address></address>Enter valid url address</b-form-invalid-feedback>
        </b-form-group>



          <b-form-group label="Secret" class="error-l-100">
            <b-form-input type="text" v-model="$v.secret.$model"
              :state="!$v.secret.$error"
            />
            <b-form-invalid-feedback v-if="!$v.secret.required">Secret is required</b-form-invalid-feedback>
          </b-form-group>

          <div class="text-center">
            <b-spinner v-if="submitting" label="Spinning"></b-spinner>
          </div>

          <div class="text-center">
            <b-button type="submit" variant="primary" class="mt-4">{{ $t('forms.submit') }}</b-button>
          </div>
  </b-form>
  </div>
</template>
<script>
import Axios from 'axios';
import { validationMixin} from "vuelidate";
import { PROXY } from '../../../../constants/config';
import { hToken } from '../../../../constants/formKey';
import { mapGetters } from 'vuex';
const { url, required } = require("vuelidate/lib/validators");

export default {
  props: ['noti_url'],
  data () {
    return {
      submitting: false,
      url: '',
      secret: '',

    }
  },
  mixins: [validationMixin],
  validations: {
    url: {
      required,
      url,
    },
    secret: {
      required,
    },
  },

  computed: {
    ...mapGetters(['momentBiz']),
  },

  watch: {
    noti_url(val){
      this.spreadNoti(val);
    }
  },

  methods: {

    spreadNoti(val){
      if(!val) return;
      this.url = val.url;
      this.secret = val.secret;
    },

    onValitadeFormSubmit () {
      this.$v.$touch();
      if(this.$v.$invalid) return;
      if(this.submitting) return;
      let formData = {
        url: this.url,
        secret: this.secret,
      }
      let val = "Something went wrong";
      this.submitting = true;
      Axios.post(`${PROXY}/business/${this.momentBiz}notification/webhook/live`, formData, {headers: hToken()})
      .then(res=>{
        if(!res.data.error){
          val = res.data.message
          this.$store.dispatch(BUSINESSES);
          this.$notify("success", "Success message", val, {
            duration: 3000,
            permanent: false
          });

          this.$emit('close')
        }else{
          this.$notify("error", "Error message", val, {
          duration: 3000,
          permanent: false
        });
        }
        this.submitting = false;
      })
      .catch(err=>{
        if(err.response){
          val = err.response.data.message;
        }
        this.$notify("error", "Error message", val, {
          duration: 3000,
          permanent: false
        });
        this.submitting = false;
      })
    }
  },

  created(){
    this.spreadNoti(this.noti_url)
  //  console.log(this.noti_url, 'from form');
  },

  beforeDestroy() {
    this.url ='';
    this.secret = '';
    this.$emit('close')
    // alert();
  },
}
</script>
