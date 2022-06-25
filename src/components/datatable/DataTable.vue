<template>
  <div class="bg-white py-4 px-4 flex flex-col items-start justify-start gap-4">
    <div
      class="flex flex-col items-start justify-start gap-4 w-full lg:flex-row lg:items-center"
    >
      <n-input
        v-model:value="searchValue"
        placeholder="Search"
        clearable
        @input="search"
        :loading="searchLoading"
      />
      <slot name="filterParameters"> </slot>
      <button class="px-4 py-1 bg-gray-300" @click="resetClicked">Reset</button>
    </div>
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
import { ref, watch } from "vue";
const props = defineProps({
  columns: { type: Array },
  data: { type: Array },
  tableLoading: { type: Boolean },
  resetStatus: { type: Boolean },
});
const emit = defineEmits(["search", "resetClicked"]);
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
const resetClicked = () => {
  emit("resetClicked");
};

const test = watch(
  () => props.resetStatus,
  (resetStatus) => {
    if (resetStatus) {
      searchValue.value = null;
    }
  }
);
</script>
