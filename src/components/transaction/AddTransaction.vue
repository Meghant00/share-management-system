<template>
  <n-card class="w-full lg:w-1/2" closable @close="close">
    <n-form ref="transactionFormRef" :rules="rules" :model="transactionForm">
      <n-form-item label="Boid" path="transactionData.boid.boid">
        <n-select
          placeholder="Select Boid"
          :options="boidOptions"
          filterable
          clearable
          v-model:value="transactionForm.transactionData.boid.boid"
        />
      </n-form-item>
      <n-form-item label="Company" path="transactionData.company.companyName">
        <n-select
          placeholder="Select Company"
          :options="companyOptions"
          filterable
          clearable
          v-model:value="transactionForm.transactionData.company.companyName"
        />
      </n-form-item>
      <n-form-item
        label="Transaction Date"
        path="transactionData.transactionDate"
        class="w-full"
      >
        <n-date-picker
          placeholder="Transaction Date"
          clearable
          v-model:value="transactionForm.transactionData.transactionDate"
          class="w-full"
        />
      </n-form-item>
      <n-form-item label="Number of Share" path="transactionData.noOfShare">
        <n-input
          placeholder="Number of Share"
          clearable
          v-model:value="transactionForm.transactionData.noOfShare"
        />
      </n-form-item>
      <div class="flex flex-col gap-4 md:flex-row md:justify-between">
        <div class="w-full">
          <span class="pl-0.5">For WACC</span>
          <n-form-item
            label="Type of Share"
            path="transactionData.type"
            class="pt-2"
          >
            <n-select
              placeholder="Select Share Type"
              :options="shareTypeOptions"
              filterable
              clearable
              v-model:value="transactionForm.transactionData.type"
            />
          </n-form-item>
          <n-form-item
            label="Purchased Price"
            path="transactionData.weightedPurchasedPrice"
          >
            <n-input
              placeholder="Purchased Price"
              clearable
              v-model:value="
                transactionForm.transactionData.weightedPurchasedPrice
              "
            />
          </n-form-item>
        </div>
        <div class="w-full">
          <span class="pl-0.5">For WAC</span>
          <n-form-item
            label="Type of Share"
            path="transactionData.remarks"
            class="pt-2"
          >
            <n-select
              placeholder="Select Share Type"
              :options="shareTypeOptions"
              filterable
              clearable
              v-model:value="transactionForm.transactionData.remarks"
            />
          </n-form-item>
          <n-form-item
            label="Purchased Price"
            path="transactionData.purchasedPrice"
          >
            <n-input
              placeholder="Purchased Price"
              clearable
              v-model:value="transactionForm.transactionData.purchasedPrice"
            />
          </n-form-item>
        </div>
      </div>
      <primary-button @click="addClicked">Add Transaction</primary-button>
    </n-form>
  </n-card>
</template>
<script>
import { defineComponent, onMounted, ref } from "vue";
import {
  NCard,
  NForm,
  NFormItem,
  NInput,
  NSelect,
  NDatePicker,
} from "naive-ui";
import PrimaryButton from "@/components/misc/PrimaryButton.vue";
import { getAllBoid } from "@/services/boid/BoidServices";
import { getAllCompany } from "@/services/company/CompanyServices";
import { getShareTypes } from "@/services/transaction/TransactionServices";
export default defineComponent({
  name: "AddTransaction",
  components: {
    NCard,
    NForm,
    NFormItem,
    NInput,
    NSelect,
    NDatePicker,
    PrimaryButton,
  },
  emits: ["close", "addClicked"],
  setup(props, { emit }) {
    const boidOptions = ref([]);
    const companyOptions = ref([]);
    const shareTypeOptions = ref([]);
    const transactionFormRef = ref(null);

    const transactionForm = ref({
      transactionData: {
        boid: { boid: null },
        company: { companyName: null },
        transactionDate: null,
        noOfShare: null,
        purchasedPrice: null,
        weightedPurchasedPrice: null,
        type: null,
        remarks: null,
      },
    });

    const rules = {
      transactionData: {
        company: {
          companyName: {
            required: true,
            message: "Company is required",
            trigger: "blur",
          },
        },
        noOfShare: {
          required: true,
          message: "Number of Share is required",
          trigger: "blur",
        },
        purchasedPrice: {
          required: true,
          message: "Purchased Price is required",
          trigger: "blur",
        },
        weightedPurchasedPrice: {
          required: true,
          message: "Purchased Price is required",
          trigger: "blur",
        },
        type: {
          required: true,
          message: "Type is required",
          trigger: "blur",
        },
        remarks: {
          required: true,
          message: "Type is required",
          trigger: "blur",
        },
      },
    };

    onMounted(async () => {
      await mapBoid();
      await mapCompany();
      await mapShareTypes();
    });

    const mapBoid = async () => {
      const res = await getAllBoid();

      res.map((boid) => {
        boidOptions.value.push({
          label: boid.boid,
          value: boid.boid,
        });
      });
    };

    const mapCompany = async () => {
      const res = await getAllCompany();
      res.map((company) => {
        companyOptions.value.push({
          label: company.companyName,
          value: company.companyName,
        });
      });
    };
    const mapShareTypes = async () => {
      const res = await getShareTypes();
      res.map((shareType) => {
        shareTypeOptions.value.push({ label: shareType, value: shareType });
      });
    };

    const close = () => {
      emit("close");
    };

    const addClicked = () => {
      transactionFormRef.value
        .validate((error) => {
          if (!error) {
            const tempTransaction = transactionForm.value.transactionData;

            tempTransaction.transactionDate = new Date(
              tempTransaction.transactionDate
            );
            tempTransaction.purchasedPrice = Number(
              tempTransaction.purchasedPrice
            );
            tempTransaction.weightedPurchasedPrice = Number(
              tempTransaction.weightedPurchasedPrice
            );

            emit("addClicked", tempTransaction);
          }
        })
        .catch();
    };

    return {
      boidOptions,
      companyOptions,
      shareTypeOptions,
      transactionFormRef,
      transactionForm,
      rules,
      close,
      addClicked,
    };
  },
});
</script>
