<template>
  <n-message-provider>
    <div class="flex flex-row items-start justify-start">
      <div class="w-[15%] h-screen overflow-hidden">
        <side-bar />
      </div>
      <div class="w-[85%] px-4 py-8 bg-gray-200 lg:min-h-screen">
        <router-view />
      </div>
    </div>
  </n-message-provider>
</template>

<script>
import SideBar from "@/components/sidebar/SideBar.vue";
import { defineComponent } from "vue";
import { NMessageProvider } from "naive-ui";
export default defineComponent({
  setup() {},
  components: { SideBar, NMessageProvider },
});
</script>
