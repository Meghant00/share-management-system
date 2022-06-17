<template>
  <n-card class="w-full md:w-1/2 lg:w-1/4" closable @close="close">
    <div class="flex flex-col items-start justify-start gap-8">
      <h3 class="text-lg"><slot></slot></h3>

      <div class="flex flex-row items-center justify-end gap-8 w-full">
        <primary-button @click="yesClicked" class="!px-8" theme="green"
          >Yes</primary-button
        >
        <primary-button @click="close" class="!px-8" theme="red"
          >No</primary-button
        >
      </div>
    </div>
  </n-card>
</template>
<script setup>
import { NCard } from "naive-ui";
import PrimaryButton from "@/components/misc/PrimaryButton.vue";

const emit = defineEmits(["close", "noClicked", "yesClicked"]);
const close = () => {
  emit("close");
};

const yesClicked = () => {
  emit("yesClicked");
};
</script>
