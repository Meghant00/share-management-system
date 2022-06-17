<template>
  <div class="flex flex-row items-center justify-start gap-4">
    <button
      class="text-blue-600 transition ease-linear duration-100 hover:text-blue-700"
      @click="editClicked"
    >
      <Icon><Edit /></Icon>
    </button>
    <button
      class="text-red-600 transition ease-linear duration-100 hover:text-red-700"
      @click="deleteClicked"
    >
      <Icon><Trash /></Icon>
    </button>
  </div>
</template>
<script setup>
import { Icon } from "@vicons/utils";
import { Trash, Edit } from "@vicons/fa";

const emit = defineEmits(["deleteClicked", "editClicked"]);

const deleteClicked = () => {
  emit("deleteClicked");
};
const editClicked = () => {
  emit("editClicked");
};
</script>
