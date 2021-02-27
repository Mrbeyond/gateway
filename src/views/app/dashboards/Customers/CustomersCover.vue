<template>
  <div>
    <div v-if="isLoading && !isFetched" class="row justify-content-center">
        <div> <b-spinner variant="primary" /></div>
    </div>
    <div v-else-if="!isLoading && !isFetched">
        Went wrong slot
    </div>
    <b-row v-else>
      <b-colxx xxs="12">
        <b-card class="mb-4" title="BUSINESS">
                <b-table responsive :items="customers" :fields="fields"/>
            </b-card>
      </b-colxx>
    </b-row>
  </div>
</template>
<script>

import { mapGetters } from 'vuex';
import { SIDE_EMPH, CUSTOMERS } from "../../../../constants/formKey";


export default {
  props: ["title"],
  components: {
  },
  data() {
    return {
      isLoading: true,
      isFetched: false,

     datas:[{"id":1,"state_id":1,"is_imported":1,"name":"0 - 5 years - NGN30,000 one time fee","amount":30000,"status":1,"createdAt":null,"updatedAt":null,"account_vehicles":[{"id":11,"vehicle_type_id":1,"plate_number":"11","vehicle_identification_number":null,"vehicle_color":"red","vehicle_brand":"Toyota","vehicle_year":"2002","vehicle_model":"Corolla","status":1,"createdAt":"2021-01-28T09:49:08.000Z","updatedAt":"2021-01-28T09:49:08.000Z","is_imported":false},{"id":271,"vehicle_type_id":1,"plate_number":null,"vehicle_identification_number":"44444","vehicle_color":"Red","vehicle_brand":"Toyota","vehicle_year":"2020","vehicle_model":"camry","status":1,"createdAt":"2021-02-03T22:37:12.000Z","updatedAt":"2021-02-03T22:37:12.000Z","is_imported":true}]},{"id":11,"state_id":1,"is_imported":1,"name":"5 - 10 years - NGN20,000 one time fee","amount":20000,"status":1,"createdAt":null,"updatedAt":null,"account_vehicles":[{"id":41,"vehicle_type_id":11,"plate_number":null,"vehicle_identification_number":"11","vehicle_color":"red","vehicle_brand":"Toyota","vehicle_year":"2002","vehicle_model":"Corolla","status":1,"createdAt":"2021-01-28T15:25:36.000Z","updatedAt":"2021-01-28T15:25:36.000Z","is_imported":true},{"id":61,"vehicle_type_id":11,"plate_number":null,"vehicle_identification_number":"111","vehicle_color":"red","vehicle_brand":"Toyota","vehicle_year":"2002","vehicle_model":"Corolla","status":1,"createdAt":"2021-01-29T18:35:55.000Z","updatedAt":"2021-01-29T18:35:55.000Z","is_imported":true},{"id":71,"vehicle_type_id":11,"plate_number":null,"vehicle_identification_number":"1111","vehicle_color":"red","vehicle_brand":"Toyota","vehicle_year":"2002","vehicle_model":"Corolla","status":1,"createdAt":"2021-01-29T18:37:19.000Z","updatedAt":"2021-01-29T18:37:19.000Z","is_imported":true},{"id":81,"vehicle_type_id":11,"plate_number":null,"vehicle_identification_number":"11111","vehicle_color":"red","vehicle_brand":"Toyota","vehicle_year":"2002","vehicle_model":"Corolla","status":1,"createdAt":"2021-01-29T18:39:53.000Z","updatedAt":"2021-01-29T18:39:53.000Z","is_imported":true},{"id":111,"vehicle_type_id":11,"plate_number":null,"vehicle_identification_number":"111111","vehicle_color":"red","vehicle_brand":"Toyota","vehicle_year":"2002","vehicle_model":"Corolla","status":1,"createdAt":"2021-01-29T18:52:48.000Z","updatedAt":"2021-01-29T18:52:48.000Z","is_imported":true},{"id":261,"vehicle_type_id":11,"plate_number":null,"vehicle_identification_number":"213","vehicle_color":"Red","vehicle_brand":"Toyota","vehicle_year":"2020","vehicle_model":"Camry","status":1,"createdAt":"2021-02-03T18:21:20.000Z","updatedAt":"2021-02-03T18:21:20.000Z","is_imported":true}]},{"id":61,"state_id":1,"is_imported":0,"name":"Buses - NGN300 daily fee","amount":300,"status":null,"createdAt":null,"updatedAt":null,"account_vehicles":[{"id":281,"vehicle_type_id":61,"plate_number":"KFT","vehicle_identification_number":"ffff","vehicle_color":"Yellow","vehicle_brand":"Toyota","vehicle_year":"2002","vehicle_model":"Corolla","status":1,"createdAt":"2021-02-05T20:28:27.000Z","updatedAt":"2021-02-05T20:28:27.000Z","is_imported":false}]},{"id":21,"state_id":1,"is_imported":1,"name":"10 years above - NGN10,000 one time fee","amount":10000,"status":1,"createdAt":null,"updatedAt":null,"account_vehicles":[]},{"id":41,"state_id":1,"is_imported":0,"name":"Tricycle/Mini Vans - NGN100 daily fee","amount":100,"status":1,"createdAt":null,"updatedAt":null,"account_vehicles":[]},{"id":51,"state_id":1,"is_imported":0,"name":"Cars - NGN200 daily fee","amount":200,"status":1,"createdAt":null,"updatedAt":null,"account_vehicles":[]}],

      fields: [
        {
        key: "customer_firstname",
        label: "First name",
        sortable: true
        },
         {
        key: "customer_lastname",
        label: "Last name",
        sortable: true
        },
         {
        key: "customer_email",
        label: "Email",
        sortable: true
        },
          {
        key: "customer_phone",
        label: "Phone",
        sortable: true
        },
        {
          key: "business_invoices",
           label: "Invoices",
          formatter(val){
            return val.length
          },
        sortable: true

        }

      ]
    };
  },
  methods: {

     GetCustomers(id){
      this.$store.dispatch(CUSTOMERS,id);
    },
//     modalinfo(garages){
//     this.RightmodalData = garages
//    console.log( this.RightmodalData)
//     },
      hideModal (refname) {
      this.$refs[refname].hide()
      console.log('hide modal:: ' + refname)

      if (refname === 'modalnestedinline') {
        this.$refs['modalnested'].show()
      }
    },

  },
  computed: {
    ...mapGetters(['momentBiz', 'customers', 'resKey']),
  },
 watch: {
   resKey(val){
      if(val && val.owner && val.owner == CUSTOMERS){
        if(val.status == 1){
          this.isFetched = false;
          this.isLoading = true;
        }else if(val.status == 3){
          this.isFetched = false;
          this.isLoading = false;
        }else if(val.status == 2){
          this.isFetched = true;
          this.isLoading = false;
        }
      }
    },
    momentBiz(val){
      this.GetCustomers(val)
    }
  },
  created() {
     this.GetCustomers(this.momentBiz);
    this.$store.commit(SIDE_EMPH, 'customers');
  },
};
</script>
