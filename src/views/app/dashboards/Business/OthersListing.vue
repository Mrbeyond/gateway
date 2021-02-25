<template>
  <div>
    <b-card v-if="others" class="mb-4" title="BUSINESS">
      <b-table responsive :items="others" :fields="fields">
        <template #cell(actions)="row">
          <router-link :to="`/dashbord/business/${row.item.id}`">
            <b-button size="sm" class="mr-1 bg-primary">
              View
            </b-button>
          </router-link>
        </template>
      </b-table>
    </b-card>
  </div>
</template>
<script>
export default {
  props: ['others'],
  data: ()=>({
    fields: [
      {
        key: 'name',
        label:"Name",
        sortable: true
      },
      {
        key: 'city',
        labels:"City",
        sortable: true
      },
      {
        key: 'address',
        label: 'Adress',
        sortable: true,
      },
      {
        key: 'phone',
        label: 'Phone',
        sortable: true,
      },
      {
        key: 'actions',
        label: 'Actions'
      }
    ],
  }),


}
</script>
