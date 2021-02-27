<template>
  <b-row >
    <b-colxx>
      Wallets
    </b-colxx>
  </b-row>
</template>
<script>
import { mapGetters } from 'vuex';
import { LUX_ZONE,statusA, SIDE_EMPH, WALLETS } from '../../../../constants/formKey';
export default {
  components: {
  },
  data: ()=>({
    isLoading: true,

  }),

  methods: {
    getWallets(id){
        this.$store.dispatch(WALLETS,id)
    },

  },
  computed: {
    ...mapGetters(['momentBiz', 'wallets', 'resKey'])
  },
  watch: {
    apiKey(val){
      if(val && val.owner && val.owner == WALLETS){
        if(val.status == 1){
          this.isLoading = true;
        }else {
          this.isLoading = false;
        }
      }
    },

    momentBiz(val){
      this.getWallets(val);
    }
  },

  created() {
    this.getWallets(this.momentBiz);
    this.$store.commit(SIDE_EMPH, 'wallets');

  },
}
</script>
