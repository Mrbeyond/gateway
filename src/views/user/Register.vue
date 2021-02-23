<template>
  <b-row class="h-100">
    <b-colxx xxs="12" md=10  class="mx-auto my-auto">
      <b-card class="auth-card shadow my-3" no-body>
          <div >
          <!-- class="position-relative image-side" -->
              <p class="mt-md-4 h5">  Please use this form to register. </p>
              <p class="mb-2 mb-md-4">If you are a member, please
                <router-link tag="a" to="/user/login" class="white" >login</router-link>.
              </p>
          </div>
          <div class="form-side">
            <router-link tag="a" to="/"><span class="logo-single"/></router-link>
            <h6 class="mb-4">{{ $t('user.register')}}</h6>
            <b-form @submit.prevent="formSubmit">

              <b-form-group >
                <label class="form-group has-float-label mb-4">
                  <input id="firstName" type="text"
                    class="form-control" v-model="firstname"
                    @blur="validateFirstName"
                    @keyup="validateTouch"
                    >
                  <span>{{ $t('user.firstname') }}</span>
                </label>
                <b-form-invalid-feedback :force-show="firstNameTouched && isFirstNameInvalid" >
                  Use a valid name with minimum of 3 characters
                </b-form-invalid-feedback>
              </b-form-group>

              <b-form-group >
                <label class="form-group has-float-label mb-4">
                  <input id="lastName" type="text"
                    class="form-control" v-model="lastname"
                    @blur="validateLastName"
                    @keyup="validateTouch"
                  >
                  <span>{{ $t('user.lastname') }}</span>
                </label>
                <b-form-invalid-feedback :force-show="lastNameTouched && isLastNameInvalid" >
                  Use a valid name with minimum of 3 characters
                </b-form-invalid-feedback>
              </b-form-group>


              <b-form-group >
              <label class="form-group has-float-label mb-4">
                <input id="Email" type="email"
                  class="form-control" v-model="email"
                  @blur="validateEmail"
                  @keyup="validateTouch"
                  >
                <span>{{ $t('user.email') }}</span>
              </label>
              <b-form-invalid-feedback :force-show="emailTouched && isEmailInvalid" >
                  Use a valid email
                </b-form-invalid-feedback>
              </b-form-group>

              <b-form-group>
                <label class="has-float-label">
                  <input id="Phone" type="text"
                      class="form-control" v-model="phone"
                      @blur="validatePhone"
                      @keyup="validateTouch"
                    >
                  <span>{{ $t('user.phone') }}</span>
                </label>
                <b-form-invalid-feedback :force-show="phoneTouched && isPhoneInvalid" >
                  A valid phone number is required
                </b-form-invalid-feedback>
              </b-form-group>

              <b-form-group >
                <label class="form-group has-float-label mb-4">

                   <b-form-select
                    v-model="country_id"
                    :options="busiParams"
                     @blur="validateCountryName"
                     @change="validateTouch"
                  ></b-form-select>
                      <!-- <b-form-select v-model="country_id" :options="country"></b-form-select> -->
                  <span>{{ $t('user.country-name') }}</span>
                </label>
                <b-form-invalid-feedback :force-show="countryNameTouched && isCountryNameInvalid" >
                  Please select your country
                </b-form-invalid-feedback>
              </b-form-group>

              <b-form-group>
                <label class="form-group has-float-label ">
                  <input id="Password" type="password"
                    class="form-control" v-model="password"
                    @blur="validatePassword"
                    @keyup="validateTouch"
                  >
                  <span>{{ $t('user.password') }}</span>
                </label>
                <b-form-invalid-feedback :force-show="passwordTouched && isPasswordInvalid" >
                  Use alphanumeric characters or an underscore with minimum length of 8
                </b-form-invalid-feedback>
              </b-form-group>

              <div class="text-center">
                <b-spinner v-if="submitting" label="Spinning"></b-spinner>
              </div>

              <div class="d-flex justify-content-end align-items-center">
                  <b-button type="submit" variant="primary" size="lg" class="btn-shadow"
                  >
                    {{ $t('user.register-button')}}
                  </b-button>
              </div>


              <b-toast variant="danger" id="example-toast" title="Something went wrong" >
                 {{ errType == 2?
                  'Please try again, there was error processing your regristration':
                  'User already exists!'
                 }}
              </b-toast>
          </b-form>
        </div>
      </b-card>
    </b-colxx>
  </b-row>
