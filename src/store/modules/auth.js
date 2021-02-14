import Axios from "axios";
import { authUser, keepUser, PROXY } from "../../constants/config";
import {
  USER, LOGIN, IS_LOGGED_IN, LOGIN_ATTEMPTED, PROCESSING_AUTH,
  AUTH_ERROR, TEMP_MAIL, keepToken, ERR_MESS
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

  },

  getters:{
    user: state => state.user,

    loginAttempted: state => state.loginAttempted,

    isLoggedIn: state => state.isLoggedIn,

    processingAuth: state => state.processingAuth,

    authError: state => state.authError,

    tempMail: state => state.tempMail,

    errMess: state => state.errMess,

  },

  mutations :{

    [USER](state, payload){
      state.user = payload;
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
            keepUser(res.data.data);
            commit(USER, authUser);
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
