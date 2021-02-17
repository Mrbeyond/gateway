<template>
  <app-layout>
    <router-view />
  </app-layout>
</template>


<script>// @ts-nocheck
import { BUSINESSDETAILS } from '../../constants/formKey';

// write security logics here, beyond.

import AppLayout from "../../layouts/AppLayout.vue";

export default {
  components: {
    "app-layout": AppLayout
  },

  methods:{
    processBusiness(){
      let user = this.$store.getters.user;
      if(user && user.businesses && user.businesses.length > 0){
        let id;
        if(this.currentBiz){
          id = user.businesses.find(d=> d.id == this.currentBiz)?
          user.businesses.find(d=> d.id == this.currentBiz).id:
          user.businesses[0].id;
        }else{
         id = user.businesses[0].id;
        }

        this.$store.dispatch(BUSINESSDETAILS, id);

      }else{
        localStorage.clear();
        this.$router.push('/user/login')
      }
    },

  },

  watch:{
    currentBiz(val){
      if(!val) return;
      this.$store.dispatch(BUSINESSDETAILS, id);
    },

  },

  computed: {
    currentBiz(){
      return this.$store.getters.currentBiz;
    },
  },

  created(){
    this.processBusiness()
  },

}
</script>
