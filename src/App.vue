<template>
  <div class="flex flex-row items-start justify-start gap-4">
    <div class="w-[15%] h-screen overflow-hidden">
      <side-bar />
    </div>
    <div class="w-[85%] px-4 py-8">
      <router-view />
    </div>
  </div>
</template>

<script>
import SideBar from "@/components/sidebar/SideBar.vue";
import { defineComponent } from "vue";
export default defineComponent({
  setup() {},
  components: { SideBar },
});
</script>
