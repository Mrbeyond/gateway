<template>
<b-row>
    <b-colxx xxs="12">
        <b-card class="mb-4">
            <b-form ref="form" @submit.prevent="onValitadeFormSubmit" class="av-tooltip tooltip-label-right">
                <b-form-group label="Business name">
                  <b-form-input type="text" v-model="$v.name.$model" :state="!$v.name.$error" />
                  <b-form-invalid-feedback v-if="!$v.name.required">Please enter your first name</b-form-invalid-feedback>
                  <b-form-invalid-feedback v-else-if="!$v.name.minLength">Name must at least 3 characters</b-form-invalid-feedback>
                  <b-form-invalid-feedback v-else-if="!$v.name.alpha">Your name must be composed only with letters</b-form-invalid-feedback>
                </b-form-group>

                <b-form-group label="Description" class="error-l-100">
                  <b-form-input type="text" v-model="$v.business_description.$model" :state="!$v.business_description.$error" />
                  <b-form-invalid-feedback v-if="!$v.business_description.required">Please enter your last name</b-form-invalid-feedback>
                  <b-form-invalid-feedback v-else-if="!$v.business_description.minLength">Name must at least 3 characters</b-form-invalid-feedback>
                  <b-form-invalid-feedback v-else-if="!$v.business_description.alpha">Your name must be composed only with letters</b-form-invalid-feedback>
                </b-form-group>

                <b-form-group label="Email">
                  <b-form-input type="text" v-model="$v.email.$model" :state="!$v.email.$error" />
                  <b-form-invalid-feedback v-if="!$v.email.required">Please enter your email address</b-form-invalid-feedback>
                  <b-form-invalid-feedback v-else-if="!$v.email.email">Please enter a valid email address</b-form-invalid-feedback>
                </b-form-group>

                <b-form-group label="Phone" class="error-l-100">
                  <b-form-input type="text" v-model="$v.phone.$model" :state="!$v.phone.$error" />
                  <b-form-invalid-feedback v-if="!$v.phone.required">Please enter phone number</b-form-invalid-feedback>
                  <b-form-invalid-feedback v-else-if="!$v.phone.numeric">Enter valid phone number</b-form-invalid-feedback>
                  <b-form-invalid-feedback v-else-if="!$v.phone.minLength">Enter valid phone number</b-form-invalid-feedback>
                </b-form-group>

                <b-form-group label="Address" class="error-l-100">
                  <b-form-input type="text" v-model="$v.address.$model" :state="!$v.address.$error" />
                  <b-form-invalid-feedback v-if="!$v.address.required">Address is required</b-form-invalid-feedback>
                </b-form-group>

                <b-form-group label="Industry category" class="error-l-100">
                  <b-select type="text" v-model="$v.industry_category_id.$model" :state="!$v.industry_category_id.$error" />
                  <b-form-invalid-feedback v-if="!$v.industry_category_id.required">Industry category is required</b-form-invalid-feedback>
                </b-form-group>

                <b-form-group label="Business type" class="error-l-100">
                  <b-select type="text" v-model="$v.business_type_id.$model" :state="!$v.business_type_id.$error" />
                  <b-form-invalid-feedback v-if="!$v.business_type_id.required">Business type category is required</b-form-invalid-feedback>
                </b-form-group>

                <b-form-group label="Staff size" class="error-l-100">
                  <b-select type="text" v-model="$v.staff_size_id.$model" :state="!$v.staff_size_id.$error" />
                  <b-form-invalid-feedback v-if="!$v.staff_size_id.required">Staff size is required</b-form-invalid-feedback>
                </b-form-group>

                <b-input-group >
                  <template>
                    <b-form-group label="State" class="error-l-100">
                      <b-select type="text" v-model="$v.industry_category_id.$model" :state="!$v.industry_category_id.$error" />
                      <b-form-invalid-feedback v-if="!$v.industry_category_id.required">Industry category is required</b-form-invalid-feedback>
                    </b-form-group>
                  </template>
                  <template>
                    <b-form-group label="State" class="error-l-100">
                      <b-select type="text" v-model="$v.industry_category_id.$model" :state="!$v.industry_category_id.$error" />
                      <b-form-invalid-feedback v-if="!$v.industry_category_id.required">Industry category is required</b-form-invalid-feedback>
                    </b-form-group>
                  </template>
                </b-input-group>

                <b-form-group label="City" class="error-l-100">
                  <b-form-input type="text" v-model="$v.city.$model" :state="!$v.city.$error" />
                  <b-form-invalid-feedback v-if="!$v.city.required">City is required</b-form-invalid-feedback>
                </b-form-group>

                <div class="text-center">
                  <b-spinner v-if="submitting" label="Spinning"></b-spinner>
                </div>

                <div class="text-center">
                  <b-button type="submit" variant="primary" class="mt-4">{{ $t('forms.submit') }}</b-button>
                </div>

                <b-toast :variant="variant" id="example-toast"
                title="Response" auto-hide-delay="8000"
                >
                  {{resMessage }}
                </b-toast>
            </b-form>
        </b-card>
    </b-colxx>
