<template>
<<<<<<< HEAD
  <div id="app-container" :class="getMenuType">
    <sidebar />
    <topnav />
    <main>
=======
  <div id="app-container" >

    <!-- Desktop static sidebar -->
    <div
      id="sideBar" ref="sideBar"
      v-show="show"
      :style="`position: fixed; top:0, left:0; z-index: 50000; width: ${show?200:0}px`"
      class="bg-primary h-100"
    >
      <manual-side-vue />
    </div>

    <!-- Mobile modal sidebar -->
    <b-modal v-model="mobily" :hide-header="true"
      :hide-footer="true" modal-class="modal-left ">
      <manual-side-vue />
    </b-modal>

    <!-- Top navbar -->
    <topnav />

    <!-- Main Container -->
    <div :style="`margin-left:  ${show?200:0}px`">
>>>>>>> ab760859334e180e7a29cb424a4933b7738be9a0
      <div class="container-fluid">
        <slot></slot>
      </div>
    </div>



      <!--
        <main>
          <div class="container-fluid">
            <slot></slot>
          </div>
        </main>
    -->
    <footer-component />
  </div>
</template>

<script>
import Sidebar from "../containers/navs/Sidebar";
import Topnav from "../containers/navs/Topnav";
import Footer from "../containers/navs/Footer";
import ManualSideVue from '../containers/navs/ManualSide.vue';

import { mapGetters } from "vuex";
import { MOBILE, SHOW } from '../constants/formKey';

export default {
  components: {
    topnav: Topnav,
    sidebar: Sidebar,
    "footer-component": Footer,
    ManualSideVue,
  },
  data() {
    return {
      mobily: true,
    };
  },

  methods: {

    processSideBar(){
      let cond = window.innerWidth > 768;
      this.$store.commit(SHOW, cond);
    }

  },

  computed: {
    ...mapGetters(["show"]),

    mobile(){
      let val = this.$store.getters.mobile;
      this.mobily = val;
      return val;
    }

  },
  mounted() {

    setTimeout(() => {
      document.body.classList.add("default-transition");
    }, 100);
  this.processSideBar();
  window.addEventListener('resize', this.processSideBar);

  },

  watch:{
    getMenuType(val){
        console.log(val, 'from app layout menu type');
    },


    mobile(val){
      this.mobily = val;
    },

    mobily(val){
      this.$store.commit(MOBILE, val);
    }

  },

  beforeUnmount() {
    window.removeEventListener('resize', this.processSideBar)
  },
};
</script>
