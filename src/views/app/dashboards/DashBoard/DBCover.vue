<template>
<div v-if="businesses">
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
            <b-card class="mb-4" :title="'Balance ' + 'in ' + businesses.state.country.currency">
                <div>
                <h3>{{businesses.state.country.currency}} 0.00</h3>
                <p>Available to pay</p>
                </div>
                <hr>
                <div>
                <p>Payouts</p>
                <h3>{{businesses.state.country.currency}} 0.00</h3>
                </div>

            </b-card>
        </b-colxx>

    </b-row>
    <b-row >
          <b-colxx sm="12" md="12" lg="7" class="mr-lg-5">
              <div class="row d-flex justify-content-between mr-2 ml-2">
                  <h3>Last payout</h3>
                  <strong class="text-primary">View all</strong>
              </div>
               <b-card class="mb-4 ">
                   <p class="justify-content-center">No payout yet.</p>
                <!-- <div>
            <strong>First name</strong>  <span class="float-right"> {{businesses.firstname}}</span>
                </div>
             <div>
            <strong>Last name</strong>  <span class="float-right"> {{businesses.lastname}}</span>
             </div>
               <div>
            <strong>Phone</strong>  <span class="float-right"> {{businesses.phone}}</span>
             </div> -->


            </b-card>
              <!-- <b-card class="mb-4" title="BUSINESS">
                <b-table responsive :items="businesses.businesses" :fields="fields"/>
            </b-card> -->

        </b-colxx>

         <b-colxx sm="12" md="6" lg="4">
                <div class="row d-flex justify-content-between mr-2 ml-2">
                  <h3>Activity logs</h3>
              </div>
            <b-card class="mb-4">
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
     <b-row>
          <b-colxx sm="12" md="12" lg="7">
              <div class="row d-flex justify-content-between mr-2 ml-2">
                  <h3>Recent Transactions</h3>
                 <strong class="text-primary">View all</strong>
              </div>
               <b-card class="mb-4 ">
                   <p class="justify-content-center">No transactions yet.</p>
            </b-card>

        </b-colxx>

    </b-row>
</div>
</template>
<script>
import Vuetable from "vuetable-2/src/components/Vuetable.vue";
// import VuetablePaginationBootstrap from "../../../../components/Common/VuetablePaginationBootstrap.vue";
import { LUX_ZONE,SIDE_EMPH,statusA } from '../../../../constants/formKey';
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
  computed: {
    businesses(){
      return this.$store.getters.businessDetails;
    },
  },

  created(){
    this.$store.commit(SIDE_EMPH, 'dashboard');
  },

  // beforeDestroy(){
  //   this.$store.commit(SIDE_EMPH, '');
  // }

}
</script>
<style scoped>

</style>
