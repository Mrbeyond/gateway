<template>
  <div>
     <div v-if="isLoading && !invoices" class="row justify-content-center">
        <div> <b-spinner variant="primary" /></div>
    </div>
    <div v-else-if="!isLoading && !invoices">
        Went wrong slot
    </div>
    <b-row v-else>
      <b-colxx  xxs="12">

        <b-row class="mb-3">
          <b-colxx class="text-right">
            <b-button>Create Invoice</b-button>
          </b-colxx>
        </b-row>

        <b-row>
          <b-colxx>
            <div v-if="invoices.length < 1"
              class="text-center"
            >
              <i class="iconsminds-folder-delete text-large"  />
              <p>No Invoice </p>
            </div>

            <div v-else>
              <b-table responsive :items="invoices" :fields="fields"/>
            </div>
          </b-colxx>
        </b-row>
      </b-colxx>
    </b-row>
  </div>
</template>


<script>
import { mapGetters } from 'vuex';
import { SIDE_EMPH,INVOICES,toMoney } from '../../../../constants/formKey';
export default {
  data() {
    return{
        isLoading: true,

       fields: [
        {
        key: "currency",
        label: "Currency",
        sortable: true
        },
         {
        key: "expected_amount",
        label: "Expected",
        formatter(val){
            return toMoney(val)
          },
        sortable: true
        },
         {
        key: "fees",
        label: "Fees",
         formatter(val){
            return toMoney(val)
          },
        sortable: true
        },
          {
        key: "final_amount",
        label: "Amount",
         formatter(val){
            return toMoney(val)
          },
        sortable: true
        },
        {
          key: "reference",
           label: "Reference",

        sortable: true

        }
      ]

    }
  },
  methods: {
    getInvoices(id){
      this.$store.dispatch(INVOICES,id);
    },

  },
  computed: {
    ...mapGetters(['momentBiz', 'invoices', 'resKey']),

  },
  watch: {
    resKey(val){
      if(val.owner == INVOICES){
        if(val.status == 1){
          this.isLoading = true;
        }else{
          this.isLoading = false;
        }
      }
    },

    momentBiz(val){
      this.getInvoices(val)
    }
  },
  created() {
     this.getInvoices(this.momentBiz);
    this.$store.commit(SIDE_EMPH, 'invoices');
  },
}
</script>
