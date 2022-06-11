<template>
  <n-card class="w-full md:w-1/2 lg:w-1/4" closable @close="close">
    <div class="flex flex-col items-start justify-start gap-8">
      <h3 class="text-2xl">Add New Boid</h3>
      <n-form
        :model="boidForm"
        ref="boidFormRef"
        :rules="rules"
        class="flex flex-col items-start justify-start gap-4"
      >
        <n-form-item path="boidData.boid" label="Boid">
          <n-input
            v-model:value="boidForm.boidData.boid"
            placeholder="Enter Boid"
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
const boidFormRef = ref(null);
const boidForm = ref({
  boidData: {
    boid: null,
  },
});

const rules = {
  boidData: {
    boid: {
      required: true,
      message: "Please Enter Boid",
      trigger: "blur",
    },
  },
};

const addClicked = () => {
  boidFormRef.value
    .validate((errors) => {
      if (!errors) {
        emit("addClicked", boidForm.value.boidData.boid);
      }
    })
    .catch(() => {});
};
</script>
