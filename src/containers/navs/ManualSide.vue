<template>
  <div class="main-menu ">

    <div v-if="currentBiz" class="px-2" style="padding-top:0.5em">

      <div v-if="currentBusiness" class=" bg-dark px-2 pb-2 pt-0 position-relative" >
        <b-spinner small v-if="resKey && resKey.status == 1 && resKey.owner == BUSINESSDETAILS"
          class="spen text-white pb-2"
        />
        <div class="d-flex justify-content-between pt-2">
          <div>
            <p class="my-0">{{currentBusiness.name}}</p>
            <p class="my-1 text-center text-small test-muted"> {{ currentBusiness.id }}</p>
          </div>
          <div @click="bizShow = !bizShow" class="align-self-center" >
            <strong>
              <i v-if="!bizShow" style="font-size: 1.5em" class="simple-icon-arrow-down" />
              <i v-else style="font-size: 1.5em"  class="simple-icon-arrow-up" />
            </strong>
          </div>
        </div>
      </div>
      <div style="position: relative">
        <div v-if="bizShow && othersClone.length >0"
          class="w-100 bizs px-2 py-2 bg-dark"
          style="border-radius: 5px"
        >
          <p class="mb-2 text-small">OTHER BUSINESSES - {{ othersClone.length }}</p>

          <b-form class="mb-3">
            <b-form-input size="sm" class="py-1" type="search" placeholder="Search">
            </b-form-input>
          </b-form>
          <p v-for="(biz, index) in othersClone" :key="index"
            class="text-small mb-2  ptr text-semi-muted"
            @click="changeBusiness(biz.id)"
          >
            {{ biz.name }}
          </p>
          <hr class="mb-2" />
          <p class="mb-2 ptr text-small text-semi-muted ">Add a Business</p>
        </div>
      </div>
    </div>

      <div class="mt-4">

        <vue-perfect-scrollbar
          class="scroll"
          :settings="{ suppressScrollX: true, wheelPropagation: false }"
        >
          <hr class="mb-2" />
          <ul class="list-unstyled">
              <!-- :class="{ 'active' : (selectedParentMenu === item.id && viewingParentMenu === '') || viewingParentMenu === item.id }" -->
            <li
              v-for="(item,index) in menuItems"
              :key="`parent_${index}`"
              :data-flag="item.id"
              class=" overs"
              @click="toggleSide"


            >

              <!-- @click.native="changeSelectedParentHasNoSubmenu(item.id)"
              <router-link
                :to="item.to"
              >
              </router-link>
               -->
              <router-link :id="item.id"  :class="{link:true, dyna: item.id == sideEmph }" :to="item.to">
                <i :class="`${item.icon} mr-2 medCon`" />
                {{item.label}}

              </router-link>
            </li>
          </ul>
        </vue-perfect-scrollbar>
        <div>
         <!--  <b-button @click="testAx">
            Here {{ progress }}
          </b-button>
          <hr />
          <b-progress :value="prog" :max="100" show-progress ></b-progress>
            <b-spinner small v-if="resKey && resKey.status == 2 && resKey.owner == BUSINESSDETAILS"
          class="spen text-white pb-2"
        />

          -->
          <b-toast
            :variant="resKey.status == 2? 'success':resKey.status == 3? 'warning': 'primary'"
            id="example-toast"
            :title="resKey.status == 2? 'Profile changed':resKey.status == 3? 'Something went wrong': 'Error'" >
            {{
              resKey.status == 2? `You are now using ${currentBusiness.name} profile. `:
              resKey.status == 3? 'There seem to be connection error.': 'Oops! Something went wrong, please try again.'
            }}
          </b-toast>

        </div>
       </div>
    </div>

</template>

<script>
import Axios from 'axios';
import { lastBiz, PROXY } from '../../constants/config';
import { BUSINESSDETAILS, MOBILE } from '../../constants/formKey';
import menuItems from "../../constants/menu";
import { mapGetters } from 'vuex';

