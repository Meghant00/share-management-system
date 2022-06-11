<template>
  <n-card class="w-full md:w-1/2 lg:w-1/4" closable @close="close">
    <div class="flex flex-col items-start justify-start gap-8">
      <h3 class="text-2xl">Edit Boid</h3>
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
        <primary-button @click="updateClicked" class="!px-8"
          >Update</primary-button
        >
      </n-form>
    </div>
  </n-card>
</template>
<script setup>
import { ref } from "vue";
import { NCard, NForm, NInput, NFormItem } from "naive-ui";
import PrimaryButton from "@/components/misc/PrimaryButton.vue";
const props = defineProps({ data: Object });
const emit = defineEmits(["close", "updateClicked"]);
const close = () => {
  emit("close");
};
const boidFormRef = ref(null);
const boidForm = ref({
  boidData: {
    boid: props.data.boid.toString(),
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

const updateClicked = () => {
  boidFormRef.value
    .validate((errors) => {
      if (!errors) {
        emit("updateClicked", boidForm.value.boidData.boid);
      }
    })
    .catch(() => {});
};
</script>
