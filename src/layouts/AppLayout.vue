<template>
  <div v-if="!businesses && isLoading" style="height:95vh"
    class="d-flex align-items-center justify-content-center"
  >
    <b-spinner variant="primary" />

  </div>
  <div v-else-if="!businesses && !isLoading" style="height:95vh"
    class="d-flex align-items-center justify-content-center"
  >
    Went wrong page
  </div>
  <div v-else id="app-container" >
      <!-- Top navbar -->
     <topnav />


    <!-- Desktop static sidebar -->
    <div
      id="sideBar" ref="sideBar"
      v-show="show"
      :style="`width: ${show?200:0}px`"
      class="bg-primary h-100 desktopSideBar"
    >
      <manual-side />
    </div>

    <!-- Mobile modal sidebar -->
    <b-modal v-model="mobily" :hide-header="true"
      style="padding:0"
      :hide-footer="true" body-class="p-0 bg-primary" modal-class="modal-left ">
      <manual-side />
    </b-modal>




    <!-- Main Container -->
    <div :style="`height:100%; margin-left:  ${show?200:0}px; margin-top:85px`">
      <div class="container-fluid">
        <b-row >
            <b-colxx xxs="12">
                <piaf-breadcrumb />
            </b-colxx>
        </b-row>
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
// import Sidebar from "../containers/navs/Sidebar";
import Topnav from "../containers/navs/Topnav";
import Footer from "../containers/navs/Footer";
import ManualSide from '../containers/navs/ManualSide.vue';

import { mapGetters } from "vuex";
import { BUSINESSES, BUSI_PARAM, MOBILE, SHOW } from '../constants/formKey';

export default {
  components: {
    topnav: Topnav,
    // sidebar: Sidebar,
    "footer-component": Footer,
    ManualSide,
  },
  data() {
    return {
      mobily: true,
      isLoading: true,
    };
  },

  methods: {

    processSideBar(){
      let cond = window.innerWidth > 768;
      this.$store.commit(SHOW, cond);
    },

  },

  computed: {
    ...mapGetters(["show", "businesses", "resKey"]),

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
    resKey(val){
      if(this.resKey.owner && this.resKey.owner == BUSINESSES){
        if(val.status == 1){
          this.isLoading = true;
        }else if(val.status == 3){
          this.isLoading = false;
        }else if(val.status == 2){
          this.isLoading = false;
        }
      }
    },

    getMenuType(val){
        // console.log(val, 'from app layout menu type');
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

<style lang="scss" scoped>

.desktopSideBar{
  position: fixed;
  top:0;
  left:0;
  z-index: 50000;
}

</style>
