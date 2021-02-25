<template>
  <div>
    <div v-if="isLoading && !isFetched && !businesses" class="row justify-content-center">
        <div> <b-spinner variant="primary" /></div>
    </div>
    <div v-else-if="(!isLoading && !isFetched) && !businesses">
        Went wrong slot
    </div>
    <b-row v-else>
      <b-colxx  xxs="12">
        <b-row>
          <b-colxx class="text-right mb-3">
            <b-button @click="addBiz" >Add a Business</b-button>
          </b-colxx>
        </b-row>
        <b-row>
          <b-colxx sm="12 d-flex" md="7" >
            <div class="flex-fill">
              <b-card body-class="pt-0" header-class="py-2">
                <template #header>
                  <div  class="d-flex justify-content-between">
                    <h6 class="mb-0">Current</h6>
                    <div>
                      <b-button @click="editBiz" size="sm" class="py-1">Edit</b-button>
                    </div>
                  </div>
                </template>
                <!-- Card Body -->
                <template >
                  <b-card-text v-if="current" class="mt-0">

                    <div class="mb-3 d-flex">
                      <div class="d-inline-block">
                        <b-avatar
                          :src="SRC"
                          id="withLogo"
                          size="6rem"
                          :text="current.name.charAt(0)"
                        >
                        </b-avatar>
                        <div>
                        <b-button-group class="mt-2" size="sm">
                          <b-button class="py-0 " >
                            <label class="p-0 mt-2 w-100">
                              <i style="font-size:1.5em" class="simple-icon-camera p-0" />
                              <b-form-file size="small" class="p-0 d-none" v-model="Logo" plain />
                            </label>
                          </b-button>
                          <b-button :disabled="Logo == null" class="border-left"
                            @click="updateLogo"
                           >
                            <i class="fas fa-arrow-up" />
                          </b-button>
                        </b-button-group>
                        </div>
                      </div>
                      <div class="mx-auto align-self-center">
                          <div style="font-size: 1.8em">{{ current.name }}</div>
                          <div class="mt-2" style="font-size: 1.2em">{{ current.id }}</div>

                      </div>
                    </div>

                  <!-- Details -->
                    <div >
                      <div class="row mb-3">
                        <strong class="col-12 col-sm-6">
                          Name
                        </strong>
                        <span class=" col-12 col-sm-6 text-right"> {{current.name}}</span>
                      </div>
                      <hr />

                      <div class="row mb-3">
                        <strong class="col-12 col-sm-6">
                          Category
                        </strong>
                        <span class="col-12 col-sm-6 text-right"> {{current.industry_category.name}}</span>
                      </div>
                      <hr />

                      <div class="row mb-3">
                        <strong class="col-12 col-sm-6">
                          Type
                        </strong>
                        <span class="col-12 col-sm-6 text-right"> {{current.business_type.name}}</span>
                      </div>
                      <hr />

                      <div class="row mb-3">
                        <strong class="col-12 col-sm-6">
                          Description
                        </strong>
                        <span class=" col-12 col-sm-6 text-right"> {{current.business_type.description}}</span>
                      </div>
                      <hr />

                      <div class="row mb-3">
                        <strong class="col-12 col-sm-6">
                          Email
                        </strong>
                        <span class="col-12 col-sm-6 text-right"> {{current.email}}</span>
                      </div>
                      <hr />

                      <div class="row mb-3">
                        <strong class="col-12 col-sm-6">

                          Staff size

                        </strong>
                        <span class="col-sm-6 col-12 text-right">
                        {{current.staff_size.name && current.staff_size.name}}
                        </span>
                      </div>
                      <hr>

                      <div class="row mb-3">
                        <strong class="col-12 col-sm-6">
                          Country
                        </strong>
                        <span class="col-sm-6 col-12 text-right">
                        {{current.state.country.name && current.state.country.name}}
                        </span>
                      </div>

                      <hr>

                      <div class="row mb-3">
                        <strong class="col-12 col-sm-6">
                          Currency
                        </strong>
                        <span class="col-sm-6 col-12 text-right">
                        {{current.state.country.currency && current.state.country.currency}}
                        </span>
                      </div>

                    </div>
                  </b-card-text>
                </template>
              </b-card>
            </div>
          </b-colxx>
          <b-colxx sm="12" md="5" class="d-flex flex-column align-items-stretch ">
              <!--
              <div class=" w-100  ">
              API CARD
              -->
              <div class="flex-fill p-0 m-0">
                <busines-api-keys />

              </div>
              <!-- API CARD ENDS HERE -->

              <!-- URL CARD -->
              <div class="flex-fill mt-3">

                <business-urls />
              </div>
              <!-- URL ENDS HERE
              </div>
               -->

          </b-colxx>
        </b-row>
      </b-colxx>
      <b-colxx sm="12" md="8">
        <others-listing :others="others" />
      </b-colxx>
    </b-row>

    <b-modal
      id="_modalright"
      ref="_modalright"
      :title="modalTitle"
      modal-class="modal-right"
    >
      <add-business @close="hideModal" v-if="currentForm == 'add_biz'"  />
      <update-business :current="current" @close="hideModal" v-if="currentForm == 'edit_biz'" />

      <template slot="modal-footer">
        <b-button
          variant="outline-secondary"
          @click="hideModal"
        >{{ $t('pages.cancel') }}</b-button>
      </template>
  </b-modal>

  </div>
