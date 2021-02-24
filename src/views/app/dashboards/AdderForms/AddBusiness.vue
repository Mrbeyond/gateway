<template>
<b-row>
    <b-colxx xxs="12">
        <b-card class="mb-4">
            <b-form ref="form" @submit.prevent="onValitadeFormSubmit" class="av-tooltip tooltip-label-right">
                <b-form-group label="Business name">
                  <b-form-input type="text" v-model="$v.name.$model" :state="!$v.name.$error" />
                  <b-form-invalid-feedback v-if="!$v.name.required">Please business name</b-form-invalid-feedback>
                </b-form-group>

                <b-form-group label="Description" class="error-l-100">
                  <b-form-input type="text" v-model="$v.business_description.$model" :state="!$v.business_description.$error" />
                  <b-form-invalid-feedback v-if="!$v.business_description.required">Please enter business decription</b-form-invalid-feedback>
                  <b-form-invalid-feedback v-else-if="!$v.business_description.minLength">Description not long enough</b-form-invalid-feedback>
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
                  <b-select v-model="$v.industry_category_id.$model"
                    :state="!$v.industry_category_id.$error"
                    :options="categoryModel"
                  />
                  <b-form-invalid-feedback v-if="!$v.industry_category_id.required">Industry category is required</b-form-invalid-feedback>
                </b-form-group>

                <b-form-group label="Business type" class="error-l-100">
                  <b-select v-model="$v.business_type_id.$model"
                    :state="!$v.business_type_id.$error"
                    :options="typeModel"
                  />
                  <b-form-invalid-feedback v-if="!$v.business_type_id.required">Business type category is required</b-form-invalid-feedback>
                </b-form-group>

                <b-form-group label="Staff size" class="error-l-100">
                  <b-select v-model="$v.staff_size_id.$model"
                    :state="!$v.staff_size_id.$error"
                    :options="staffModel"
                  />
                  <b-form-invalid-feedback v-if="!$v.staff_size_id.required">Staff size is required</b-form-invalid-feedback>
                </b-form-group>

                <b-input-group >
                  <template>
                    <b-form-group label="Country" class="error-l-100">
                      <b-select
                        v-model="country"
                        :options="countryModel"
                      />
                    </b-form-group>
                  </template>
                  <template>
                    <b-form-group label="State" class="error-l-100">
                      <b-select
                        v-model="$v.state_id.$model"
                        :state="!$v.state_id.$error"
                        :options="stateModel"
                       />
                      <b-form-invalid-feedback v-if="!$v.state_id.required">Please choose a state</b-form-invalid-feedback>
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
import { keepBiz, PROXY } from '../../../../constants/config';
import { BUSINESSDETAILS, BUSINESSES, hToken, MOMENT_BIZ } from '../../../../constants/formKey';
import { mapGetters } from 'vuex';
const {
    required,
    minLength,
    alpha,
    email,
    numeric,
} = require("vuelidate/lib/validators");


export default {
  data() {
    return {
      name: "",
      business_description: "",
      email: "",
      phone: "",
      address: '',
      industry_category_id: null,
      business_type_id: null,
      staff_size_id:'',
      state_id: null,
      city:"",
      country:'',
      categoryModel: null,
      countryModel: null,
      staffModel: null,
      stateModel: null,
      typeModel: null,



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
   ...mapGetters(['busiParams'])

  },

  watch:{
    busiParams(val){
      if(val){
        this.automateModel(val);
      }
    },

    country(val){
      if(val){
        console.log(this.busiParams.countries.find(data=>data.id == val).states, val);
        this.stateModel = this.busiParams.countries.find(data=>data.id == val)
        .states.map(d=>({value:d.id, text: d.name}))
      }
    }
  },

  methods: {

    automateModel(val){
      console.log("here");
      this.countryModel = val.countries.map(data=>({value:data.id, text: data.name}))
      this.staffModel = val.staff_sizes.map(data=>({value:data.id, text: data.name}))
      this.typeModel = val.business_types.map(data=>({value:data.id, text: data.name}))
      this.categoryModel = val.industries.map(data=>({value:data.id, text: data.name}))

    },

    onValitadeFormSubmit() {
      this.$v.$touch();
      if(this.$v.$invalid) return;

      if(this.submitting) return;
      let formData = {
        name:this.name,
        email:this.email,
        business_description:this.business_description,
        phone:this.phone,
        address:this.address,
        industry_category_id:this.industry_category_id,
        staff_size_id:this.staff_size_id,
        state_id:this.state_id,
        city:this.city,
        business_type_id:this.business_type_id,
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
          console.log(res.data.data.id, "new id");
          keepBiz(res.data.data.id);
          this.$store.commit(MOMENT_BIZ, res.data.data.id);
        }else{
          this.variant = "danger";
          this.resMessage = "Something went wrong, please retry"
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
  created(){
    this.automateModel(this.busiParams);
  }
};
</script>
