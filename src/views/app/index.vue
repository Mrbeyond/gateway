<template>
  <app-layout>
    <router-view />
  </app-layout>
</template>


<script>// @ts-nocheck
import { mapGetters } from 'vuex';
import { lastBiz } from '../../constants/config';
import { BUSINESSES, BUSI_PARAM, CONNECTION, EXCHANGE_RATES } from '../../constants/formKey';

// write security logics here, beyond.

import AppLayout from "../../layouts/AppLayout.vue";

export default {
  components: {
    "app-layout": AppLayout
  },

  computed: {
    ...mapGetters(['momentBiz', 'currentBiz', 'connection', 'resKey', 'businesses']),


  },

  watch: {
    navigator(val){
      if(!val.onLine){
        this.$notify("error", "Network", "You don't seem to have active internet connection", {
          duration: 1500,
          permanent: false
        });
      }
    },

    connection(val){
      if(val){
        if(this.resKey.status == 3 && this.resKey.owner == BUSINESSES){
          this.fetchBizs();
        }
      }
    }
  },

  methods:{
  fetchBizs(){
    let user =  this.$store.getters.user;
    if(user && user.businesses && user.businesses.length > 0){
      this.$store.dispatch(BUSINESSES, this.momentBiz || this.currentBiz);
    }else{
      localStorage.clear();
      this.$router.push('/user/login');
    }
  },

    fetchCountries(){
      this.$store.dispatch(BUSI_PARAM);
      this.$store.dispatch(EXCHANGE_RATES);
    },

    monitorNetwork(){
      if(!window.navigator.onLine){
        this.$store.commit(CONNECTION, false);
         this.$notify("error", "Network", "You don't seem to have internet connection", {
          duration: 1500,
          permanent: false
        });
      }else{
        this.$store.commit(CONNECTION, true);
      }
    }

  },


  created(){
    this.fetchCountries();
    this.fetchBizs();
    this.monitorNetwork();
    window.addEventListener('online', this.monitorNetwork);
    window.addEventListener('offline', this.monitorNetwork);
  },

  beforeDestroy(){
    window.removeEventListener('online', this.monitorNetwork);
    window.removeEventListener('offline', this.monitorNetwork);
  }

}
</script>
