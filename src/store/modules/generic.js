import Axios from "axios";
import {PROXY } from "../../constants/config";
import { BUSI_PARAM, ERR_MESS, EXCHANGE_RATES, GENERROR, hToken
} from "../../constants/formKey";


export default{
  state:{
    generror: false,
    exchangeRates: null,
    busiParams: null,

  },

  getters:{

    generror: state => state.generror,

    exchangeRates: state=> state.exchangeRates,

    busiParams: state => state.busiParams,

  },

  mutations :{

    [EXCHANGE_RATES](state, payload){
      state.exchangeRates = payload;
    },

    [BUSI_PARAM](state, payload){
      state.busiParams = payload;
    },

    [ERR_MESS](state, payload){
      state.errMess = payload;
    },

    [GENERROR](state, payload){
      state.generror = payload;
    },



  },

  actions: {

    [BUSI_PARAM]({commit}){
      commit(GENERROR, false)
      Axios.get(`${PROXY}generic/business-parameters`, hToken())
      .then(res=>{
          if(!res.data.error){
            commit(GENERROR, false)
            commit(BUSI_PARAM, res.data.data)
          }else{
            commit(GENERROR, true)
          }
      })
      .catch(err=>{
          if(err && err.response && err.response.status === 401){
            commit(GENERROR, true);
          }
      })

    },

    [EXCHANGE_RATES]({commit}){
      commit(GENERROR, false)
      Axios.get(`${PROXY}generic/exchange-rates/NGN`, hToken())
      .then(res=>{
          if(!res.data.error){
            commit(GENERROR, false)
            commit(EXCHANGE_RATES, res.data.data)
          }else{
            commit(GENERROR, true)
          }
      })
      .catch(err=>{
          if(err && err.response && err.response.status === 401){
            commit(GENERROR, true);
          }
      })

    }
  }

}