</template>
<script>
import axios from 'axios';
import { adminRoot, PROXY } from '../../constants/config'
import { setCurrentUser } from '../../utils';
import { BUSI_PARAM } from '../../constants/formKey';
export default {
  data () {
    return {
      attempted: false,
      wentWrong: false,
      successful: false,
      submitting: false,

      formIsValid: false,

      firstname: '',
      firstNameTouched: false,
      isFirstNameInvalid: false,

      lastname: '',
      isLastNameInvalid: false,
      lastNameTouched: false,

      phone: '',
      isPhoneInvalid: false,
      phoneTouched: false,

      country_id:'',
      countryNameTouched: false,
      isCountryNameInvalid: false,

      email: '',
      emailTouched: false,
      isEmailInvalid: false,

      password: '',
      passwordTouched: false,
      isPasswordInvalid: false,

      errType: 1,

    }
  },

  methods: {

    validatePhone(){
      this.phoneTouched = true;
      this.validateTouch();
    },
    validateFirstName(){
      this.firstNameTouched = true;
      this.validateTouch();
    },
    validateLastName(){
      this.lastNameTouched = true;
      this.validateTouch();
    },
    validateCountryName(){
      this.countryNameTouched = true;
      this.validateTouch();
    },
    validatePassword(){
      this.passwordTouched = true;
      this.validateTouch();
    },
    validateEmail(){
      this.emailTouched = true;
      this.validateTouch();
    },
    validateTouch(){
      let isFormValid ={
        fN: false,
        lN: false,
        em: false,
        ph: false,
        co: false,
        pa: false,
      }

      if(this.firstNameTouched){
        if(!/^[a-zA-Z]{3,}$/.test(this.firstname)){
          this.isFirstNameInvalid = true;
          isFormValid.fN = false;
        }else{
          this.isFirstNameInvalid = false;
          isFormValid.fN = true;
        }
      }
      if(this.lastNameTouched){
        if(!/^[a-zA-Z]{3,}$/.test(this.lastname)){
          this.isLastNameInvalid = true;
          isFormValid.lN = false;
        }else{
          this.isLastNameInvalid = false;
          isFormValid.lN = true;
        }
      }
      if(this.emailTouched){
        if(!/^\w+\.*\w+@\w+\.\w+$/.test(this.email)){
          this.isEmailInvalid = true;
          isFormValid.em = false;

        }else{
          this.isEmailInvalid = false;
          isFormValid.em = true;
        }
      }
      if(this.phoneTouched){
        if(!/^[0-9]{11,}$/.test(this.phone)){
          this.isPhoneInvalid = true;
          isFormValid.ph = false;
        }else{
          this.isPhoneInvalid = false;
          isFormValid.ph = true;
        }
      }

      if(this.countryNameTouched){
        if(!/^[0-9]{1,}$/.test(this.country_id)){
          this.isCountryNameInvalid = true;
          isFormValid.co = false;
        }else{
          this.isCountryNameInvalid = false;
          isFormValid.co = true;
        }
      }
      if(this.passwordTouched){
        if(!/^[_a-zA-Z0-9]{8,}$/.test(this.password)){
          this.isPasswordInvalid = true;
          isFormValid.pa = false;
        }else{
          this.isPasswordInvalid = false;
          isFormValid.pa = true;
        }
      }

      let checker = Object.values(isFormValid).findIndex(data=>data == false);
      this.formIsValid = checker > -1? false: true;
    },

    formSubmit () {
      if(this.submitting) return;
      // this.$router.push(adminRoot)
      this.phoneTouched = true;
      this.firstNameTouched = true;
      this.emailTouched = true;
      this.passwordTouched = true;
      this.countryNameTouched = true;
      this.playerIdTouched = true;
      this.lastNameTouched = true;
      this.validateTouch();
      if(!this.formIsValid){
        return;
      }

      let formData = {
        firstname: this.firstname,
        lastname: this.lastname,
        email: this.email,
        phone: this.phone,
        country_id: this.country_id,
        password: this.password,
      }

      // console.log(formData);
      this.submitting = true;
      axios.post(`${PROXY}user/register`, formData)
      .then(res=>{
        if(!res.data.error){
          localStorage.authToken = res.data.data.authorization
          delete res.data.data.authorization;
          const authUser = res.data.data;
          setCurrentUser(authUser)
          this.$store.commit("setUser", authUser);
        }else{
          this.$store.commit("setUser", null);
          this.$bvToast.show("example-toast");
          // commit('setError', "Something went wrong");
        }
        this.submitting = false;
      })
      .catch(err=>{
        // console.log(err);
        if(err && err.response && err.response.code){
          let code = err.response.code;
          if(code === 403){
            this.errType = 2;
          }else{
            this.errType = 1;
          }
        }

        this.$bvToast.show("example-toast");
        this.submitting = false;
      })
    },

    // fetchCountries(){
    //   this.$store.dispatch(BUSI_PARAM)
    // },
  },

  computed:{
    tempMail(){
      let mail = this.$store.getters.tempMail;
      this.email = mail;
      return mail;
    },

    busiParams(){
      let val = this.$store.getters.busiParams;
      // console.log(val);
      if(val){
        val = val.countries.map(data=>({value:data.id, text: data.name}))
      }
      return val;
    }
  },

  watch: {
    tempMail(val){
      this.email = val;
    }
  },

  created(){
      // this.fetchCountries();
  }

}
</script>