export default {

  data: ()=>({
    BUSINESSDETAILS,
    menuItems: menuItems,
    currentBusiness:null,
    currentBusinessDetails:"",
    otherBusinesses: null,
    othersClone: null,
    noBiz: false,
    bizShow: false,
    prog: 0,

  }),

  computed:{
    ...mapGetters(["momentBiz", "resKey", "currentBiz", "sideEmph", "mobile", "progress"]),

    // momentBiz(){
    //   // console.log(55555);
    //   return this.$store.getters.momentBiz;
    // },

    // businesses(){
    //   return this.$store.getters.currentBiz;
    // },

    // sideEmph(){
    //   return this.$store.getters.sideEmph;
    // },

    // mobile(){
    //   return this.$store.getters.mobile;
    // },

    // progress(){
    //   return this.$store.getters.progress;
    // },

  },

  methods:{
    testAx(){
      this.prog = 0;
      let up=(e)=>{
        console.log(e, "uploader");
      };
      let down = (e)=>{
        let {loaded, total} = e;
        console.log(e);
        console.log(loaded, total, "down");
        this.prog = Math.round((loaded*100) /total)
        console.log(this.prog, e.lengthComputable);
      }
      Axios.get(`${PROXY}generic/business-parameters`//"https://fetch-progress.anthum.com/30kbps/images/sunrise-baseline.jpg" /*"https://jsonplaceholder.typicode.com/comments"'https://run.mocky.io/v3/0b08bcb2-d5aa-4be5-a964-e43c488536e7'*/
        , {onUploadProgress: up, onDownloadProgress: down
      })
      .then(res=>{
        console.log(res);
      })
      .catch(err=>{
        console.log(err);
      })
    },

    toggleSide(){
      if(this.mobile){
        this.$store.commit(MOBILE, !this.mobile);
      }
    },

    changeBusiness(id) {
      if(this.currentBusiness){
        if(this.id == this.currentBusiness.id) return;
        this.$store.dispatch(BUSINESSDETAILS,id);
      }
    },

    shortener(val){
      return !val? " " :val.length > 15? val.slice(0,18)+"...": val
    },

    processBusinessList(val){
      let user = this.$store.getters.user;
      if(user && user.businesses && user.businesses.length > 0){
        if(val){
          this.currentBusiness = user.businesses.find(d=> d.id == val)?
          user.businesses.find(d=> d.id == val):
          user.businesses[0];
          this.otherBusinesses = user.businesses.filter(d=>d.id != this.currentBusiness.id);
          this.othersClone = [...this.otherBusinesses];

        }else{
          this.currentBusiness= user.businesses[0];
          this.otherBusinesses = user.businesses.filter(d=>d.id != this.currentBusiness.id);
          this.othersClone = [...this.otherBusinesses];
        }
      }else{
        this.$router.push('/user/login');
      }
    }

  },

  watch:{
    resKey(val){
      if(val && val.status == 2 && val.owner == BUSINESSDETAILS){
        this.$bvToast.show("example-toast");
      }
    },

    momentBiz(val){
      this.processBusinessList(val);
    },

    currentBiz(val){
      this.processBusinessList(val);
    },

  },

  created(){
    if(lastBiz()){
      this.processBusinessList(lastBiz());
    }

  },

  mounted() {
    /*console.log("new", this.sideEmph);
    let doc = document.getElementById(this.sideEmph);
    if (doc) {
      doc.classList.add("dyna")
      // setTimeout((()=>{
      //   doc.classList.add("dyna")
      // }), 300)
      // console.log(doc);
    }*/
  },

}
</script>

<style lang="scss" scoped>
.bizs{
  top: 100;
  position: absolute;
  z-index: 60000;
	transition-property: all;
	transition-duration: 2s;
	transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
}

.ptr{
  cursor: pointer;
  &:hover {
    color:white !important;
  }
}

.medCon{
  font-size: 1.5em;
}

.medExt{
  font-size: 1.2em !important;
}

.overs{
  font-size: 0.8em !important;
  // padding: 0.7em 1.2em !important;
  // background: darkgray;
  &:hover{
    background: black;
    // padding: 0.8em 1.4em !important;
    transition: 0.5s;
    cursor: pointer;
    // border-left: 5px solid whitesmoke;
  }
}

.link{
  display: block;
  width: 100%;
  color: white;
  padding: 0.7em 1.2em !important;
  padding: 0.7em 1.2em !important;
  &:hover{
    padding: 0.8em 1.4em !important;
    // transition: 0.5s;
    // cursor: pointer;
    border-left: 5px solid whitesmoke;
  }
}

.dyna{
  display: block;
  width: 100%;
  color: white;
  padding: 0.8em 1.4em !important;
  // transition: 0.5s;
  // cursor: pointer;
  background: black;
  border-left: 5px solid whitesmoke;
}

.spen{
  position: absolute;
  right: 0;
}
</style>
