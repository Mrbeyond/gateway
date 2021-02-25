<template>
  <app-layout>
    <router-view />
  </app-layout>
</template>


<script>// @ts-nocheck
import { mapGetters } from 'vuex';
import { lastBiz } from '../../constants/config';
import { BUSINESSES, BUSI_PARAM } from '../../constants/formKey';

// write security logics here, beyond.

import AppLayout from "../../layouts/AppLayout.vue";

export default {
  components: {
    "app-layout": AppLayout
  },

  computed: {
    ...mapGetters(['momentBiz', 'currentBiz'])
  },
  methods:{
    fetchBizs(){
      let user = this.$store.getters.user;
      if(user && user.businesses && user.businesses.length > 0){
        this.$store.dispatch(BUSINESSES, this.momentBiz || this.currentBiz);
      }else{
        localStorage.clear();
        this.$router.push('/user/login')
      }
    },

    fetchCountries(){
      this.$store.dispatch(BUSI_PARAM);
    },

  },


  created(){
    this.fetchCountries();
    this.fetchBizs();
  },

}
</script>
