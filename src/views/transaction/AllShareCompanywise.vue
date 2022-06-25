<template>
  <page-heading pageName="All Share Companywise" />
  <all-share-companywise-table />
</template>
<script>
import { defineComponent } from "vue";
import PageHeading from "@/components/misc/PageHeading.vue";
import AllShareCompanywiseTable from "@/components/allshare/AllShareCompanywiseTable.vue";
export default defineComponent({
  name: "AllShareCompanywise",
  components: { PageHeading, AllShareCompanywiseTable },
});
</script>
