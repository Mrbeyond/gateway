<template>
  <span>
    <b-nav class="pt-0 my-0 breadcrumb-container d-inline-block">
      <b-breadcrumb :items="items" />
    </b-nav>
    <div class="separator mt-0 mb-3"></div>
  </span>
</template>

<script>
import { adminRoot } from "../../constants/config";
export default {
  props: ["heading"],
  data() {
    return {
      items: []
    };
  },
  methods: {
    getUrl(path, sub, index) {
      return "/" + path.split(sub)[0] + sub;
      // alert(ret + " up ")
      //  let ret = return ret;
    },

    processShow(val){
       // alert(val + "2")
      this.items=[]
      let path = val;
      let rawPaths = path.split("/");
      for (var pName in this.$route.params) {
        if (rawPaths.includes(this.$route.params[pName])) {
          rawPaths = rawPaths.filter(x => x !== this.$route.params[pName]);
        }
      }
      // alert(rawPaths)
      rawPaths.map((sub, index) => {
        this.items.push({
          // alert(sub+ " sub")
          // this.items = [{
          text:
            "/" + sub !== adminRoot
              ? sub //this.$t("menu." + sub)
              : this.$t("menu.home"),
          to: this.getUrl(path, sub, index)
          });
        // }];
      });
    }
  },

  computed:{
    Path(){
      return this.$route.path.substr(1);
    }
  },
  watch: {
    Path(val){
      this.processShow(val);
    }
  },

  mounted(){
    this.processShow(this.Path);
  }

};
</script>
