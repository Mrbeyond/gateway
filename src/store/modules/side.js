import { MOBILE, SHOW } from "../../constants/formKey";

export default {
  state:{
    show: false,
    mobile: false,

  },

  getters:{
    show: state => state.show,

    mobile: state =>state.mobile

  },

  mutations: {
    [SHOW](state, payload){
      state.show = payload;
    },

    [MOBILE](state, payload){
      state.mobile = payload;
    },

  }
}
