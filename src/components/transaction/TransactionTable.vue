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
  <n-modal v-model:show="showDeleteModal">
    <yes-no-popup
      @close="showDeleteModal = false"
      @yesClicked="deleteTransaction"
    >
      Do you want to delete this Transaction?
    </yes-no-popup>
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
  deleteTransactionService,
} from "@/services/transaction/TransactionServices.js";
import { NModal, useMessage } from "naive-ui";
import AddTransaction from "./AddTransaction.vue";
import EditTransaction from "./EditTransaction.vue";
import YesNoPopup from "@/components/misc/YesNoPopup.vue";
export default defineComponent({
  name: "TransactionTable",
  components: {
    NModal,
    PrimaryButton,
    DataTable,
    AddTransaction,
    EditTransaction,
    YesNoPopup,
  },
  setup() {
    const createColumns = () => {
      return [
        {
          key: "sn",
          title: "S.N",
          width: 100,
          sorter: "default",
        },
        {
          key: "boid",
          title: "Boid",
          width: 100,
          sorter: "default",
        },
        {
          key: "company",
          title: "Company",
          width: 110,
          sorter: "default",
        },
        {
          key: "transactionDate",
          title: "Transaction Date",
          width: 170,
          sorter: "default",
        },
        {
          key: "type",
          title: "Type",
          width: 100,
        },
        {
          key: "noOfShare",
          title: "Number Of Share",
          width: 170,
          sorter: "default",
        },
        {
          key: "totalCostWacc",
          title: "Total Cost",
          width: 100,
        },
        {
          key: "wacc",
          title: "WACC",
          width: 100,
        },
        {
          key: "totalCost",
          title: "Total Cost",
          width: 100,
        },
        {
          key: "wac",
          title: "WAC",
          width: 100,
        },
        {
          key: "remarks",
          title: "Remarks",
          width: 100,
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
          width: 100,
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
        currentTransaction.value = null;

        await mapTransactions();
      } catch (error) {
        message.error("Transaction Not Edited");
        showEditModal.value = false;
      }
    };

    const showDeleteModal = ref(false);
    const deleteClicked = (row) => {
      currentTransaction.value = row;
      showDeleteModal.value = true;
    };

    const deleteTransaction = async () => {
      try {
        const res = await deleteTransactionService(currentTransaction.value.id);

        filteredData.value = data.value.filter(
          (transaction) => transaction.id !== currentTransaction.value.id
        );

        message.success("Transaction Deleted Successfully");

        showDeleteModal.value = false;

        currentTransaction.value = null;
      } catch (error) {
        console.log(error);
        message.error("Transaction Not Deleted");
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
      showDeleteModal,
      deleteTransaction,
    };
  },
});
</script>
