<template>
  <button
    class="px-4 py-2 flex flex-row items-center justify-center rounded-sm text-white transtion-all duration-300 ease-linear font-medium"
    :class="{
      'bg-green-600 hover:bg-green-700': theme === 'green',
      'bg-blue-600 hover:bg-blue-700': theme === 'blue',
      'bg-red-600 hover:bg-red-700': theme === 'red',
    }"
  >
    <slot> </slot>
  </button>
</template>
<script>
import { defineComponent } from "vue";

export default defineComponent({
  setup() {},
  name: "PrimaryButton",
  props: { theme: { type: String, default: "blue" } },
});
</script>
