<template>
  <b-row v-if="selected">
    <b-colxx>
      <b-row >
        <b-colxx sm="12" md="7">
          <b-card title="Invoice">
          </b-card>
        </b-colxx>
        <b-colxx sm="12" md="5">
          <b-card title="Customer">
          </b-card>
        </b-colxx>
      </b-row>
    </b-colxx>
  </b-row>
</template>
<script>
export default {
  data: ()=>({
    selected: JSON.parse(window.atob(localStorage.SI)),
  }),

  created(){

  },

  beforeDestroy() {
    this.$emit('close')
  },
}
</script>
