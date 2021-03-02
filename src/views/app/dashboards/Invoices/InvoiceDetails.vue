<template>
  <b-row v-if="selected">
    <b-colxx>
      <b-row  class="mb-5">
        <b-colxx sm="12" md="7" class="d-flex">
          <b-card class="flex-fill" >

            <div class="row mb-3">
              <strong class="col-12 col-sm-6">
                Currency
              </strong>
              <span class="col-12 col-sm-6 text-right"> {{selected.currency}}</span>
            </div>
            <hr />

            <div class="row mb-3">
              <strong class="col-12 col-sm-6">
                Expected Amount
              </strong>
              <span class="col-12 col-sm-6 text-right"> {{selected.expected_amount}}</span>
            </div>
            <hr />

            <div class="row mb-3">
              <strong class="col-12 col-sm-6">
                Final Amount
              </strong>
              <span class="col-12 col-sm-6 text-right"> {{selected.final_amount}}</span>
            </div>
            <hr />

            <div class="row mb-3">
              <strong class="col-12 col-sm-6">
                Fees
              </strong>
              <span class="col-12 col-sm-6 text-right"> {{selected.fees}}</span>
            </div>
            <hr />

            <div class="row mb-3">
              <strong class="col-12 col-sm-6">
                Coin equivalent amount
              </strong>
              <span class="col-12 col-sm-6 text-right"> {{selected.coin_equivalent_amount}}</span>
            </div>
            <hr />

            <div class="row mb-3">
              <strong class="col-12 col-sm-6">
                Status
              </strong>
              <span class="col-12 col-sm-6 text-right"> {{selected.status}}</span>
            </div>
            <hr />

            <div class="row mb-3">
              <strong class="col-12 col-sm-6">
                Live
              </strong>
              <span class="col-12 col-sm-6 text-right"> {{selected.is_live}}</span>
            </div>
            <hr />

            <div class="row mb-3">
              <strong class="col-12 col-sm-6">
                Reference
              </strong>
              <span class="col-12 col-sm-6 text-right"> {{selected.inv_reference}}</span>
            </div>
            <hr />

            <div class="row mb-3">
              <strong class="col-12 col-sm-6">
                Redirect Url
              </strong>
              <span class="col-12 col-sm-6 text-right"> {{selected.redirect_url}}</span>
            </div>
            <hr />

            <div class="row mb-3">
              <strong class="col-12 col-sm-6">
                Created on
              </strong>
              <span class="col-12 col-sm-6 text-right"> {{timest(selected.createdAt)}}</span>
            </div>
            <hr />





          </b-card>
        </b-colxx>

        <b-colxx sm="12" md="5" class="d-flex">

          <b-card class="flex-fill">
            <h2>Invoice customization</h2>
            <div class="d-flex justify-content-between">
              <strong  class="d-flex align-items-center">
                Invoice attached logo
              </strong>
              <span >
                <b-avatar
                size="3rem"
                  :src="Logo"
                  :text="altText"
                >
                </b-avatar>
               </span>
            </div>
            <hr />

            <div class="row mb-3">
              <strong class="col-12 col-sm-6">
                Invoice title
              </strong>
              <span class="col-12 col-sm-6 text-right"> {{selected.business_invoice_customization.title}}</span>
            </div>
            <hr />

            <div class="row mb-3">
              <strong class="col-12 col-sm-6">
                Description
              </strong>
              <span class="col-12 col-sm-6 text-right"> {{selected.business_invoice_customization.description}}</span>
            </div>
            <hr />

            <h2 class="mt-4">Customer Info</h2>
            <div class="row mb-3">
              <strong class="col-12 col-sm-6">
                First name
              </strong>
              <span class="col-12 col-sm-6 text-right"> {{selected.business_customer.customer_firstname}}</span>
            </div>
            <hr />
            <div class="row mb-3">
              <strong class="col-12 col-sm-6">
                Last name
              </strong>
              <span class="col-12 col-sm-6 text-right"> {{selected.business_customer.customer_lastname }}</span>
            </div>
            <hr />
            <div class="row mb-3">
              <strong class="col-12 col-sm-6">
                Email
              </strong>
              <span class="col-12 col-sm-6 text-right"> {{selected.business_customer.customer_email}}</span>
            </div>
            <hr />
            <div class="row mb-3">
              <strong class="col-12 col-sm-6">
                Phone
              </strong>
              <span class="col-12 col-sm-6 text-right"> {{selected.business_customer.customer_phone}}</span>
            </div>
            <hr />

          </b-card>
        </b-colxx>
      </b-row>

      <!-- Payment transactions -->
      <b-row>
        <b-colxx sm="12" md="7">
          <h2>Invoice payments</h2>
          <b-table></b-table>
        </b-colxx>
      </b-row>
    </b-colxx>
  </b-row>
</template>
<script>
import { mapGetters } from 'vuex';
import { LUX_ZONE } from '../../../../constants/formKey';
export default {
  data: ()=>({
    selected: localStorage.SI? JSON.parse(window.atob(localStorage.SI)): null,
    Logo: "",
    altText: '',
    exchangers: null,
  }),

  computed:{
    ...mapGetters(['exchangeRates', 'momentBiz'])
  },

  methods:{
    timest(val){
      return LUX_ZONE(val);
    },

   processLogo(){
     if(!this.selected) return;
      this.Logo = this.selected.business_invoice_customization.logo;
      this.altText = this.selected.business_invoice_customization.title.charAt(0);
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
    },

    momentBiz(val){
      localStorage.removeItem('SI');
      this.$router.push('/dashboard/invoices')
    }
  },

  created(){
    this.processLogo();
    this.processExchange(this.exchangeRates)
  },

  beforeDestroy() {
    this.$emit('close')
  },

 /* beforeRouteEnter (to, from, next) {
    next(vm=>{
      if(!localStorage.SI){
        vm.$router.push('/dashboard/invoices')
      }else{
        next();
      }
    })

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

  }*/
}
</script>
