<template>
  <div class="main-menu">
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
    menuItems: menuItems
  }),

}
</script>
