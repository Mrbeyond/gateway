<template>
  <div>
    <div v-if="isLoading && !isFetched" class="row justify-content-center">
        <div> <b-spinner variant="primary" /></div>
    </div>
    <div v-else-if="!isLoading && !isFetched">
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
                      <b-button  size="sm" class="py-1">Edit</b-button>
                    </div>
                  </div>
                </template>
                <!-- Card Body -->
                <template >
                  <b-card-text v-if="current" class="mt-0">

                    <div class="mb-3 d-flex">
                      <div class="d-inline-block">
                        <b-avatar v-if="current.logo"
                          :src="current.logo"
                          size="6rem"
                        >
                        </b-avatar>
                        <b-avatar v-else size="6rem" :text="current.name.charAt(0)"></b-avatar>
                        
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
          <b-colxx sm="12" md="5" class="d-flex">
            <div class="flex-fill ">
              <!-- API CARD -->
              <div>

                  here2
                <b-card header-tag="header">
                  <template #header>
                    <div  class="d-flex justify-content-between">
                      <h6 class="mb-0">API Keys</h6>
                      <div>
                        <b-button  size="sm" class="py-1">Generate</b-button>
                      </div>
                    </div>
                  </template>
                </b-card>
              </div>
              <!-- API CARD ENDS HERE -->

              <!-- URL CARD -->
              <div>

                <b-card header-tag="header">
                  <template #header>
                    <div  class="d-flex justify-content-between">
                      <h6 class="mb-0">Notification URL</h6>
                      <div>
                        <b-button  size="sm" class="py-1">Add</b-button>
                      </div>
                    </div>
                  </template>
                </b-card>
              </div>
              <!-- URL ENDS HERE -->

            </div>
          </b-colxx>
        </b-row>
      </b-colxx>
      <b-colxx sm="12" md="8">
        <b-card class="mb-4" title="BUSINESS">
          <b-table responsive :items="others" :fields="fields">
            <template #cell(actions)="row">
              <router-link :to="`/dashbord/business/${row.item.id}`">
                <b-button size="sm" class="mr-1 bg-primary">
                  View
                </b-button>
              </router-link>
            </template>
          </b-table>
        </b-card>
      </b-colxx>
    </b-row>

    <b-modal
      id="_modalright"
      ref="_modalright"
      :title="modalTitle"
      modal-class="modal-right"
    >
      <add-business v-if="currentForm == 'add_biz'"  />

      <template slot="modal-footer">
        <b-button
          variant="outline-secondary"
          @click="hideModal('_modalright')"
        >{{ $t('pages.cancel') }}</b-button>
      </template>
  </b-modal>

  </div>
</template>
<script>// @ts-nocheck
import { mapGetters } from 'vuex';


import {LUX_ZONE, SIDE_EMPH, statusA } from "../../../../constants/formKey";
import {BUSINESSES } from '../../../../constants/formKey';
import AddBusiness from './../AdderForms/AddBusiness.vue';


export default {
  props: ["title"],
  components:{
    AddBusiness,
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

      fields: [
        {
          key: 'name',
          label:"Name",
          sortable: true
        },
        {
          key: 'city',
          labels:"City",
          sortable: true
        },
        {
          key: 'address',
          label: 'Adress',
          sortable: true,
        },
        {
          key: 'phone',
          label: 'Phone',
          sortable: true,
        },
        {
          key: 'actions',
          label: 'Actions'
        }
      ],
    };
  },
  methods: {
     getBusinesses(){
      this.$store.dispatch(BUSINESSES);
    },

    hideModal(refname) {
      this.$refs[refname].hide();
    },

    showModal(){
      this.$refs["_modalright"].show();
    },

    addBiz(){
      this.modalTitle = "Add New Business";
      this.currentForm ="add_biz"
      this.showModal();
    },

  },
  computed: {
    ...mapGetters(['businesses', 'resKey', 'momentBiz', 'currentBiz']),
  },
  watch: {
     resKey(){
      if(this.resKey && this.resKey.owner && this.resKey.owner == BUSINESSES){
        if(this.resKey.status == 1){
          this.isFetched = false;
          this.isLoading = true;
        }else{
          this.isFetched = true;
        }
      }
    },

    businesses(val){
      if(val){
        const cBiz = this.momentZiz || this.currentBiz;
        this.current = val.find(d=>d.id == cBiz);
        this.others = val.filter(d=>d.id != cBiz);
        console.log(this.current);

      }
    }
  },

  created(){
    if(!this.businesses){
      this.getBusinesses();
    }
    this.$store.commit(SIDE_EMPH, 'business');
    // this.$notify("error", "Login Error", "tets", {
    //       duration: 3000,
    //       permanent: false
    //     });

  }
};
</script>
