<template>
  <div v-if="businesses">
    <div class=" container d-flex">
      <h2 class="text-center mb-4">This is just a placeholder</h2>
    </div>
    <b-row class=" mb-5" >
      <b-colxx sm="12" md="6" lg="7" class="mr-lg-5">
        <h2>Business </h2>
        <b-card class="mb-4">
          <div class="row d-flex justify-content-between mb-3">
              <small class="float-right">{{businesses.state.country_code}}</small>
          </div>
          <div class="row mb-3">
            <strong class="col-12 col-sm-6">
              Name
            </strong>
            <span class=" col-12 col-sm-6 text-right"> {{businesses.name}}</span>
          </div>
          <hr>
          <div class="row mb-3">
            <strong class="col-12 col-sm-6">
              City
            </strong>
            <span class="col-12 col-sm-6 text-right"> {{businesses.city}}</span>
          </div>
          <hr>

          <div class="row mb-3">
            <strong class="col-12 col-sm-6">
              Address
            </strong>
            <span class=" col-12 col-sm-6 text-right"> {{businesses.address}}</span>
          </div>
          <hr>
          <div class="row mb-3">
            <strong class="col-12 col-sm-6">

              Contact

            </strong>
            <span class="col-sm-6 col-12 text-right">
             {{businesses.phone}}
            </span>
          </div>
          <hr>

          <div class="row mb-3">
            <strong class="col-12 col-sm-6">
              Email
            </strong>
            <span class="col-12 col-sm-6 text-right"> {{businesses.email}}</span>
          </div>

        </b-card>
      </b-colxx>
      <b-colxx sm="12" md="6" lg="4">
        <h2>Type</h2>
        <b-card class="mb-4">
          <div>
            <strong>Name</strong>
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
        <h2>Industry</h2>
        <b-card class="mb-4">
          <div class="row d-flex justify-content-between mb-3">
            <small class="float-right">{{businesses.state.country_code}}</small>
          </div>
          <div class="row mb-3">
            <strong class="col-12 col-sm-6">
              category
            </strong>
            <span class=" col-12 col-sm-6 text-right"> {{businesses.industry_category.name}}</span>
          </div>
          <hr>
          <div class="row mb-3">
            <strong class="col-12 col-sm-6">
              Name
            </strong>
            <span class="col-12 col-sm-6 text-right"> {{businesses.industry_category.industry.name}}</span>
          </div>
          <hr>

          <div class="row mb-3">
            <strong class="col-12 col-sm-6">
              description
            </strong>
            <span class="col-12 col-sm-6 text-right"> {{businesses.industry_category.industry.description}}</span>
          </div>
          <hr>
          <div class="row mb-3">
            <strong class="col-12 col-sm-6">
              Status
            </strong>
            <span class="col-sm-6col-lg-6 col-md-6 col-12 text-right"> {{statusT(businesses.industry_category.industry.status)}}</span>
          </div>
            <hr>

          <div class="row mb-3">
            <strong class="col-12 col-sm-6">
              Staff size
            </strong>
            <span class="col-12 col-sm-6 text-right">
             {{businesses.staff_size.name}}
            </span>
          </div>

        </b-card>
      </b-colxx>
      <b-colxx sm="12" md="6" lg="6">
        <h2>Adress</h2>
        <b-card class="mb-4">
          <div class="row d-flex justify-content-between mb-3">
          </div>
          <div class="row mb-3">
            <strong class="col-12 col-sm-6">
              State
            </strong>
            <span class=" col-12 col-sm-6 text-right"> {{businesses.state.name}}</span>
          </div>
          <hr>
          <div class="row mb-3">
            <strong class="col-12 col-sm-6">
              Country
            </strong>
            <span class="col-sm-6col-lg-6 col-md-6 col-12 text-right"> {{businesses.state.country.name}}</span>
          </div>
          <hr>
          <div class="row mb-3">
            <strong class="col-12 col-sm-6">
              Currency
            </strong>
            <span class="col-12 col-sm-6 text-right"> {{businesses.state.country.currency}}</span>
          </div>

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
