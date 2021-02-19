<template>
<div v-if="businesses">
    <b-row>
        <b-colxx xxs="12">
            <piaf-breadcrumb :heading="$t('menu.blank-page')" />
            <div class="separator mb-5"></div>
        </b-colxx>
    </b-row>
      <div class="row d-flex">
        <h2 class="text-center mb-4">This is just a placeholder</h2>


      </div>
    <b-row class=" mb-5" >
        <b-colxx sm="12" md="6" lg="7" class="mr-lg-5">
            <b-card class="mb-4">
                <div class="row d-flex justify-content-between mb-3">
                <h2>Business </h2>
                 <small class="float-right">{{businesses.state.country_code}}</small>
                </div>
          <div class="row mb-3">
            <strong class="col-lg-6 col-md-6 col-sm-6 col-12 ">Name</strong>  <span class=" col-sm-6 col-lg-6 col-md-6 col-12 text-sm-right  text-lg-right text-md-right"> {{businesses.name}}</span>
                </div>
                <hr>
             <div class="row mb-3">
            <strong class="col-lg-6 col-md-6 col-sm-6 col-12 ">City</strong>  <span class="col-sm-6 col-lg-6 col-md-6 col-12 text-sm-right  text-lg-right text-md-right"> {{businesses.city}}</span>
             </div>
                <hr>

               <div class="row mb-3">
            <strong class="col-lg-6 col-md-6 col-sm-6 col-12 ">Address</strong>  <span class="col-sm-6 col-lg-6 col-md-6 col-12 text-sm-right  text-lg-right text-md-right"> {{businesses.address}}</span>
             </div>
                <hr>
                  <div class="row mb-3">
            <strong class="col-lg-6 col-md-6 col-sm-6 col-12 ">Contact</strong>  <span class="col-sm-6col-lg-6 col-md-6 col-12 text-sm-right  text-lg-right text-md-right"> {{businesses.phone}}</span>
             </div>
                <hr>

                <div class="row mb-3">
            <strong class="col-lg-6 col-md-6 col-sm-6 col-12 ">Email</strong>  <span class="col-sm-6 col-lg-6 col-md-6 col-12 text-sm-right  text-lg-right text-md-right"> {{businesses.email}}</span>
             </div>
                 <!-- <div class="row mb-3">
            <strong class="col-lg-6 col-md-6 col-12 ">Status</strong>  <span class="col-lg-6 col-md-6 col-12  text-lg-right text-md-right"> {{
                callback(businesses.status)

                }}</span>
             </div> -->

            </b-card>
        </b-colxx>
        <b-colxx sm="12" md="6" lg="4">
            <b-card class="mb-4" title="Business type">
                <div>
                <strong>Type name</strong>
                <p class="text-muted">{{businesses.business_type.name}}</p>
                </div>
                <hr>
                <div>
                <strong>description</strong>
                <p class="text-muted">{{businesses.business_type.description}}</p>
                </div>

            </b-card>
        </b-colxx>
    </b-row>
      <b-row class=" mb-5" >
        <b-colxx sm="12" md="6" lg="6">
            <b-card class="mb-4">
                <div class="row d-flex justify-content-between mb-3">
                <h2>Industry</h2>
                 <small class="float-right">{{businesses.state.country_code}}</small>
                </div>
          <div class="row mb-3">
            <strong class="col-lg-6 col-md-6 col-sm-6 col-12 ">category</strong>  <span class=" col-sm-6 col-lg-6 col-md-6 col-12 text-sm-right  text-lg-right text-md-right"> {{businesses.industry_category.name}}</span>
                </div>
                <hr>
             <div class="row mb-3">
            <strong class="col-lg-6 col-md-6 col-sm-6 col-12 ">Name</strong>  <span class="col-sm-6 col-lg-6 col-md-6 col-12 text-sm-right  text-lg-right text-md-right"> {{businesses.industry_category.industry.name}}</span>
             </div>
                <hr>

               <div class="row mb-3">
            <strong class="col-lg-6 col-md-6 col-sm-6 col-12 ">description</strong>  <span class="col-sm-6 col-lg-6 col-md-6 col-12 text-sm-right  text-lg-right text-md-right"> {{businesses.industry_category.industry.description}}</span>
             </div>
                <hr>
                  <div class="row mb-3">
            <strong class="col-lg-6 col-md-6 col-sm-6 col-12 ">Status</strong>  <span class="col-sm-6col-lg-6 col-md-6 col-12 text-sm-right  text-lg-right text-md-right"> {{statusT(businesses.industry_category.industry.status)}}</span>
             </div>
                <hr>

                <div class="row mb-3">
            <strong class="col-lg-6 col-md-6 col-sm-6 col-12 ">Staff size</strong>  <span class="col-sm-6 col-lg-6 col-md-6 col-12 text-sm-right  text-lg-right text-md-right"> {{businesses.staff_size.name}}</span>
             </div>
                 <!-- <div class="row mb-3">
            <strong class="col-lg-6 col-md-6 col-12 ">Status</strong>  <span class="col-lg-6 col-md-6 col-12  text-lg-right text-md-right"> {{
                callback(businesses.status)

                }}</span>
             </div> -->

            </b-card>
        </b-colxx>
        <b-colxx sm="12" md="6" lg="6">
           <b-card class="mb-4">
                <div class="row d-flex justify-content-between mb-3">
                <h2>Adress</h2>
                 <small class="float-right">{{businesses.state.country_code}}</small>
                </div>
          <div class="row mb-3">
            <strong class="col-lg-6 col-md-6 col-sm-6 col-12 ">State</strong>  <span class=" col-sm-6 col-lg-6 col-md-6 col-12 text-sm-right  text-lg-right text-md-right"> {{businesses.state.name}}</span>
                </div>
                <hr>
               <div class="row mb-3">
            <strong class="col-lg-6 col-md-6 col-sm-6 col-12 ">State code</strong>  <span class="col-sm-6 col-lg-6 col-md-6 col-12 text-sm-right  text-lg-right text-md-right"> {{businesses.state.state_code}}</span>
             </div>
                <hr>
                  <div class="row mb-3">
            <strong class="col-lg-6 col-md-6 col-sm-6 col-12 ">Country</strong>  <span class="col-sm-6col-lg-6 col-md-6 col-12 text-sm-right  text-lg-right text-md-right"> {{businesses.state.country.name}}</span>
             </div>
                <hr>
                 <div class="row mb-3">
            <strong class="col-lg-6 col-md-6 col-sm-6 col-12 ">Country code</strong>  <span class="col-sm-6 col-lg-6 col-md-6 col-12 text-sm-right  text-lg-right text-md-right"> {{businesses.state.country_code}}</span>
             </div>
                <hr>

                <div class="row mb-3">
            <strong class="col-lg-6 col-md-6 col-sm-6 col-12 ">Currency</strong>  <span class="col-sm-6 col-lg-6 col-md-6 col-12 text-sm-right  text-lg-right text-md-right"> {{businesses.state.country.currency}}</span>
             </div>
                 <!-- <div class="row mb-3">
            <strong class="col-lg-6 col-md-6 col-12 ">Status</strong>  <span class="col-lg-6 col-md-6 col-12  text-lg-right text-md-right"> {{
                callback(businesses.status)

                }}</span>
             </div> -->

            </b-card>
        </b-colxx>
    </b-row>
</div>
</template>
<script>
import Vuetable from "vuetable-2/src/components/Vuetable.vue";
// import VuetablePaginationBootstrap from "../../../../components/Common/VuetablePaginationBootstrap.vue";
import { LUX_ZONE,statusA,BUSINESSDETAILS } from '../../../../constants/formKey';
export default {
     components: {
    vuetable: Vuetable,
    // "vuetable-pagination-bootstrap": VuetablePaginationBootstrap,
    // "datatable-heading": DatatableHeading
  },
    data () {
        return{
              // head: {headers: hToken()},
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
                        // Variant applies to the whole column, including the header and footer
                        // variant: 'danger'
                    }
            ],

        }
    },
    methods:{
        statusT(st){
            if (st == 1 || st == true) {
              return "Active"
            }
            else{
                return "Inactive"
            }

        },
   GetDetails(id){
       this.$store.dispatch(BUSINESSDETAILS, id)
   }
    },
  computed: {
    businesses(){
    return this.$store.getters.businessDetails;
  },

// watch: {

// }
    // resKey(){
    //   return this.$store.getters.user;
    // }
  },
  created() {
      this.GetDetails(this.$router.currentRoute.params.id)
     
  }
}
</script>
<style scoped>

</style>
