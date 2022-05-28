<template>
  <div class="w-full h-full border-r border-gray-300 py-4">
    <n-menu :options="menuOptions" class="text-base" />
  </div>
</template>
<script>
import { defineComponent } from "vue";
import { NMenu } from "naive-ui";
const menuOptions = [
  {
    label: "Dashboard",
    key: "dashboard",
  },
  {
    label: "Boid",
    key: "boid",
  },
  {
    label: "Company",
    key: "company",
  },
];
export default defineComponent({
  setup() {
    return { menuOptions };
  },
  components: { NMenu },
});
</script>
