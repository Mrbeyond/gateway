<template>
  <b-row>
    <b-colxx>
      <b-card header-tag="header" header-class="pb-0">
        <template #header>
          <div  class="d-flex justify-content-between mt-2">
            <h6 class="mb-0">Notification URLs</h6>
            <div v-if="apiKeys.notification_urls && apiKeys.notification_urls.length < 1">
              <b-button @click="urlEdit"  size="sm" class="py-1">
                Add
              </b-button>
            </div>
          </div>
        </template>
        <div v-if="apiKeys" >
          <div v-if="apiKeys.notification_urls && apiKeys.notification_urls.length < 1"
            class="text-center"
          >
            <i class="iconsminds-folder-delete text-large"  />
            <p>No notification Url</p>
          </div>
          <b-table v-else responsive :items="apiKeys.notification_urls" :fields="fields">
            <template #cell(actions)="row">
              <b-button @click="previewKey(row)" size="sm" class="py-1 px-2">
                View
              </b-button>
            </template>
          </b-table>
        </div>
      </b-card>
      <b-modal
        id="_url_keys"
        ref="_url_keys"
        title="Notification URL"
        modal-class="modal-right"
      >
        <div v-if="modalType == 'View'">
          <b-card v-if="selectedKey">
            <div>
                <div class="text-right">
                  <b-button @click="urlEdit" >
                    Edit
                  </b-button>
                </div>
                <p class="text-small text-muted mb-2"> Url</p>
                <p class="mb-2">{{ selectedKey.url }}</p>
                <p class="text-small text-muted mb-2">Type</p>
                <p class="mb-2">{{ selectedKey.type }}</p>
                <p class="text-small text-muted mb-2">Domain</p>
                <p class="mb-2">{{ selectedKey.domain }}</p>
                <p class="text-small text-muted mb-2">Secret</p>
                <p class="mb-2">{{ selectedKey.secret }}</p>
                <p class="text-small text-muted mb-2">Status</p>
                <p class="mb-2">{{ Boolean(selectedKey.status)? "Active": Inactive }}</p>
                <p class="text-small text-muted mb-2">Created On</p>
                <p class="mb-2">{{ timest(selectedKey.createdAt) }}</p>
            </div>
          </b-card>
        </div>
        <div v-if="modalType == '_add'">
          <update-noti-url  @close="hideModal"
            :noti_url="selectedKey"
          />

        </div>

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
import { mapGetters } from 'vuex'
import { LUX_ZONE } from '../../../../constants/formKey';
import UpdateNotiUrl from '../AdderForms/UpdateNotiUrl.vue';
export default {
  components: { UpdateNotiUrl },
  data: ()=>({
    selectedKey: null,
    modalType: '',
    adding: false,

    fields: [
      {
        key: 'url',
        label:"Url",
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
    ...mapGetters(['apiKeys'])
  },

  methods: {
    hideModal() {
      this.selectedKey = null;
      this.$refs["_url_keys"].hide();
    },

    showModal(){
      this.$refs["_url_keys"].show();
    },

    previewKey(val){
      this.selectedKey = val.item;
      this.modalType = "View";
      this.showModal();
      // console.log(val);
    },

    urlEdit(){
      this.modalType = "_add";
      this.showModal();
    },

    timest(val){
      return LUX_ZONE(val);
    },


  },
}
</script>
