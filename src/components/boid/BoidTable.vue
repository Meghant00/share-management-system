<template>
  <data-table :columns="columns" :data="data" />
</template>
<script>
import { defineComponent } from "vue";
import DataTable from "@/components/datatable/DataTable.vue";
const createColumns = () => {
  return [
    {
      key: "sn",
      title: "S.N",
      defaultSortOrder: false,
      sorter: "default",
    },
    {
      key: "boid",
      title: "Boid",
      defaultSortOrder: false,
      sorter: "default",
    },
  ];
};
export default defineComponent({
  setup() {
    const data = [
      { sn: 1, boid: 3208 },
      { sn: 2, boid: 52818 },
      { sn: 3, boid: 15658 },
    ];
    return { columns: createColumns(), data };
  },
  components: { DataTable },
});
</script>
