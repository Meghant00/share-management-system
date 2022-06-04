<template>
  <n-data-table
    :columns="columns"
    :data="data"
    size="large"
    :bordered="true"
    :pagination="pagination"
    striped
  />
</template>
<script>
import { defineComponent } from "vue";
import { NDataTable } from "naive-ui";
import { dataPerPage } from "@/utils/pageSize";
export default defineComponent({
  setup() {
    const pagination = { pageSize: dataPerPage };
    return { pagination };
  },
  components: { NDataTable },
  props: { columns: { type: Array }, data: { type: Array } },
});
</script>
