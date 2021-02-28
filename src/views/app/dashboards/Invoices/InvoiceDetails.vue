<template>
  <b-row v-if="selected">
    <b-colxx>
      <b-row >
        <b-colxx sm="12" md="7">
          <p>Invoice</p>
          <b-card >
            <b-row>
              <b-col >
                <b-avatar
                size="5rem"
                  :src="Logo"
                  :text="altText"
                >
                </b-avatar>
                <p> <strong>{{ selected.business_invoice_customization.title }} </strong></p>
                <div>{{ selected.business_invoice_customization.description }}</div>
              </b-col>
              <b-col >
                <p class="text-right">{{ selected.expected_amount }} {{ selected.currency }}</p>
              </b-col>
            </b-row>

            <hr />

            <h2 class="text-center">Select payment currency</h2>
            <div v-if="exchangers">
              <div v-for="(rate, index) in exchangers" :key="index"
              class="d-flex justify-content-between mb-2 border shadow p-1"
              >
                <div >
                  <b-avatar :src="rate.slug == 'BTC'?
                    require('@/assets/bitl.png'): require('@/assets/ethl.png') "
                    :text="rate.text">
                  </b-avatar>
                  <span class="ml-1">
                    {{ rate.name }}
                  </span>
                </div>
                <div class="align-self-center">
                  {{ rate.amount }}
                  <span>{{ rate.slug }}</span>
                </div>
              </div>


            </div>


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
import { mapGetters } from 'vuex';
export default {
  data: ()=>({
    selected: JSON.parse(window.atob(localStorage.SI)),
    Logo: "",
    altText: '',
    exchangers: null,
  }),

  computed:{
    ...mapGetters(['exchangeRates'])
  },

  methods:{
   processLogo(){
      this.Logo = !this.selected?
        null : this.selected.business_invoice_customization.logo?
          this.selected.business_invoice_customization.logo :
          this.selected.business.logo? this.selected.business.logo:
          null;

        this.altText = this.Logo? "":
        this.selected.business.name.chartAt(0);
    },

    processExchange(val){
      if(!val || !this.selected) return;
      this.exchangers = [
        {
          name:"Bitcoin",
          logo: 'bitl.png',
          amount: (val.rates.BTC * this.selected.expected_amount).toFixed(8),
          slug: 'BTC',
          text: "B",

        },
        {
          name: "Ethereum",
          logo: "ethl.png",
          amount: (val.rates.ETH * this.selected.expected_amount).toFixed(8),
          slug: 'ETH',
          text: "E",
        }
      ]
    }
  },

  watch: {
    exchangeRates(val){
      this.processExchange(val);
    }
  },

  created(){
    this.processLogo();
    this.processExchange(this.exchangeRates)
  },

  beforeDestroy() {
    this.$emit('close')
  },
}
</script>
