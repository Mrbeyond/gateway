<template>
<div v-if="businesses">
    <b-row >
        <b-colxx xxs="12">
            <piaf-breadcrumb :heading="$t('menu.blank-page')" />
            <div class="separator mb-5"></div>
        </b-colxx>
    </b-row>
      <div class="row d-flex">
        <h2 class="text-center mb-4">This is just a placeholder</h2>


      </div>
    <b-row class=" mb-5" >
        <b-colxx sm="12" md="12" lg="7" class="mr-lg-5">
            <b-card class="mb-4">
                <div class="row d-flex justify-content-between " >
                <div class="border-right text-center" >
                 <label class="form-group has-float-label mb-4"  >
                 <b-form-select v-model="balance_type" :options="row_data.business_type" value_field="id" text-field="name" class="selects pr-5"></b-form-select>
                </label>
                <h3 class="text-primary">{{businesses.state.country.currency}} 0.00</h3>
                <p>Available to pay</p>
                </div>

                <div>
                    <div class="mb-4 text-center">
                <p>Total payout today</p>
                <h3 class="text-primary">{{businesses.state.country.currency}} 0.00</h3>
                    </div>
                <div class="text-center">
                <p>Daily payout limit</p>
                <h3>{{businesses.state.country.currency}} 500,000</h3>
                </div>
                </div>
                </div>
                <hr>
                <div class="row d-flex justify-content-between">
                    <div class="border-right pr-4">
                    <p>Payout this week</p>
                    <strong class="text-muted">{{businesses.state.country.currency}} 0.000</strong>
                    </div>
                     <div class="border-right pr-4">
                    <p>Payout this month</p>
                    <strong class="text-muted">{{businesses.state.country.currency}} 0.000</strong>
                    </div>
                    <div>
                    <p>Life time payout</p>
                    <strong class="text-muted">{{businesses.state.country.currency}} 0.000</strong>
                    </div>

                </div>
            </b-card>
        </b-colxx>
        <b-colxx sm="12" md="6" lg="4">
            <b-card class="mb-4" :title="'Balance ' + 'in ' + businesses.state.country.currency">
                <div class="text-center">
                <strong>Add settlement method</strong>
                <p class="text-muted">Add your bank or crypto wallet to receive payouts.</p>
                </div>
                <hr>
                <div class="row justify-content-center">
                <b-btn>Add settlement</b-btn>
                </div>

            </b-card>
        </b-colxx>

    </b-row>
    <b-row >
          <b-colxx class="col-12">
               <b-card class="mb-4 row justify-content-center m-4">
                   <div class=" col-4 bg-primary align-self-center">
                   <strong>No payouts yet.</strong>
                   <p class="text-muted">You have not received any payout on this account. Payouts history will appear here.</p>
                   </div>
            </b-card>
        </b-colxx>
    </b-row>
</div>
</template>
<script>
import Vuetable from "vuetable-2/src/components/Vuetable.vue";
// import VuetablePaginationBootstrap from "../../../../components/Common/VuetablePaginationBootstrap.vue";
import { LUX_ZONE,statusA,GETPAYOUTS } from '../../../../constants/formKey';
export default {
     components: {
    vuetable: Vuetable,
    // "vuetable-pagination-bootstrap": VuetablePaginationBootstrap,
    // "datatable-heading": DatatableHeading
  },
    data () {
        return{
            balance_type:null,
             row_data:{
           business_type:[{id: null, name: 'BALANCE IN NGN'},{id:2,name:"BALANCE IN BTC"},{id:3,name:"BALANCE IN ETH"}],
      },
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
    methods: {
      Payouts(id){
          console.log(id);
          this.$store.dispatch(GETPAYOUTS,id)
      }
    },
  computed: {
       pays(){
        return this.$store.getters.momentBiz
      },
      businesses(){
         return this.$store.getters.businessDetails;
  },
  },
  watch: {
    pays(val){
        this.Payouts(val)
    }
},
}
</script>
<style scoped>
.selects{
    font-size: 20px;
    padding: 5px;
    box-shadow: none;
    text-decoration: none;
    border: none;
    
}
.sett{
    font-size: 20px;
    padding: 2px;
    box-shadow: none;
    text-decoration: none;
    
}
</style>
