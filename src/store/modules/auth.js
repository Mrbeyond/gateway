import Axios from "axios";
import { authUser, keepBiz, keepUser, lastBiz, PROXY } from "../../constants/config";
import {
  USER, LOGIN, IS_LOGGED_IN, LOGIN_ATTEMPTED, PROCESSING_AUTH,
  AUTH_ERROR, TEMP_MAIL, keepToken, ERR_MESS, CURRENT_BIZ
} from "../../constants/formKey";


export default{
  state:{
    user: authUser(),
    loginAttempted: false,
    isLoggedIn: false,
    processingAuth: false,
    authError: false,
    tempMail: "",
    errMess: "",
    currentBiz: lastBiz(),

  },

  getters:{
    user: state => state.user,

    loginAttempted: state => state.loginAttempted,

    isLoggedIn: state => state.isLoggedIn,

    processingAuth: state => state.processingAuth,

    authError: state => state.authError,

    tempMail: state => state.tempMail,

    errMess: state => state.errMess,

    currentBiz: state => state.currentBiz,

  },

  mutations :{

    [USER](state, payload){
      state.user = payload;
    },

    [CURRENT_BIZ](state, payload){
      state.currentBiz = payload;
    },

    [IS_LOGGED_IN](state, payload){
      state.isLoggedIn = payload;
    },

    [PROCESSING_AUTH](state, payload){
      state.processingAuth = payload;
    },

    [LOGIN_ATTEMPTED]( state, payload){
      state.loginAttempted = payload;
    },

    [TEMP_MAIL](state, payload){
      state.tempMail = payload;
    },

    [AUTH_ERROR](state, payload){
      state.authError = payload;
    },

    [ERR_MESS](state, payload){
      state.errMess = payload;
    },

  },

  actions: {
    [LOGIN]({commit}, payload){
      commit(IS_LOGGED_IN, false);
      commit(PROCESSING_AUTH, true);
      commit(AUTH_ERROR, false);
      Axios.post(`${PROXY}user/login`, payload)
      .then(res=>{
          if(!res.data.error){
            // const {authorization} = ;
            keepToken(res.data.data.authorization)
            delete res.data.data.authorization;
            let RESP = res.data.data;
            keepUser(RESP);
            if(RESP.businesses &&RESP.businesses.length > 0){
              let id = lastBiz()? lastBiz(): RESP.businesses[0].id;
              keepBiz(id);
              commit(CURRENT_BIZ, id)
            }

            commit(USER, RESP);
            commit(IS_LOGGED_IN, true);
          }else{
            keepUser(null);
            commit(AUTH_ERROR, true);
          }
          commit(PROCESSING_AUTH, false);
      })
      .catch(err=>{
        // console.log(err);
          if(err && err.response && err.response.status === 401){
            keepUser(null);
            commit(ERR_MESS, err.message);
            commit(PROCESSING_AUTH, false);
            commit(AUTH_ERROR, true);
          }
      })

    }

  }

}
