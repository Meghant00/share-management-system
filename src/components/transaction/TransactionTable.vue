<template>
  <div class="flex flex-row items-center justify-end py-4">
    <primary-button @click="showAddModal = true">
      Add New Transaction
    </primary-button>
  </div>
  <data-table :columns="columns" :data="filteredData" />
  <n-modal v-model:show="showAddModal">
    <add-transaction @close="showAddModal = false" @addClicked="addClicked" />
  </n-modal>
  <n-modal v-model:show="showEditModal">
    <edit-transaction
      :data="currentTransaction"
      @close="showEditModal = false"
      @editClicked="updateTransaction"
    />
  </n-modal>
</template>
<script>
import { defineComponent, h, onMounted, ref } from "vue";
import PrimaryButton from "@/components/misc/PrimaryButton.vue";
import DataTable from "@/components/datatable/DataTable.vue";
import DataTableActions from "@/components/misc/DataTableActions.vue";
import {
  getAllTransactions,
  addTransaction,
  updateTransactionService,
} from "@/services/transaction/TransactionServices.js";
import { NModal, useMessage } from "naive-ui";
import AddTransaction from "./AddTransaction.vue";
import EditTransaction from "./EditTransaction.vue";
export default defineComponent({
  name: "TransactionTable",
  components: {
    NModal,
    PrimaryButton,
    DataTable,
    AddTransaction,
    EditTransaction,
  },
  setup() {
    const createColumns = () => {
      return [
        {
          key: "sn",
          title: "S.N",
        },
        {
          key: "boid",
          title: "Boid",
        },
        {
          key: "company",
          title: "Company",
        },
        {
          key: "transactionDate",
          title: "Transaction Date",
        },
        {
          key: "type",
          title: "Type",
        },
        {
          key: "noOfShare",
          title: "Number Of Share",
        },
        {
          key: "totalCostWacc",
          title: "Total Cost",
        },
        {
          key: "wacc",
          title: "WACC",
        },
        {
          key: "totalCost",
          title: "Total Cost",
        },
        {
          key: "wac",
          title: "WAC",
        },
        {
          key: "remarks",
          title: "Remarks",
        },
        {
          key: "actions",
          title: "Actions",
          render(row) {
            return h(DataTableActions, {
              onDeleteClicked: () => {
                deleteClicked(row);
              },
              onEditClicked: () => {
                editClicked(row);
              },
            });
          },
        },
      ];
    };

    const data = ref([]);
    const filteredData = ref([]);

    const mapTransactions = async () => {
      data.value = [];
      filteredData.value = [];
      let sn = 1;
      const res = await getAllTransactions();

      res.map((transaction) => {
        const tempData = {
          id: transaction.id,
          sn: sn,
          boid: transaction.boid.boid,
          company: transaction.company.companyName,
          transactionDate: transaction.transactionDate,
          noOfShare: transaction.noOfShare,
          type: transaction.type,
          remarks: transaction.remarks,
          purchasedPrice: transaction.purchasedPrice,
          weightedPurchasedPrice: transaction.weightedPurchasedPrice,
          investment: transaction.investment,
          totalCost: transaction.investment,
          totalCostWacc: transaction.cgt,
          wacc: transaction.averageCgt,
          wac: transaction.averageInvestment,
        };
        data.value.push(tempData);
        sn++;
      });
      filteredData.value = data.value;
    };

    onMounted(async () => {
      await mapTransactions();
    });

    const columns = createColumns();

    const showAddModal = ref(false);

    const message = useMessage();

    const addClicked = async (transactionData) => {
      try {
        const res = await addTransaction(transactionData);
        message.success("Transaction Added Successfully");
        showAddModal.value = false;
        await mapTransactions();
      } catch {
        message.error("Transaction Not Added");
      }
    };

    const showEditModal = ref(false);
    const currentTransaction = ref(null);

    const editClicked = (row) => {
      currentTransaction.value = row;

      showEditModal.value = true;

      currentTransaction.value.noOfShare =
        currentTransaction.value.noOfShare.toString();
      currentTransaction.value.purchasedPrice =
        currentTransaction.value.purchasedPrice.toString();
      currentTransaction.value.weightedPurchasedPrice =
        currentTransaction.value.weightedPurchasedPrice.toString();
    };

    const updateTransaction = async (transaction) => {
      try {
        const res = await updateTransactionService(transaction);

        message.success("Transaction Edited Successfully");
        showEditModal.value = false;
        await mapTransactions();
      } catch (error) {
        console.log(error);
        message.error("Transaction Not Edited");
        showEditModal.value = false;
      }
    };

    return {
      columns,
      filteredData,
      showAddModal,
      addClicked,
      message,
      showEditModal,
      currentTransaction,
      updateTransaction,
    };
  },
});
</script>
