<template>
<div>
    <b-row>
        <b-colxx xxs="12">
            <piaf-breadcrumb :heading="$t('menu.blank-page')" />
            <div class="separator mb-5"></div>
        </b-colxx>
    </b-row>
    <b-row>
        <b-colxx sm="12" md="6" lg="6">
            <b-card class="mb-4" title="Your profile">
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
         <b-colxx sm="12" md="6" lg="6">
            <b-card class="mb-4" title="Your profile">
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
     <div>
    <!-- <div v-if="isLoading && !isFetched" class="row justify-content-center">
        <div> <b-spinner variant="primary" /></div>
    </div> -->
    <!-- <div v-else-if="!isLoading && !isFetched">
        Went wrong slot
    </div> -->
    <b-row>
      <b-colxx xxs="12" class="mt-4">
        <h2 class="text-center mb-5">BUSINESSES</h2>

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
          <!-- <template  slot="garages" slot-scope="props" >
            <div v-if="props">
            <router-link :to="`/dashboard/garages/${props.rowData.id}`" v-if="props.rowData.garages.length>=1">
            <b-btn  title="View Vehicles" badge-variant="dark" v-if="props"  v-b-modal.modalbasic
            >
              View <b-badge variant="primary" rounded-conner>{{props.rowData.garages.length}}</b-badge>
            </b-btn>
            </router-link>
            <b-btn v-else :disabled="props.rowData.garages.length==0"  title="View Vehicles" badge-variant="dark"  v-b-modal.modalbasic
            >
              View <b-badge variant="primary" rounded-conner>{{props.rowData.garages.length}}</b-badge>
            </b-btn>
            </div>
          </template> -->
        </vuetable>
        <!-- <vuetable-pagination-bootstrap
          class="mt-4"
          ref="pagination"
          @vuetable-pagination:change-page="onChangePage"
        /> -->
      </b-colxx>
    </b-row>
  </div>
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