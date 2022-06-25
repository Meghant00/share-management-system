<template>
  <page-heading pageName="Transaction" />
  <transaction-table />
</template>
<script>
import { defineComponent } from "vue";
import PageHeading from "@/components/misc/PageHeading.vue";
import TransactionTable from "@/components/transaction/TransactionTable.vue";
export default defineComponent({
  name: "Transaction",
  components: { PageHeading, TransactionTable },
  setup() {
    return {};
  },
});
</script>
