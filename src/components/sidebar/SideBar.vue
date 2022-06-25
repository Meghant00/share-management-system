<template>
  <div class="w-full h-full py-4 bg-[#18181c]">
    <n-menu
      :value="activeKey"
      :options="menuOptions"
      :theme="darkTheme"
      class="text-base"
    />
  </div>
</template>
<script>
import { defineComponent, h, onMounted, onUpdated, ref } from "vue";
import { NMenu, darkTheme } from "naive-ui";
import { RouterLink, useRoute } from "vue-router";
import { computed } from "@vue/reactivity";
const menuOptions = [
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: "dashboard",
          },
        },
        { default: () => "Dashboard" }
      ),
    key: "dashboard",
  },
  {
    label: () =>
      h(RouterLink, { to: { name: "boid" } }, { default: () => "Boid" }),
    key: "boid",
  },
  {
    label: () =>
      h(RouterLink, { to: { name: "company" } }, { default: () => "Company" }),
    key: "company",
  },
  {
    label: () =>
      h(
        RouterLink,
        { to: { name: "transaction" } },
        { default: () => "Transaction" }
      ),
    key: "transaction",
  },
  {
    label: () =>
      h(
        RouterLink,
        { to: { name: "allsharecompanywise" } },
        { default: () => "All Share Companywise" }
      ),
    key: "allsharecompanywise",
  },
];
export default defineComponent({
  setup() {
    const route = useRoute();
    const activeKey = computed(() => {
      return route.name;
    });
    return { menuOptions, darkTheme, activeKey };
  },
  components: { NMenu },
});
</script>
