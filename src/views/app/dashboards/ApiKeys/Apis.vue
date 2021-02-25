<template>
<div v-if="api">
      <b-row class=" mb-5" >
        <b-colxx sm="12" md="12" lg="12" class="mb-5" >
                <h2>API keys</h2>
                <b-card>
                <b-table responsive :items="api.api_keys" :fields="fields"/>

                </b-card>

        </b-colxx>
        <b-colxx sm="12" md="12" lg="12">
                <h2>Notification urls</h2>
                <b-card>
                <b-table responsive :items="api.notification_urls" :fields="fieldss"/>
                </b-card>


        </b-colxx>
    </b-row>
</div>
</template>
<script>
import Vuetable from "vuetable-2/src/components/Vuetable.vue";
// import VuetablePaginationBootstrap from "../../../../components/Common/VuetablePaginationBootstrap.vue";
import { LUX_ZONE,statusA,API_KEYS } from '../../../../constants/formKey';
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
                key: 'domain',
                label:"Domain",
                sortable: true
            },
            {
                key: 'key',
                labels:"Key",
                sortable: true
            },
            {
                key: 'type',
                label: 'Type',
                sortable: true,
                // Variant applies to the whole column, including the header and footer
                // variant: 'danger'
            },
             {
                key: 'status',
                label: 'Status',
                sortable: true,
                // Variant applies to the whole column, including the header and footer
                // variant: 'danger'
            },
            {
                key: 'createdAt',
                label: 'Created on',
                 sortable: true,
          }
    ],


      fieldss: [
            {
                key: 'domain',
                label:"Domain",
                sortable: true
            },
            {
                key: 'secret',
                labels:"Key",
                sortable: true
            },
            {
                key: 'type',
                label: 'Type',
                sortable: true,
                // Variant applies to the whole column, including the header and footer
                // variant: 'danger'
            },
             {
                key: 'status',
                label: 'Status',
                sortable: true,
                // Variant applies to the whole column, including the header and footer
                // variant: 'danger'
            },
            {
                key: 'createdAt',
                label: 'Created on',
                 sortable: true,
          }
    ],
        }
    },
     methods: {
      GetApis(id){
          console.log(id);
          this.$store.dispatch(API_KEYS,id)
      },
      statusT(st){
            if (st == 1 || st == true) {
              return "Active"
            }
            else{
                return "Inactive"
            }

        },
    },
  computed: {
       apis(){
        return this.$store.getters.momentBiz
      },
      api(){
         return this.$store.getters.getapis;
  },
  },
  watch: {
    apis(val){
        this.GetApis(val)
    }
},
//   created() {
//       this.GetApis(this.$router.currentRoute.params.id)

//   }
}
</script>
<style scoped>

</style>
