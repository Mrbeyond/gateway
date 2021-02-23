<template>
  <div>
    <b-table responsive :items="allInvoices" :fields="fields"/>
  </div>
</template>


<script>
import { SIDE_EMPH,INVOICES,toMoney } from '../../../../constants/formKey';
export default {
  data() {
    return{
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
    GetInvoice(id){
      this.$store.dispatch(INVOICES,id);
    },
  },
  computed: {
     biz(){
      return this.$store.getters.momentBiz
    },
     allInvoices(){
      return this.$store.getters.invoice;
    },
  },
  watch: {
    biz(val){
      this.GetInvoice(val)
    }
  },
  created() {
     this.GetInvoice(this.biz);
    this.$store.commit(SIDE_EMPH, 'invoices');
  },
}
</script>
