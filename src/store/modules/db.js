import Axios from 'axios';
import { keepBiz, lastBiz, PROXY } from '../../constants/config';
import {CUSTOMERS,BUSINESSES, RES_KEY,hToken, REFRESHER, BUSINESSDETAILS,
  REFRESHING, GETPAYOUTS,WALLETS,WALLETSDETAILS,GETAPIS, MOMENT_BIZ,
   SIDE_EMPH, PROGRESS
} from '../../constants/formKey';

export default {
  state: {
    customers: null,
    businesses: null,
    payouts: null,
    wallets: null,
    walletsdetails: null,
    getapis:null,
    businessDetails: null,
    resKey: {status:0, owner:''},
    refresher: {status:0, owner:''},
    refreshing: false,
    momentBiz: null,
    sideEmph: "dashboard",
    progress: 0,

  },

  /** This is manually included */
  getters: {
    getapis: state=> state.getapis,

    payouts: state=> state.walletsdetails,

    payouts: state=> state.wallets,

    payouts: state=> state.payouts,

    businessDetails: state=> state.businessDetails,

    businesses: state=> state.businesses,

    customers: state=>state.customers,

    resKey: state=> state.resKey,

    refresher: state => state.refresher,

    refreshing: state => state.refreshing,

    momentBiz: state => state.momentBiz,

    sideEmph: state => state.sideEmph,

    progress: state => state.progress,
  },

  mutations: {
    [GETAPIS](state, payload){
      state.getapis = payload;
    },
    [PROGRESS]( state, payload){
      state.progress = payload;
    },

    [WALLETSDETAILS](state, payload){
      state.walletsdetails = payload;
    },
    [WALLETS](state, payload){
      state.wallets = payload;
    },

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

    [SIDE_EMPH](state, payload){
      // console.log(payload, 'from store');
      state.sideEmph = payload;
    },


  },



  actions: {
    
    [GETAPIS]({commit},id){

      commit(REFRESHER, GETAPIS);
      Axios.get(`${PROXY}business/${id}/keys`, {headers: hToken()})
      .then(res=>{
        if(!res.data.error){
          console.log(res);
          let payload;
          try {
            payload = res.data.data
            commit(GETAPIS, payload);
            commit(RES_KEY, {status:0, owner: GETAPIS});
          } catch (e) {
            commit(RES_KEY, {status:1, owner: GETAPIS});
          }
        }else{
          commit(RES_KEY, {status:1, owner: GETAPIS});
        }
        commit(REFRESHER, GETAPIS);
      })
      .catch(err => {
        if(err.response){
          commit(RES_KEY, {status:2, owner: GETAPIS});
          commit(REFRESHER, GETAPIS);
        }
      })
    },

    [WALLETSDETAILS]({commit},id,wallet_id){

      commit(REFRESHER, WALLETSDETAILS);
      Axios.get(`${PROXY}wallet/${id}/details/${wallet_id}`, {headers: hToken()})
      .then(res=>{
        if(!res.data.error){
          // console.log(res);
          let payload;
          try {
            payload = res.data.data
            commit(WALLETSDETAILS, payload);
            commit(RES_KEY, {status:0, owner: WALLETSDETAILS});
          } catch (e) {
            commit(RES_KEY, {status:1, owner: WALLETSDETAILS});
          }
        }else{
          commit(RES_KEY, {status:1, owner: WALLETSDETAILS});
        }
        commit(REFRESHER, WALLETSDETAILS);
      })
      .catch(err => {
        if(err.response){
          commit(RES_KEY, {status:2, owner: WALLETSDETAILS});
          commit(REFRESHER, WALLETSDETAILS);
        }
      })
    },

    [WALLETS]({commit},id){

      commit(REFRESHER, WALLETS);
      Axios.get(`${PROXY}business/${id}/payout/wallets`, {headers: hToken()})
      .then(res=>{
        if(!res.data.error){
          // console.log(res);
          let payload;
          try {
            payload = res.data.data
            commit(WALLETS, payload);
            commit(RES_KEY, {status:0, owner: WALLETS});
          } catch (e) {
            commit(RES_KEY, {status:1, owner: WALLETS});
          }
        }else{
          commit(RES_KEY, {status:1, owner: WALLETS});
        }
        commit(REFRESHER, WALLETS);
      })
      .catch(err => {
        if(err.response){
          commit(RES_KEY, {status:2, owner: WALLETS});
          commit(REFRESHER, WALLETS);
        }
      })
    },

    [GETPAYOUTS]({commit},id){

      commit(REFRESHER, GETPAYOUTS);
      Axios.get(`${PROXY}business/${id}/payout/wallets`, {headers: hToken()})
      .then(res=>{
        if(!res.data.error){
          // console.log(res);
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
      commit(PROGRESS, 0);
      commit(REFRESHER, BUSINESSDETAILS);
      commit(RES_KEY, {status:1, owner: BUSINESSDETAILS});
      Axios.get(`${PROXY}business/${id}`,
      {
        headers: hToken(),
        onDownloadProgress: ({loaded, total})=>{
          // console.log(loaded, total);
          if(total > 0){
            alert();
              commit(PROGRESS, Math.round((loaded*100) /total));
           }
         }
        }
      )
      .then(res=>{
        if(!res.data.error){
          // console.log(res);
          let payload;
          try {
            payload = res.data.data
            commit(BUSINESSDETAILS, payload);
            commit(MOMENT_BIZ, id);
            keepBiz(id);
            commit(RES_KEY, {status:2, owner: BUSINESSDETAILS});
          } catch (e) {
            commit(RES_KEY, {status:3, owner: BUSINESSDETAILS});
          }
        }else{
          commit(RES_KEY, {status:3, owner: BUSINESSDETAILS});
        }
        commit(REFRESHER, BUSINESSDETAILS);
      })
      .catch(err => {
        if(err.response){
          commit(RES_KEY, {status:3, owner: BUSINESSDETAILS});
          commit(REFRESHER, BUSINESSDETAILS);
        }
      })
    },

    [BUSINESSES]({commit}){
      commit(REFRESHER, BUSINESSES);
      Axios.get(`${PROXY}business`, {headers: hToken()})
      .then(res=>{
        // console.log(res.data)
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

