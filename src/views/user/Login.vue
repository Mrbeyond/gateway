<template>
<b-row class="h-100">
    <b-colxx xxs="12" md="10" class="mx-auto my-auto">
        <b-card class="auth-card shadow mt-4 mt-md-0 my-md-2" no-body>
            <div >
            <!-- class="position-relative image-side" -->
                <div class="text-center white mb-0">
                    <p class="h5 mt-md-4"><strong>Please use your credentials to login.</strong></p>
                    <p class="mb-2 mb-md-4">If you are not a member, please
                    <router-link tag="a" to="/user/register" class="white">register</router-link>.
                    </p>
                </div>
            </div>
            <div class="form-side">
                <router-link tag="a" to="/">
                    <span class="logo-single" />
                </router-link>
                <h6 class="mb-4">{{ $t('user.login-title')}}</h6>

                <b-form @submit.prevent="formSubmit" class="av-tooltip tooltip-label-bottom">
                    <b-form-group :label="$t('user.email')" class="has-float-label mb-4">
                      <b-form-input type="text" v-model="$v.form.email.$model"
                        :state="!$v.form.email.$error" placeholder="Email"
                      />
                      <b-form-invalid-feedback v-if="!$v.form.email.required">
                        Please enter your email address
                      </b-form-invalid-feedback>
                      <b-form-invalid-feedback v-else-if="!$v.form.email.email">
                        Please enter a valid email address
                      </b-form-invalid-feedback>
                      <b-form-invalid-feedback v-else-if="!$v.form.email.minLength">
                        our email must be minimum 8 characters
                      </b-form-invalid-feedback>
                    </b-form-group>

                    <b-form-group :label="$t('user.password')" class="has-float-label mb-4">
                        <b-form-input type="password"
                          v-model="$v.form.password.$model"
                          :state="!$v.form.password.$error"
                          placeholder="Password"
                        />
                        <b-form-invalid-feedback v-if="!$v.form.password.required">
                          Please enter your password
                        </b-form-invalid-feedback>
                        <b-form-invalid-feedback v-else-if="!$v.form.password.minLength || !$v.form.password.maxLength">
                          Your password must be between 8 and 16 characters
                        </b-form-invalid-feedback>
                    </b-form-group>
                    <div class="d-flex justify-content-between align-items-center">
                      <router-link tag="a" to="/user/forgot-password">{{ $t('user.forgot-password-question')}}</router-link>
                       <b-button type="submit" variant="primary" size="lg"
                          :disabled="processingAuth"
                          :class="{'btn-multiple-state btn-shadow': true,
                          'show-spinner': processingAuth,
                          'show-success': isLoggedIn && authError === false,
                          'show-fail': !processingAuth && authError }"
                        >
                            <span class="spinner d-inline-block">
                                <span class="bounce1"></span>
                                <span class="bounce2"></span>
                                <span class="bounce3"></span>
                            </span>
                            <span class="icon success">
                                <i class="simple-icon-check"></i>
                            </span>
                            <span class="icon fail">
                                <i class="simple-icon-exclamation"></i>
                            </span>
                            <span class="label">{{ $t('user.login-button') }}</span>
                        </b-button>
                    </div>
                </b-form>
            </div>
        </b-card>
    </b-colxx>
</b-row>
</template>

<script>
import {
    mapGetters
} from "vuex";
import {
    validationMixin
} from "vuelidate";
import { adminRoot } from '../../constants/config';
import { LOGIN } from '../../constants/formKey';
const {
    required,
    maxLength,
    minLength,
    email
} = require("vuelidate/lib/validators");

export default {
  data() {
      return {
          form: {
              // email: "test@coloredstrategies.com",
              // password: "xxxxxx"
            email: "adesinasamueloluwaseun@gmail.com",
            password: "12345678"
          },
      };
  },
  mixins: [validationMixin],
  validations: {
    form: {
      password: {
          required,
          maxLength: maxLength(16),
          minLength: minLength(8)
      },
      email: {
          required,
          email,
          minLength: minLength(8)
      }
    }
  },
    computed: {
      ...mapGetters(['user', "processingAuth", "authError", "isLoggedIn"]),
    },
    methods: {
      formSubmit() {
        this.$v.$touch();
        // this.form.email = "piaf-vue@coloredstrategies.com";
        // this.form.password = "piaf123";
        this.$v.form.$touch();
        // if (!this.$v.form.$anyError) {
        this.$store.dispatch(LOGIN, {
          email: this.form.email,
          password: this.form.password
        });
        //}
      }
    },

  watch: {
    user(val) {
      if (val){
        // console.log(val);
        this.$router.push(adminRoot);
      }
    },


    authError(val) {
      if (val != null) {
        this.$notify("error", "Login Error", val, {
          duration: 3000,
          permanent: false
        });
      }
    }
  }
};
</script>
