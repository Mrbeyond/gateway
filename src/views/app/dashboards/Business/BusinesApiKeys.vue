<template>
  <b-row>
    <b-colxx>
      <b-card header-tag="header" >
        <template #header>
          <div  class="d-flex justify-content-between mt-2">
            <h6 class="mb-0">API Keys</h6>
            <div >
              <b-button @click="generateNew"  size="sm" class="py-1">
                <b-spinner v-if="generating"  small />
                <span v-else>Generate New</span>
              </b-button>
            </div>
          </div>
        </template>
        <div >
          <b-table v-if="apiKeys" responsive :items="apiKeys.api_keys" :fields="fields">
            <template #cell(actions)="row">
              <b-button @click="previewKey(row)" size="sm" class="py-1 px-2">
                View
              </b-button>
            </template>
          </b-table>
        </div>
      </b-card>

      <b-modal
        id="_api_keys"
        ref="_api_keys"
        title="API Key Details"
        modal-class="modal-right"
      >
        <b-card v-if="selectedKey">
          <div>
              <p class="text-small text-muted mb-2"> Key</p>
              <p class="mb-2">
                <input class="border-0 px-1" id="key_input" readonly :value="selectedKey.key" />
                  <i style="cursor: pointer"
                    @click="copyKey"
                    class="text-right  iconsminds-file-copy text-primary"
                   />
                </p>
              <p class="text-small text-muted mb-2">Type</p>
              <p class="mb-2">{{ selectedKey.type }}</p>
              <p class="text-small text-muted mb-2">Domain</p>
              <p class="mb-2">{{ selectedKey.domain }}</p>
              <p class="text-small text-muted mb-2">Status</p>
              <p class="mb-2">{{ Boolean(selectedKey.status)? "Active": Inactive }}</p>
              <p class="text-small text-muted mb-2">Created On</p>
              <p class="mb-2">{{ timest(selectedKey.createdAt) }}</p>
          </div>
        </b-card>

        <template slot="modal-footer">
          <b-button
            variant="outline-secondary"
            @click="hideModal"
          >{{ $t('pages.cancel') }}</b-button>
        </template>
    </b-modal>

    </b-colxx>
  </b-row>
</template>
<script>
import Axios from 'axios';
import { mapGetters } from 'vuex'
import { BUSINESSES, hToken, LUX_ZONE } from '../../../../constants/formKey';
import { PROXY } from '../../../../constants/config';
export default {
  data: ()=>({

    selectedKey: null,
    generating: false,

    fields: [
      {
        key: 'key',
        label:"key",
        sortable: true,
        formatter:(val)=>{
          return val.slice(0,15)+"..."
        }
      },
      {
        key: 'type',
        label:"Type",
        sortable: true
      },
      {
        key: 'status',
        labels:"Status",
        sortable: true,
        formatter: (val)=>{
          return Boolean(val)? 'Active': 'Inactive';
        }
      },
      {
        key: 'actions',
        labels:"Details",
      },
    ],
  }),

  computed:{
    ...mapGetters(['apiKeys', 'momentBiz'])
  },

  methods: {
    hideModal() {
      this.$refs["_api_keys"].hide();
    },

    copyKey(){
      let copyText = document.getElementById('key_input')
      copyText.select();
      document.execCommand("copy");
    },

    showModal(){
      this.$refs["_api_keys"].show();
    },

    previewKey(val){
      this.selectedKey = val.item;
      this.showModal();
      console.log(val);
    },

    timest(val){
      return LUX_ZONE(val);
    },

    generateNew(){
      if(this.generating)return;
      this.generating = true;
      let val = "Something went wrong";
      Axios.post(`${PROXY}business/${this.momentBiz}/key/true`, {}, {headers: hToken()})
      .then(res=>{
        if(!res.data.error){
          val = res.data.message
          this.$store.dispatch(BUSINESSES);
          this.$notify("success", "Success message", val, {
            duration: 3000,
            permanent: false
          });
        }else{
          this.$notify("error", "Error message", val, {
          duration: 3000,
          permanent: false
        });
        }
        this.generating = false;
      })
      .catch(err=>{
        if(err.response){
          val = err.response.data.message;
        }
        this.$notify("error", "Error message", val, {
          duration: 3000,
          permanent: false
        });
        this.generating = false;
      })
    }
  },

  watch:{
    apiKeys(val){
      console.log(val);
    }
  },

  created() {
    console.log(this.apiKeys);
  },
}
</script>
