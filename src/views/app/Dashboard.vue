<template>
<div>
    <b-row>
        <b-colxx xxs="12">
            <piaf-breadcrumb :heading="$t('menu.blank-page')" />
            <div class="separator mb-5"></div>
        </b-colxx>
    </b-row>
    <b-row class="justify-content-center mb-5">
        <b-colxx sm="12" md="6" lg="7" class="mr-lg-5">
            <b-card class="mb-4" title="Profile">
          <div class="row mb-3">
            <strong class="col-lg-6 col-md-6 col-sm-6 col-12 ">First name</strong>  <span class=" col-sm-6 col-lg-6 col-md-6 col-12  text-lg-right text-md-right"> {{businesses.firstname}}</span>
                </div>
                <hr>
             <div class="row mb-3">
            <strong class="col-lg-6 col-md-6 col-12 ">Last name</strong>  <span class="col-lg-6 col-md-6 col-12  text-lg-right text-md-right"> {{businesses.lastname}}</span>
             </div>
                <hr>

               <div class="row mb-3">
            <strong class="col-lg-6 col-md-6 col-12 ">Phone</strong>  <span class="col-lg-6 col-md-6 col-12  text-lg-right text-md-right"> {{businesses.phone}}</span>
             </div>
                <hr>

                <div class="row mb-3">
            <strong class="col-lg-6 col-md-6 col-12 ">Email</strong>  <span class="col-lg-6 col-md-6 col-12  text-lg-right text-md-right"> {{businesses.email}}</span>
             </div>
                 <!-- <div class="row mb-3">
            <strong class="col-lg-6 col-md-6 col-12 ">Status</strong>  <span class="col-lg-6 col-md-6 col-12  text-lg-right text-md-right"> {{ 
                callback(businesses.status) 
               
                }}</span>
             </div> -->

            </b-card>
        </b-colxx>
        <b-colxx sm="12" md="6" lg="4">
            <b-card class="mb-4" title="Account">
                <div>
            <strong>First name</strong>  <span class="float-right"> {{businesses.firstname}}</span>
                </div>
             <div>
            <strong>Last name</strong>  <span class="float-right"> {{businesses.lastname}}</span>
             </div>
               <div>
            <strong>Phone</strong>  <span class="float-right"> {{businesses.phone}}</span>
             </div>
        
            </b-card>
        </b-colxx>
        
    </b-row>
    <b-row class="justify-content-center">
          <b-colxx sm="12" md="12" lg="7" class="mr-lg-5">
        <!-- <b-card class="row"> -->
             <h2 class="text-center mb-5">BUSINESS</h2>
        <vuetable
          ref="vuetable"
          class="table-divided order-with-arrow"
          :api-mode="false"
           :http-options="head"
          :data="businesses.businesses"
          :reactive-api-url="false"
          :fields="fields"
          pagination-path
        >
        </vuetable>
        <!-- </b-card> -->
        </b-colxx>
         
         <b-colxx sm="12" md="6" lg="4">
            <b-card class="mb-4" title="Activity logs">
                <div>
            <strong>First name</strong>  <span class="float-right"> {{businesses.firstname}}</span>
                </div>
             <div>
            <strong>Last name</strong>  <span class="float-right"> {{businesses.lastname}}</span>
             </div>
               <div>
            <strong>Phone</strong>  <span class="float-right"> {{businesses.phone}}</span>
             </div>
        

            </b-card>
        </b-colxx>
    </b-row>
</div>
</template>
<script>
import Vuetable from "vuetable-2/src/components/Vuetable.vue";
// import VuetablePaginationBootstrap from "../../../../components/Common/VuetablePaginationBootstrap.vue";
import { LUX_ZONE,hToken,statusA } from '../../constants/formKey';
export default {
     components: {
    vuetable: Vuetable,
    // "vuetable-pagination-bootstrap": VuetablePaginationBootstrap,
    // "datatable-heading": DatatableHeading
  },
    data () {
        return{
              head: {headers: hToken()},
             fields: [
        {
        name: "name",
        sortField: "name",
        title: "Name",
        titleClass: "",
        dataClass: "list-item-heading",
        width: "10%",
        },
          {
        name: "city",
        sortField: "",
        title: "City",
        titleClass: "",
        dataClass: "list-item-heading",
        width: "10%",
        },
         {
        name: "address",
        sortField: "address",
        title: "Address",
        titleClass: "",
        dataClass: "list-item-heading",
        width: "10%",
        },

        {
          name: "status",
          sortField: "status",
          title: "Status",
          titleClass: "",
          dataClass: "",
          width: "10%",
          callback(val){
            return statusA[Number(Boolean(!!Boolean(val)))];
          },
        },
        //   {
        //   name: "contact_person_phone",
        //   sortField: "contact phone",
        //   title: "Contact number",
        //   titleClass: "",
        //   dataClass: "",
        //   width: "10%"
        // },
        // {
        //   name: "__slot:garages",
        //   sortField: "garages",
        //   title: "Garages",
        //   titleClass: "",
        //   dataClass: "",
        //   width: "10%"
        // },
      ]

        }
    },
  computed: {
    businesses(){
        console.log(this.$store.getters.user);
    return this.$store.getters.user;
  },

    // resKey(){
    //   return this.$store.getters.user;
    // }
  },
}
</script>
<style scoped>

</style>