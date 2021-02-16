<template>
  <div class="main-menu">

    <div class="px-1">
      <b-dropdown
        id="langddm"
        variant="light"
        size="sm"
        toggle-class="language-button"
        block
        class="border-0 w-100"
      >
        <template slot="button-content">
          <span class="name">hghghg{{currentBusiness}}</span>
        </template>

        <b-dropdown-item class="w-100"
          v-for="(l,index) in businesses.businesses"
          :key="index"
          @click="changeBusiness(l.id, l.name)"
        >{{l.name}}</b-dropdown-item>
      </b-dropdown>
    </div>


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
          >

            {{ item.label }}
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

</template>

<script>
import menuItems from "../../constants/menu";

export default {

  data: ()=>({
    menuItems: menuItems,
    currentBusiness:"",
    currentBusinessDetails:"",

  }),

  computed:{
    businesses(){
      console.log(this.$store.getters.user);
      return this.$store.getters.user;
    },

  },

  methods:{

    changeBusiness(id, name) {
     this.currentBusiness = name
    //  })
     this.$store.dispatch(BUSINESSDETAILS,id);

     console.log(this.currentBusinessDetails);
    },

  },

}
</script>
