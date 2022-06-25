<template>
  <div class="flex flex-row items-center justify-end py-4">
    <primary-button @click="showAddModal = true">
      Add New Transaction
    </primary-button>
  </div>
  <data-table
    :columns="columns"
    :data="filteredData"
    :tableLoading="tableIsLoading"
    @search="searchFunction"
    @resetClicked="resetClicked"
  >
    <template #filterParameters>
      <n-select
        placeholder="Select Boid"
        :options="boidOptions"
        clearable
        filterable
        v-model:value="boid"
        @update:value="filterData"
      />
      <n-select
        placeholder="Select Company"
        :options="companyOptions"
        clearable
        filterable
        v-model:value="company"
        @update:value="filterData"
      />
      <n-select
        placeholder="Select Type"
        :options="typeOptions"
        clearable
        filterable
        v-model:value="type"
        @update:value="filterData"
      />
      <n-select
        placeholder="Select Remarks"
        :options="typeOptions"
        clearable
        filterable
        v-model:value="remarks"
        @update:value="filterData"
      />
    </template>
  </data-table>
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
import { NSelect } from "naive-ui";
import {
  getAllTransactions,
  addTransaction,
  updateTransactionService,
  deleteTransactionService,
  getShareTypes,
} from "@/services/transaction/TransactionServices.js";
import { NModal, useMessage } from "naive-ui";
import AddTransaction from "./AddTransaction.vue";
import EditTransaction from "./EditTransaction.vue";
import YesNoPopup from "@/components/misc/YesNoPopup.vue";
import { getAllBoid } from "@/services/boid/BoidServices";
import { getAllCompany } from "@/services/company/CompanyServices";
export default defineComponent({
  name: "TransactionTable",
  components: {
    NModal,
    NSelect,
    PrimaryButton,
    DataTable,
    AddTransaction,
    EditTransaction,
    YesNoPopup,
  },
  setup() {
    const tableIsLoading = ref(true);
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
      tableIsLoading.value = false;
    };

    const boidOptions = ref([]);
    const companyOptions = ref([]);
    const typeOptions = ref([]);

    const search = ref(null);
    const boid = ref(null);
    const company = ref(null);
    const type = ref(null);
    const remarks = ref(null);

    const mapBoid = async () => {
      const res = await getAllBoid();
      res.map((boid) => {
        boidOptions.value.push({ label: boid.boid, value: boid.boid });
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

    const mapType = async () => {
      const res = await getShareTypes();
      res.map((type) => {
        typeOptions.value.push({ label: type, value: type });
      });
    };

    onMounted(async () => {
      await mapTransactions();
      await mapBoid();
      await mapCompany();
      await mapType();
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
        message.error("Transaction Not Deleted");
      }
    };

    const filterData = async () => {
      tableIsLoading.value = true;
      data.value = [];
      filteredData.value = [];
      await mapTransactions();
      filteredData.value = await data.value.filter(transactionFilterLogic);
      tableIsLoading.value = false;
    };
    const transactionFilterLogic = (transaction) => {
      return (
        (search.value
          ? transaction.boid.toString().includes(search.value) ||
            transaction.company
              .toLowerCase()
              .includes(search.value.toLowerCase())
          : true) &&
        (boid.value ? transaction.boid === boid.value : true) &&
        (company.value ? transaction.company === company.value : true) &&
        (type.value ? transaction.type === type.value : true) &&
        (remarks.value ? transaction.remarks === remarks.value : true)
      );
    };

    const searchFunction = (searchValue) => {
      search.value = searchValue;
      filterData();
    };

    const resetClicked = () => {
      search.value = null;
      boid.value = null;
      company.value = null;
      type.value = null;
      remarks.value = null;

      filterData();
    };
    return {
      tableIsLoading,
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
      boidOptions,
      companyOptions,
      typeOptions,
      search,
      boid,
      company,
      type,
      remarks,
      filterData,
      searchFunction,
      resetClicked,
    };
  },
});
</script>