</b-row>
</template>

<script>
import Axios from 'axios';
import {
    validationMixin
} from "vuelidate";
import { PROXY } from '../../../../constants/config';
import { BUSINESSES, AGENTTYPES, AUTO_FETCHING, GARAGES, genRand, hToken } from '../../../../constants/formKey';
import { mapGetters } from 'vuex';
const {
    required,
    minLength,
    alpha,
    email,
    numeric,
} = require("vuelidate/lib/validators");


export default {
  props:['currentBIz'],
  data() {
    return {
      name: "",
      business_description: "",
      email: "",
      phone: "",
      address: '',
      industry_category_id: "",
      business_type_id:"",
      staff_size_id:'',
      state_id: "",
      city:"",

      resMessage: "",
      submitting: false,
      variant: "success",

    };
  },
  mixins: [validationMixin],
  validations: {
    name: {
      required,
    },
    email: {
      required,
      email
    },
    business_description: {
      required,
      minLength: minLength(3)
    },
    phone: {
      required,
      numeric,
      minLength: minLength(11)
    },
    address: {
        required,
    },
    industry_category_id: {
        required,
    },
    staff_size_id: {
        required,
    },
    state_id: {
        required,
    },
    city: {
        required,
    },
    business_type_id: {
        required,
    },

  },

  computed: {
    ...mapGetters(['momentBiz'])

  },

  watch:{
    currentBiz(val){

      console.log(val);
      this.name= val.name;
      this.business_description= "";
      this.email= val.email;
      this.phone= val.contact;
      this.address= val.address;
      this.industry_category_id= "";
      this.business_type_id="";
      this.staff_size_id='';
      this.state_id= "";
      this.city=val.state.city;
    }

  },

  methods: {

    regetAgentTypes(){
      this.$store.dispatch(AGENTTYPES);
    },

    monitorType(){
      // console.log(this.industry_category_id);
      this.business_type_id = "";
      this.selectedGarage = "";
    },

    processSelectedLG(){
      this.$store.dispatch(GARAGES,this.selectedLG);
    },

    onValitadeFormSubmit() {
      this.$v.$touch();
      if(this.$v.$invalid) return;
      let service = this.industry_category_id.toString().trim();
      if(!this.selectedGarage && !this.business_type_id){
        if(service == "commercial"){
          this.resMessage = "Choose a garage";
        }else{
          this.resMessage = "Choose a port";
        }
        this.variant = "danger";
        this.$bvToast.show("example-toast");
        return;
      }

      let id= service == "import"? this.business_type_id : this.selectedGarage;

      if(this.submitting) return;
      let formData = {
        phone:this.phone,
        name:this.name,
        business_description:this.business_description,
        email:this.email,
        industry_category_id: service,
        garage_id: id,
        address: this.address,
        payer_id:this.payer_id,
      };


      // return console.log(formData);
      // console.log(hToken());
      this.submitting = true;
      Axios.post(`${PROXY}business`, formData, {headers: hToken()})
      .then(res=>{
        if(!res.data.error){

          this.variant = "success";
          this.resMessage = res.data.message;
          this.$refs.form.reset();
          this.$store.dispatch(BUSINESSES);
        }else{
          this.variant = "danger";
          this.resMessage = "Something went wrong, please retry"
          // commit('setError', "Something went wrong");
        }
        this.$bvToast.show("example-toast");
        this.submitting = false;
      })
      .catch(err=>{
       this.variant = "danger";
        if(err && err.response){
         if(err.response.data && err.response.data.message){
           this.resMessage = err.response.data.message
         }else{
          this.resMessage = "Something went wrong, please retry"
         }
        }

        this.$bvToast.show("example-toast");
        this.submitting = false;
      })
    },


  },
  mounted(){
    // console.log(genRand(),4545);
    // console.log(this.lgs);
  }
};
</script>
