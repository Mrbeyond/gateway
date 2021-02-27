
export const ADD_BUSINESS = "add_business";


/** Auths */
export const LOGIN = "LOGIN";
export const USER = "USER";
export const LOGIN_ATTEMPTED = "login_attempted";
export const IS_LOGGED_IN = "is_logged_in";
export const PROCESSING_AUTH = "processing_auth";
export const AUTH_ERROR = "auth_error";
export const TEMP_MAIL = "temp_mail";
export const CURRENT_BIZ = " CURRENT_BIZ"
export const MOMENT_BIZ = "MOMENT_BIZ"

export const ERR_MESS = "err_mess";

export const BUSI_PARAM = "BUSI_PARAM";
export const EXCHANGE_RATES = "EXCHANGE_RATES";
export const GENERROR = "GENERROR";
export const CONNECTION = "CONNECTION";

export const SHOW = "SHOW";
export const MOBILE = "MOBILE";
export const SIDE_EMPH = "SIDE_EMPH";
export const PROGRESS = "PROGRESS";


export const BUSINESSES = "BUSINESSES";
export const BUSINESSDETAILS = "BUSINESSDETAILS";
export const CUSTOMERS = "CUSTOMERS";
export const RES_KEY = "RES_KEY";
export const FETCHING = "FETCHING";
export const AUTO_FETCHING = "AUTO_FETCHING";
export const REFRESHER = "REFRESHER";
export const REFRESHING = "REFRESHING";
export const GETPAYOUTS = "GETPAYOUTS";
export const API_KEYS = "API_KEYS";
export const WALLETS = "WALLETS";
export const WALLETSDETAILS = "WALLETSDETAILS";
export const INVOICES = "INVOICES";





export const hToken=()=>{
  try {
     let ls = localStorage.AT? localStorage.AT: null;
     if(!ls) return "";
     ls = JSON.parse(window.atob(window.atob(ls)));
     return { authorization: `Bearer ${ls}`}
  } catch (e) {
      return "";
  }
}

export const keepToken = (token)=>{
  if(!token) return;
  localStorage.AT = window.btoa(window.btoa(JSON.stringify(token)));
}

export const resCoder=(status)=>{
  let defaulter = "Something went wrong, please try again";
  if(typeof Number(status) === "number"){
    const code = Number(status);
    switch (code) {
      case 404:
          return "Sorry, page not found";
        break;
      case 403:
        return "Sorry, forbidden from this action"
      break;
      case 401:
        return "Sorry, unathorized to performe this operation"
      break;
      case 200:
        return "Your operation was successful"
      break;
      case 201:
        return "Your operation was successful";
      break;
      case 400:
        return "Operation aborted, please check your values";
      break;

      default:
        return defaulter;
        break;
    }

  }
  return defaulter;
}

export const LUX_ZONE=(time)=>{
  if(!time) return '';
  if(window.luxon){
      const local = window.luxon.DateTime.local();
      const format = time.trim().replace(' ',"T")
      const ms = window.luxon.DateTime.fromISO(format, {zone: 'Africa/Accra'});
      const rezoned = ms.setZone(local.zoneName);
      let dater = new Date(Date.parse(rezoned)).toString()
      dater = dater.slice(0,dater.indexOf('GMT'))
      return `${dater}`;
  }
  return '';
}

export const plainTimeZone=(time)=>{
  if(!time) return '';
  if(window.luxon){
      const local = window.luxon.DateTime.local();
      const format = time.trim().replace(' ',"T")
      const ms = window.luxon.DateTime.fromISO(format, {zone: 'Africa/Accra'});
      const rezoned = ms.setZone(local.zoneName);
      return new Date(Date.parse(rezoned));
  }
  return '';
}

export const statusA = ["Inactive", "Active"];
export const statusS = ["Unsuccessful", "Successful"];
export const statusV = ["NO","YES"];

export const toMoney = (val)=>{
  let result =  parseInt(val).toLocaleString();
   return (result == "0")? "\u20A60.00": "\u20A6"+result;
};

export const enroute=(route)=>{
  // console.log(route);
  let arr = ["customers","payers", "ports", "lgs", "admins","terminals", "cards", 'tags', 'garages' ];
  let formSets= [ADD_AGENT, ADD_PAYER, ADD_PORT, ADD_LG, ADD_ADMIN, ADD_TERMINAL, ADD_CARD, ADD_TAG, ADD_GARAGE];
  if(route.split('/').length === 3){
    let curr = arr.find(data=>data.toString().toLowerCase() === route.split('/')[2].toString().toLowerCase());
    if(curr){
      curr = curr.toString();
     let ind = arr.indexOf(curr);
      return {
        formKey :  formSets[ind],
        current_path : curr.charAt(0).toUpperCase()+curr.slice(1, curr.length),
        showMenuTop : true,
      }
    }else{
      return  { formKey:"", current_path:"", showMenuTop : false, }
    }
  }else{
    return  { formKey:"", current_path:"", showMenuTop : false, }
  }
}

export const genRand=()=>{
  let rand =(v)=>{
    return Math.floor(Math.random() *Number(v-1))
  }
  let minRand =(min, max)=>{
  return Math.floor(Math.random() * (max - min) ) + min;
  }
  let arr = ['vancop','tghwijb','felkxumz','sdirqy'];
  let d = Date.now().toString().slice(-10);
  let un = rand(4);
  let str = [arr[un].slice(0,3), arr[un].slice(3,arr[un].length)];
  let ray = Array.from(d.slice(3,6)+ d.slice(6,9)+ d.slice(0,3)+ d.slice(9,10));
  let ff = rand(2);
  ray.splice(minRand(0,5),1,str[ff]);
  str.splice(ff,1);
  ray.splice(minRand(5,10), 1,str[0]);
  return ray.join("") ;
}



// export const loadash = window._.noConflict();
