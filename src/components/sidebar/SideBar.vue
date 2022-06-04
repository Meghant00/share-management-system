<template>
  <div class="w-full h-full py-4 bg-[#18181c]">
    <n-menu :options="menuOptions" :theme="darkTheme" class="text-base" />
  </div>
</template>
<script>
import { defineComponent, h } from "vue";
import { NMenu, darkTheme } from "naive-ui";
import { RouterLink } from "vue-router";
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
    label: "Company",
    key: "company",
  },
];
export default defineComponent({
  setup() {
    return { menuOptions, darkTheme };
  },
  components: { NMenu },
});
</script>
