<template>
  <h2 class="text-3xl text-gray-700">{{ pageName }}</h2>
</template>
<script>
import { defineComponent } from "vue";

export default defineComponent({
  setup() {},
  props: { pageName: { type: String } },
});
</script>
