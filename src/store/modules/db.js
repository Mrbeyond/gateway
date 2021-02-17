import Axios from 'axios';
import { keepBiz, lastBiz, PROXY } from '../../constants/config';
import {CUSTOMERS,BUSINESSES, RES_KEY,hToken, REFRESHER, BUSINESSDETAILS,
  REFRESHING, GETPAYOUTS, MOMENT_BIZ
} from '../../constants/formKey';

export default {
  state: {
    customers: null,
    businesses: null,
    payouts: null,
    businessDetails: null,
    resKey: {status:false, owner:''},
    refresher: {status:false, owner:''},
    refreshing: false,
    momentBiz: null,

  },

  /** This is manually included */
  getters: {
    payouts: state=> state.payouts,

    businessDetails: state=> state.businessDetails,

    businesses: state=> state.businesses,

    customers: state=>state.customers,

    resKey: state=> state.resKey,

    refresher: state => state.refresher,

    refreshing: state => state.refreshing,

    momentBiz: state => state.momentBiz,
  },

  mutations: {

    [GETPAYOUTS](state, payload){
      state.payouts = payload;
    },

    [CUSTOMERS](state, payload){
      state.customers = payload;
    },
    [BUSINESSES](state, payload){
      state.businesses = payload;
    },

    [BUSINESSDETAILS](state, payload){
      state.businessDetails = payload;
    },

    [RES_KEY](state, payload){
      // console.log(payload.owner);
      state.resKey = payload;
    },

    [REFRESHER](state,payload){
      state.refresher = {status: !state.refresher.status, owner:payload};
    },

    [REFRESHING](state){
      state.refreshing = !state.refreshing;
    },

    [MOMENT_BIZ](state, payload){
      state.momentBiz = payload;
    },



  },



  actions: {

    [GETPAYOUTS]({commit},id){

      commit(REFRESHER, GETPAYOUTS);
      Axios.get(`${PROXY}business/${id}`, {headers: hToken()})
      .then(res=>{
        if(!res.data.error){
          console.log(res);
          let payload;
          try {
            payload = res.data.data
            commit(GETPAYOUTS, payload);
            commit(RES_KEY, {status:0, owner: GETPAYOUTS});
          } catch (e) {
            commit(RES_KEY, {status:1, owner: GETPAYOUTS});
          }
        }else{
          commit(RES_KEY, {status:1, owner: GETPAYOUTS});
        }
        commit(REFRESHER, GETPAYOUTS);
      })
      .catch(err => {
        if(err.response){
          commit(RES_KEY, {status:2, owner: GETPAYOUTS});
          commit(REFRESHER, GETPAYOUTS);
        }
      })
    },
    [BUSINESSDETAILS]({commit},id){

      commit(REFRESHER, BUSINESSDETAILS);
      Axios.get(`${PROXY}business/${id}`, {headers: hToken()})
      .then(res=>{
        if(!res.data.error){
          // console.log(res);
          let payload;
          try {
            payload = res.data.data
            commit(BUSINESSDETAILS, payload);
            commit(MOMENT_BIZ, id);
            keepBiz(id);
            commit(RES_KEY, {status:0, owner: BUSINESSDETAILS});
          } catch (e) {
            commit(RES_KEY, {status:1, owner: BUSINESSDETAILS});
          }
        }else{
          commit(RES_KEY, {status:1, owner: BUSINESSDETAILS});
        }
        commit(REFRESHER, BUSINESSDETAILS);
      })
      .catch(err => {
        if(err.response){
          commit(RES_KEY, {status:2, owner: BUSINESSDETAILS});
          commit(REFRESHER, BUSINESSDETAILS);
        }
      })
    },

    [BUSINESSES]({commit}){
      commit(REFRESHER, BUSINESSES);
      Axios.get(`${PROXY}business`, {headers: hToken()})
      .then(res=>{
        console.log(res.data)
        if(!res.data.error){
          let payload;
          try {
            payload = res.data.data
            commit(BUSINESSES, payload);
            commit(RES_KEY, {status:0, owner: BUSINESSES});
          } catch (e) {
            commit(RES_KEY, {status:1, owner: BUSINESSES});
          }
        }else{
          commit(RES_KEY, {status:1, owner: BUSINESSES});
        }
        commit(REFRESHER, BUSINESSES);
      })
      .catch(err => {
        if(err.response){
          commit(RES_KEY, {status:2, owner: BUSINESSES});
          commit(REFRESHER, BUSINESSES);
        }
      })
    },

    [CUSTOMERS]({commit}){
      commit(REFRESHER, CUSTOMERS);
      Axios.get(`${PROXY}admin/agent/details`, {headers: hToken()})
      .then(res=>{
        if(!res.data.error){
          let payload;
          try {
            payload = res.data.data
            commit(CUSTOMERS, payload);
            commit(RES_KEY, {status:0, owner: CUSTOMERS});
          } catch (e) {
            commit(RES_KEY, {status:1, owner: CUSTOMERS});
          }
        }else{
          commit(RES_KEY, {status:1, owner: CUSTOMERS});
        }
        commit(REFRESHER, CUSTOMERS);
      })
      .catch(err => {
        if(err.response){
          commit(RES_KEY, {status:2, owner: CUSTOMERS});
          commit(REFRESHER, CUSTOMERS);
        }
      })
    },


  },

}

