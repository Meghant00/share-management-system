<template>
  <div class="bg-white py-4 px-4 flex flex-col items-start justify-start gap-4">
    <n-input
      v-model:value="searchValue"
      placeholder="Search"
      clearable
      @input="search"
      :loading="searchLoading"
    />
    <n-data-table
      :columns="columns"
      :data="data"
      size="large"
      :bordered="false"
      :pagination="pagination"
      :loading="tableLoading"
      striped
    />
  </div>
</template>
<script setup>
import { NDataTable, NInput } from "naive-ui";
import { dataPerPage } from "@/utils/pageSize";
import { ref } from "vue";
const props = defineProps({
  columns: { type: Array },
  data: { type: Array },
  tableLoading: { type: Boolean },
});
const emit = defineEmits(["search"]);
const searchValue = ref(null);
const pagination = { pageSize: dataPerPage };

const debounce = ref(null);

const searchLoading = ref(false);

const search = (searchValue) => {
  searchLoading.value = true;
  clearTimeout(debounce.value);
  debounce.value = setTimeout(() => {
    searchLoading.value = false;
    emit("search", searchValue);
  }, 300);
};
</script>
