<template>
  <page-heading pageName="Company" />
  <div class="py-4">
    <company-table />
  </div>
</template>
<script>
import { defineComponent } from "vue";
import PageHeading from "@/components/misc/PageHeading.vue";
import CompanyTable from "@/components/company/CompanyTable.vue";

export default defineComponent({ components: { PageHeading, CompanyTable } });
</script>
