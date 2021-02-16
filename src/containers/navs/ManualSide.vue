<template>
  <div class="main-menu">

    <div v-if="businesses" class="px-2" style="padding-top:0.5em">

      <div class="d-flex bg-dark px-2 py-2 justify-content-between">
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
      <div style="position: relative">
        <div v-if="bizShow && othersClone.length >0"
          class="w-100 bizs px-2 py-2 bg-dark"
          style="border-radius: 5px"
        >
          <p class="mb-2 text-small">OTHER BUSINESSES - {{ othersClone.length }}</p>

          <b-form class="mb-2">
            <b-form-input size="sm" class="py-1" type="search" placeholder="Search">
            </b-form-input>
          </b-form>
          <p v-for="(biz, index) in othersClone" :key="index"
            class="text-small mb-2  ptr text-semi-muted"
          >
            {{ biz.name }}
          </p>
          <hr class="mb-2" />
          <p class="mb-2 ptr text-small text-semi-muted ">Add Business</p>
          <hr class="my-2" />
          <p class="mb-2 ptr text-small text-semi-muted">Signout</p>
        </div>
      </div>
    </div>

      <div class="mt-5 px-2">

        <vue-perfect-scrollbar
          class="scroll"
          :settings="{ suppressScrollX: true, wheelPropagation: false }"
        >
          <ul class="list-unstyled">
              <!-- :class="{ 'active' : (selectedParentMenu === item.id && viewingParentMenu === '') || viewingParentMenu === item.id }" -->
            <li
              v-for="(item,index) in menuItems"
              :key="`parent_${index}`"
              :data-flag="item.id"
              class="my-2 "

            >

              <i :class="`${item.icon} mr-2 medCon`"/>
              <span class="">{{ item.label }}</span>
              <!--<a v-if="item.newWindow" :href="item.to" rel="noopener noreferrer" target="_blank">
                <i :class="item.icon" />
                {{ $t(item.label) }}
              </a>
              <a
                v-else-if="item.subs && item.subs.length>0"
                @click.prevent="openSubMenu($event,item)"
                :href="`#${item.to}`"
              >
                <i :class="item.icon" />
                {{ $t(item.label) }}
              </a>
              <router-link
                v-else
                @click.native="changeSelectedParentHasNoSubmenu(item.id)"
                :to="item.to"
              >
                <i :class="item.icon" />
                {{ $t(item.label) }}
              </router-link> -->
            </li>
          </ul>
        </vue-perfect-scrollbar>
       </div>
    </div>

</template>

<script>
import menuItems from "../../constants/menu";

export default {

  data: ()=>({
    menuItems: menuItems,
    currentBusiness:null,
    currentBusinessDetails:"",
    otherBusinesses: null,
    othersClone: null,
    noBiz: false,
    bizShow: false,

  }),

  computed:{
    lb(){
      return this.$store.getters.currentBiz;

    },
    businesses(){
      let user = this.$store.getters.user;
      if(user && user.businesses && user.businesses.length > 0){
        let CB;
        if(this.lb){
          this.currentBusiness = user.businesses.find(d=> d.id == this.lb)?
          user.businesses.find(d=> d.id == this.lb):
          user.businesses[0];
          this.otherBusinesses = user.businesses.filter(d=>d.id != this.currentBusiness.id);

        }else{
          this.currentBusiness= user.businesses[0];
          this.otherBusinesses = user.businesses.filter(d=>d.id != this.currentBusiness.id);
          this.othersClone = [...this.otherBusinesses];
        }
      }else{
        this.noBiz = true;
      }
      return true;
    },

  },

  methods:{

    changeBusiness(id, name) {
     this.currentBusiness = name
    //  })
     this.$store.dispatch(BUSINESSDETAILS,id);

    //  console.log(this.currentBusinessDetails);
    },

    shortener(val){
      return !val? " " :val.length > 15? val.slice(0,18)+"...": val
    }

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
  font-size: 1.2em;
}

.medExt{
  font-size: 1.2em !important;
}
</style>
