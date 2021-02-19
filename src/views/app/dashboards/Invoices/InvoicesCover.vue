<template>
  <div>
    Invoices here
  </div>
</template>


<script>
import { SIDE_EMPH } from '../../../../constants/formKey';
export default {
  created() {
    this.$store.commit(SIDE_EMPH, 'invoices');
  },
}
</script>
