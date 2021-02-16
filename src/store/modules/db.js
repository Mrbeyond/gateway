import Axios from 'axios';
import { PROXY } from '../../constants/config';
import { ADMINS, CUSTOMERS,BUSINESSES, RES_KEY, hToken, BUSINESSDETAILS, TERMINALS, GARAGES,
  PORTS, LGS, AGENTTYPES, ADMINTYPES, PAYERS, FETCHING, AUTO_FETCHING,
  GETTINGTYPES, VEHICLES, ALL_GARAGES, VEHICLE_TYPES, REFRESHER, REFRESHING
} from '../../constants/formKey';

export default {
  state: {
    admins: null,
    customers: null,
    payers: null,
    businesses: null,
    terminals: null,
    businessDetails: null,
    resKey: {status:false, owner:''},
    intendedPage: '',
    ports:null,
    garages:null,
    lgs:null,
    agentTypes:null,
    adminTypes:null,
    fetching: {status:false, owner:''},
    autoFetching: false,
    gettingTypes: false,
    vehicles: null,
    vehicleTypes: null,
    allGarages: null,
    refresher: {status:false, owner:''},
    refreshing: false,

  },

  /** This is manually included */
  getters: {
    admins: state=> state.admins,

    businessDetails: state=> state.businessDetails,

    businesses: state=> state.businesses,

    terminals: state=>state.terminals,

    intendedRoute: state=>state.intendedPage,

    customers: state=>state.customers,

    resKey: state=> state.resKey,

    ports: state=> state.ports,

    garages: state=> state.garages,

    lgs: state=> state.lgs,

    agentTypes: state=> state.agentTypes,

    adminTypes: state=> state.adminTypes,

    payers: state=> state.payers,

    fetching: state=> state.fetching,

    autoFetching: state=> state.autoFetching,

    gettingTypes: state=> state.gettingTypes,

    vehicles: state=> state.vehicles,

    vehicleTypes: state => state.vehicleTypes,

    allGarages: state => state.allGarages,

    refresher: state => state.refresher,

    refreshing: state => state.refreshing,
  },

  mutations: {

    [ADMINS](state, payload){
      state.admins = payload;
    },

    [CUSTOMERS](state, payload){
      state.customers = payload;
    },

    [PAYERS](state, payload){
      state.payers = payload;
    },

    [BUSINESSES](state, payload){
      state.businesses = payload;
    },

    [BUSINESSDETAILS](state, payload){
      state.businessDetails = payload;
    },

    [TERMINALS](state, payload){
      state.terminals = payload;
    },

    [RES_KEY](state, payload){
      // console.log(payload.owner);
      state.resKey = payload;
    },

    [GARAGES](state, payload){
      // console.log(payload.owner);
      state.garages = payload;
    },

    [PORTS](state, payload){
      // console.log(payload.owner);
      state.ports = payload;
    },

    [LGS](state, payload){
      // console.log(payload.owner);
      state.lgs = payload;
    },

    [AGENTTYPES](state, payload){
      // console.log(payload.owner);
      state.agentTypes = payload;
    },

    [ADMINTYPES](state, payload){
      // console.log(payload.owner);
      state.adminTypes = payload;
    },

    [FETCHING](state, payload){
      // console.log(payload.owner);
      state.fecthing = payload;
    },

    [AUTO_FETCHING](state){
      // console.log(state.autoFetching.status);
      state.autoFetching = !state.autoFetching;
    },

    [GETTINGTYPES](state){
      // console.log('from store');
      // console.log(state.autoFetching.status);
      state.gettingTypes = !state.gettingTypes;
    },

    [VEHICLES](state, payload){
      // console.log(payload.owner);
      state.vehicles = payload;
    },

    [ALL_GARAGES](state,payload){
      state.allGarages = payload;
    },

    [VEHICLE_TYPES](state,payload){
      state.vehicleTypes = payload;
    },

    [REFRESHER](state,payload){
      state.refresher = {status: !state.refresher.status, owner:payload};
    },

    [REFRESHING](state){
      state.refreshing = !state.refreshing;
    },



  },



  actions: {
    [BUSINESSDETAILS]({commit},id){
      commit(REFRESHER, BUSINESSDETAILS);
      Axios.get(`${PROXY}business/${id}`, {headers: hToken()})
      .then(res=>{
        if(!res.data.error){
          let payload;
          try {
            payload = res.data.data
            commit(BUSINESSDETAILS, payload);
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

    [ADMINS]({commit}){
      commit(REFRESHER, ADMINS);
      Axios.get(`${PROXY}admin/admins`, {headers: hToken()})
      .then(res=>{
        if(!res.data.error){
          let payload;
          try {
            payload = res.data.data
            commit(ADMINS, payload);
            commit(RES_KEY, {status:0, owner: ADMINS});
          } catch (e) {
            commit(RES_KEY, {status:1, owner: ADMINS});
          }
        }else{
          commit(RES_KEY, {status:1, owner: ADMINS});
        }
        commit(REFRESHER, ADMINS);
      })
      .catch(err => {
        if(err.response){
          commit(RES_KEY, {status:2, owner: ADMINS});
          commit(REFRESHER, ADMINS);
        }
      })
    },

    [PAYERS]({commit}){
      commit(REFRESHER, PAYERS);
      Axios.get(`${PROXY}admin/payer/details`, {headers: hToken()})
      .then(res=>{
        if(!res.data.error){
          let payload;
          try {
            payload = res.data.data
            commit(PAYERS, payload);
            commit(RES_KEY, {status:0, owner: PAYERS});
          } catch (e) {
            commit(RES_KEY, {status:1, owner: PAYERS});
          }
        }else{
          commit(RES_KEY, {status:1, owner: PAYERS});
        }
        commit(REFRESHER, PAYERS);
      })
      .catch(err => {
        if(err.response){
          commit(RES_KEY, {status:2, owner: PAYERS});
          commit(REFRESHER, PAYERS);
        }
      })
    },

    [TERMINALS]({commit}){
      commit(REFRESHER, TERMINALS);
      Axios.get(`${PROXY}admin/terminals`, {headers: hToken()})
      .then(res=>{
        if(!res.data.error){
          let payload;
          try {
            payload = res.data.data
            commit(TERMINALS, payload);
            commit(RES_KEY, {status:0, owner: TERMINALS});
          } catch (e) {
            commit(RES_KEY, {status:1, owner: TERMINALS});
          }
        }else{
          commit(RES_KEY, {status:1, owner: TERMINALS});
        }
        commit(REFRESHER, TERMINALS);
      })
      .catch(err => {
        if(err.response){
          commit(RES_KEY, {status:2, owner: TERMINALS});
          commit(REFRESHER, TERMINALS);
        }
      })
    },

    [PORTS]({commit}){
      commit(REFRESHER, PORTS);
      Axios.get(`${PROXY}location/ports`, {headers: hToken()})
      .then(res=>{
        if(!res.data.error){
          let payload;
          try {
            payload = res.data.data
            commit(PORTS, payload);
            commit(RES_KEY, {status:0, owner: PORTS});
          } catch (e) {
            commit(RES_KEY, {status:1, owner: PORTS});
          }
        }else{
          commit(RES_KEY, {status:1, owner: PORTS});
        }
        commit(REFRESHER, PORTS);
      })
      .catch(err => {
        if(err.response){
          commit(RES_KEY, {status:2, owner: PORTS});
          commit(REFRESHER, PORTS);
        }
      })
    },

    [GARAGES]({commit}, id){
      commit(AUTO_FETCHING);
      Axios.get(`${PROXY}location/garages/${id}`, {headers: hToken()})
      .then(res=>{
        if(!res.data.error){
          let payload;
          try {
            payload = res.data.data
            commit(GARAGES, payload);
            commit(RES_KEY, {status:0, owner: GARAGES});
          } catch (e) {
            commit(RES_KEY, {status:1, owner: GARAGES});
          }
        }else{
          commit(RES_KEY, {status:1, owner: GARAGES});
        }
        commit(AUTO_FETCHING);
      })
      .catch(err => {
        if(err.response){
          commit(RES_KEY, {status:2, owner: GARAGES});
          commit(AUTO_FETCHING);
        }
      })
    },

    [LGS]({commit}){

      Axios.get(`${PROXY}location/local_governments`, {headers: hToken()})
      .then(res=>{
        if(!res.data.error){
          let payload;
          try {
            payload = res.data.data
            commit(LGS, payload);
            commit(RES_KEY, {status:0, owner: LGS});
          } catch (e) {
            commit(RES_KEY, {status:1, owner: LGS});
          }
        }else{
          commit(RES_KEY, {status:1, owner: LGS});
        }
      })
      .catch(err => {
        if(err.response){
          commit(RES_KEY, {status:2, owner: LGS});
        }
      })
    },

    [AGENTTYPES]({commit}){
      // commit(FETCHING, )
      commit(GETTINGTYPES);
      Axios.get(`${PROXY}admin/agent_types`, {headers: hToken()})
      .then(res=>{
        if(!res.data.error){
          let payload;
          try {
            payload = res.data.data
            commit(AGENTTYPES, payload);
            commit(RES_KEY, {status:0, owner: AGENTTYPES});
          } catch (e) {
            commit(RES_KEY, {status:1, owner: AGENTTYPES});
          }
        }else{
          commit(RES_KEY, {status:1, owner: AGENTTYPES});
        }
        commit(GETTINGTYPES);
      })
      .catch(err => {
        if(err.response){
          commit(RES_KEY, {status:2, owner: AGENTTYPES});
          commit(GETTINGTYPES);
        }
      })
    },

    [ADMINTYPES]({commit}){

      Axios.get(`${PROXY}admin/admins/types`, {headers: hToken()})
      .then(res=>{
        if(!res.data.error){
          let payload;
          try {
            payload = res.data.data
            commit(ADMINTYPES, payload);
            commit(RES_KEY, {status:0, owner: ADMINTYPES});
          } catch (e) {
            commit(RES_KEY, {status:1, owner: ADMINTYPES});
          }
        }else{
          commit(RES_KEY, {status:1, owner: ADMINTYPES});
        }

      })
      .catch(err => {
        if(err.response){
          commit(RES_KEY, {status:2, owner: ADMINTYPES});

        }
      })
    },

    [VEHICLES]({commit}){
      commit(REFRESHER, VEHICLES);
      Axios.get(`${PROXY}admin/vehicle/details`, {headers: hToken()})
      .then(res=>{
        if(!res.data.error){
          let payload;
          try {
            payload = res.data.data
            commit(VEHICLES, payload);
            commit(RES_KEY, {status:0, owner: VEHICLES});
          } catch (e) {
            commit(RES_KEY, {status:1, owner: VEHICLES});
          }
        }else{
          commit(RES_KEY, {status:1, owner: VEHICLES});
        }
        commit(REFRESHER, VEHICLES);
      })
      .catch(err => {
        if(err.response){
          commit(RES_KEY, {status:2, owner: VEHICLES});
          commit(REFRESHER, VEHICLES);
        }
      })
    },

    [ALL_GARAGES]({commit}){
      commit(REFRESHER, ALL_GARAGES);
      Axios.get(`${PROXY}location/garages`, {headers: hToken()})
      .then(res=>{
        if(!res.data.error){
          let payload;
          try {
            payload = res.data.data
            commit(ALL_GARAGES, payload);
            commit(RES_KEY, {status:0, owner: ALL_GARAGES});
          } catch (e) {
            commit(RES_KEY, {status:1, owner: ALL_GARAGES});
          }
        }else{
          commit(RES_KEY, {status:1, owner: ALL_GARAGES});
        }
        commit(REFRESHER, ALL_GARAGES);
      })
      .catch(err => {
        if(err.response){
          commit(RES_KEY, {status:2, owner: ALL_GARAGES});
          commit(REFRESHER, ALL_GARAGES);
        }
      })
    },

    [VEHICLE_TYPES]({commit}){
      commit(REFRESHER, VEHICLE_TYPES);
      Axios.get(`${PROXY}admin/vehicle_types`, {headers: hToken()})
      .then(res=>{
        if(!res.data.error){
          let payload;
          try {
            payload = res.data.data
            commit(VEHICLE_TYPES, payload);
            commit(RES_KEY, {status:0, owner: VEHICLE_TYPES});
          } catch (e) {
            commit(RES_KEY, {status:1, owner: VEHICLE_TYPES});
          }
        }else{
          commit(RES_KEY, {status:1, owner: VEHICLE_TYPES});
        }
        commit(REFRESHER, VEHICLE_TYPES);
      })
      .catch(err => {
        if(err.response){
          commit(RES_KEY, {status:2, owner: VEHICLE_TYPES});
          commit(REFRESHER, VEHICLE_TYPES);
        }
      })
    },


  },

}