</template>
<script>// @ts-nocheck
import Axios from 'axios';
import { mapGetters } from 'vuex';


import {API_KEYS, hToken, LUX_ZONE, SIDE_EMPH, statusA } from "../../../../constants/formKey";
import {BUSINESSES } from '../../../../constants/formKey';
import AddBusiness from './../AdderForms/AddBusiness.vue';
import { PROXY } from '../../../../constants/config';
import UpdateBusiness from '../AdderForms/UpdateBusiness.vue';
import BusinesApiKeys from './BusinesApiKeys.vue';
import OthersListing from './OthersListing.vue';
import BusinessUrls from './BusinessUrls.vue';


export default {
  props: ["title"],
  components:{
    AddBusiness,
    UpdateBusiness,
    BusinesApiKeys,
    OthersListing,
    BusinessUrls
  },

  data() {
    return {
      isLoading: true,
      isFetched: false,
      items: [],
      current: null,
      others: [],
      currentForm:'',
      showForm:false,
      modalTitle: "",

      Logo:null,
      SRC:"",

    };
  },
  methods: {
     getBusinesses(){
       if(!this.businesses){
         this.$store.dispatch(BUSINESSES, this.momentBiz || this.currentBiz);
       }else{
         this.processBusinesses(this.businesses);
       }
      this.$store.dispatch(API_KEYS, this.momentBiz || this.currentBiz )
    },

    hideModal() {
      this.$refs["_modalright"].hide();
    },

    showModal(){
      this.$refs["_modalright"].show();
    },

    addBiz(){
      this.modalTitle = "Add New Business";
      this.currentForm ="add_biz"
      this.showModal();
    },

    editBiz(){
      this.modalTitle = "Edit Business";
      this.currentForm = "edit_biz";
      this.showModal();
    },

    logoUploader(val){
      if(!val) return;
      let avaters =  document.getElementById("withLogo");
      this.SRC = URL.createObjectURL(val);
        // this.SRC="https://avatars.githubusercontent.com/u/47877329?s=80&v=4"
        // console.log(val, avaters);
    },

    updateLogo(){
      const formData = new FormData();
      formData.append("logo", this.Logo);
      let val = "Something, went wrong";

      Axios.put(`${PROXY}business/${this.momentBiz}/logo`, formData, hToken())
      .then(res=>{
        if(!res.data.error){
          val = res.data.message
          this.$store.dispatch(BUSINESSES);
          this.$notify("success", "Logo updated", val, {
            duration: 3000,
            permanent: false
          });
        }else{
          this.$notify("error", "Logo update error", val, {
          duration: 3000,
          permanent: false
        });
        }
      })
      .catch(err=>{
        if(err.response){
          val = err.response.data.message;
        }
        this.$notify("error", "Logo update error", val, {
          duration: 3000,
          permanent: false
        });
      })
    },

    processBusinesses(val){
      if(!val) return;
      const cBiz = this.momentBiz || this.currentBiz;
      this.current = val.find(d=>d.id == cBiz);
      this.others = val.filter(d=>d.id != cBiz);
      this.SRC = this.current.logo;
    }

  },
  computed: {
    ...mapGetters(['businesses', 'apiKeys', 'resKey', 'momentBiz', 'currentBiz']),
  },
  watch: {
    Logo(val){
      this.logoUploader(val);
    },

    resKey(val){
      if(this.resKey && this.resKey.owner && this.resKey.owner == BUSINESSES){
        if(this.resKey.status == 1){
          this.isFetched = false;
          this.isLoading = true;
        }else{
          this.isFetched = true;
        }
      }
    },

    momentBiz(val){
      this.processBusinesses( this.businesses);
    },

    businesses(val){
      if(val){
        this.processBusinesses(val);

      }
    }
  },

  created(){
    this.getBusinesses();
    this.$store.commit(SIDE_EMPH, 'business');
    // this.$notify("error", "Login Error", "tets", {
    //       duration: 3000,
    //       permanent: false
    //     });

  }
};
</script>
