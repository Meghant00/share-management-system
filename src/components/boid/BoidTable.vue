<template>
  <data-table :columns="columns" :data="data" />
</template>
<script>
import { defineComponent, ref } from "vue";
import DataTable from "@/components/datatable/DataTable.vue";
import { getAllBoid } from "@/services/boid/BoidServices";

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
    const data = ref([]);
    return { columns: createColumns(), data };
  },
  components: { DataTable },
  async mounted() {
    const res = await getAllBoid();
    let sn = 1;
    res.map((boid) => {
      this.data.push({ sn: sn, boid: boid.boid, id: boid.id });
      sn++;
    });
  },
});
</script>
