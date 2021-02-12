<template>
  <b-row class="h-100">
    <b-colxx xxs="12" md=10  class="mx-auto my-auto">
      <b-card class="auth-card" no-body>
          <div class="position-relative image-side ">
            <p class=" text-white h2">{{ $t('dashboards.magic-is-in-the-details') }}</p>
              <p class="white mb-0">  Please use this form to register. <br />If you are a member, please
                <router-link tag="a" to="/user/login" class="white">login</router-link>.
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
                    >
                  <span>{{ $t('user.firstname') }}</span>
                </label>
              </b-form-group>

              <b-form-group >
                <label class="form-group has-float-label mb-4">
                  <input id="lastName" type="text"
                    class="form-control" v-model="lastname"
                  >
                  <span>{{ $t('user.lastname') }}</span>
                </label>
              </b-form-group>


              <b-form-group >
              <label class="form-group has-float-label mb-4">
                <input id="Email" type="date"
                  class="form-control" v-model="date_of_birth"
                  >
                <span>{{ $t('user.date-of-birth') }}</span>
              </label>
              </b-form-group>

              <b-form-group>
                  gender
                <label class="has-float-label">
                  <input id="Phone" type="text"
                      class="form-control" v-model="phone"
                      @blur="validatePhone"
                      @keyup="validateTouch"
                    >
                  <span>{{ $t('user.gender') }}</span>
                </label>
                <b-form-invalid-feedback :force-show="phoneTouched && isPhoneInvalid" >
                  A valid phone number is required
                </b-form-invalid-feedback>
              </b-form-group>

              <div class="text-center">
                <b-spinner v-if="submitting" label="Spinning"></b-spinner>
              </div>

              <div class="d-flex justify-content-end align-items-center">
                  <b-button type="submit" variant="primary" size="lg" class="btn-shadow"
                  >
                    {{ $t('user.update-button')}}
                  </b-button>
              </div>


              <b-toast variant="danger" id="example-toast" title="Something went wrong" >
                {{response}}
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
export default {
  data () {
    return {
      submitting: false,

      formIsValid: false,

      firstname: '',

      lastname: '',

      date_of_birth:"",

      gender:'',
      response:""

    }
  },
      
  methods: {

    formSubmit () {
      if(this.submitting) return;
     let formData = {
      firstname:this.firstname,
      lastname:this.lastname,
      date_of_birth:this.date_of_birth,
      gender :this.gender,
      }

        this.submitting = true;
      axios.post(`${PROXY}user/profile'`, formData)
      .then(res=>{
        if(!res.data.error){
            this.response = res.data.message
            this.$bvToast.show("example-toast");
        }else{
            this.response = res.data.message
            this.$bvToast.show("example-toast");
        }
        this.submitting = false;
      })
      .catch(err=>{
        console.log(err);
        if(err && err.response){
        }
          this.response = err.response.error
        this.$bvToast.show("example-toast");
      })
    }
  }
}
</script>
