<template>
  <page-heading pageName="Boid" />
  <div class="py-4">
    <boid-table />
  </div>
</template>
<script>
import { defineComponent } from "vue";
import PageHeading from "@/components/misc/PageHeading.vue";
import BoidTable from "@/components/boid/BoidTable.vue";

export default defineComponent({ components: { PageHeading, BoidTable } });
</script>
