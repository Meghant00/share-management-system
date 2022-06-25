<template>
  <data-table
    :columns="columns"
    :data="filteredData"
    :tableLoading="tableIsLoading"
    @search="searchFunction"
    @resetClicked="resetClicked"
    :resetStatus="resetStatus"
    class="my-8"
  >
    <template #filterParameters>
      <n-select
        placeholder="Select Company"
        :options="companyOptions"
        clearable
        filterable
        v-model:value="company"
        @update:value="filterData"
      />
    </template>
  </data-table>
</template>
<script>
import { defineComponent, onMounted, ref } from "vue";
import DataTable from "@/components/datatable/DataTable.vue";
import { getAllShareCompanywise } from "@/services/transaction/TransactionServices";
import { NSelect } from "naive-ui";
import { getAllCompany } from "@/services/company/CompanyServices";
export default defineComponent({
  name: "AllShareCompanywiseTable",
  components: { DataTable, NSelect },
  setup() {
    const tableIsLoading = ref(false);
    const createColumns = () => {
      return [
        {
          title: "S.N",
          key: "sn",
          sorter: "default",
        },
        {
          title: "Company",
          key: "company",
          sorter: "default",
        },
        {
          title: "Number of Share",
          key: "noOfShare",
          sorter: "default",
        },
        {
          title: "Total Cost",
          key: "investment",
        },
        {
          title: "WACC",
          key: "averageInvestment",
        },
        {
          title: "Total Cost",
          key: "cgt",
        },
        {
          title: "WAC",
          key: "averageCgt",
        },
      ];
    };

    const columns = createColumns();

    const data = ref([]);
    const filteredData = ref([]);

    const mapAllShare = async () => {
      data.value = [];
      filteredData.value = [];
      const res = await getAllShareCompanywise();
      let sn = 1;

      res.map((transaction) => {
        data.value.push({
          sn: sn,
          company: transaction.company.companyName,
          noOfShare: transaction.noOfShare,
          investment: renderNumber(transaction.investment),
          cgt: renderNumber(transaction.cgt),
          averageInvestment: renderNumber(transaction.averageInvestment),
          averageCgt: renderNumber(transaction.averageCgt),
        });
        sn++;
      });

      filteredData.value = data.value;
    };

    const renderNumber = (number) => {
      const result = number - Math.floor(number) !== 0;

      if (result) {
        return Number(number).toFixed(2);
      }

      return Number(number);
    };

    const companyOptions = ref([]);

    const search = ref(null);
    const company = ref(null);

    const mapCompany = async () => {
      const res = await getAllCompany();
      res.map((company) => {
        companyOptions.value.push({
          label: company.companyName,
          value: company.companyName,
        });
      });
    };

    onMounted(async () => {
      await mapAllShare();
      await mapCompany();
    });

    const resetStatus = ref(false);

    const filterData = async () => {
      resetStatus.value = false;
      tableIsLoading.value = true;
      data.value = [];
      filteredData.value = [];
      await mapAllShare();
      filteredData.value = await data.value.filter(transactionFilterLogic);
      tableIsLoading.value = false;
    };
    const transactionFilterLogic = (transaction) => {
      return (
        (search.value
          ? transaction.company
              .toLowerCase()
              .includes(search.value.toLowerCase())
          : true) &&
        (company.value ? transaction.company === company.value : true)
      );
    };

    const searchFunction = (searchValue) => {
      search.value = searchValue;
      filterData();
    };

    const resetClicked = async () => {
      search.value = null;
      company.value = null;

      resetStatus.value = true;

      await mapAllShare();
    };

    return {
      columns,
      filteredData,
      companyOptions,
      search,
      company,
      filterData,
      searchFunction,
      resetClicked,
      tableIsLoading,
      resetStatus,
    };
  },
});
</script>
