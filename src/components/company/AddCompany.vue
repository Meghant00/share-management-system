<template>
  <n-card class="w-full md:w-1/2 lg:w-1/4" closable @close="close">
    <div class="flex flex-col items-start justify-start gap-8">
      <h3 class="text-2xl">Add New Boid</h3>
      <n-form
        :model="companyForm"
        ref="companyFormRef"
        :rules="rules"
        class="flex flex-col items-start justify-start gap-4 w-full"
      >
        <n-form-item
          path="companyData.boid"
          label="Company Name"
          class="w-full"
        >
          <n-input
            v-model:value="companyForm.companyData.companyName"
            placeholder="Enter Company Name"
          />
        </n-form-item>
        <primary-button @click="addClicked" class="!px-8">Add</primary-button>
      </n-form>
    </div>
  </n-card>
</template>
<script setup>
import { ref } from "vue";
import { NCard, NForm, NInput, NFormItem } from "naive-ui";
import PrimaryButton from "@/components/misc/PrimaryButton.vue";

const emit = defineEmits(["close", "addClicked"]);
const close = () => {
  emit("close");
};
const companyFormRef = ref(null);
const companyForm = ref({
  companyData: {
    companyName: null,
  },
});

const rules = {
  companyData: {
    companyName: {
      required: true,
      message: "Please Enter Company Name",
      trigger: "blur",
    },
  },
};

const addClicked = () => {
  companyFormRef.value
    .validate((errors) => {
      if (!errors) {
        emit("addClicked", companyForm.value.companyData.companyName);
      }
    })
    .catch(() => {});
};
</script>
