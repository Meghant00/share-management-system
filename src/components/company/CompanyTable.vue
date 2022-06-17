<template>
  <div class="flex flex-row items-center justify-end py-4">
    <primary-button @click="showModal = true"> Add New Company </primary-button>
  </div>
  <data-table
    :columns="columns"
    :data="filteredData"
    @search="search"
    :tableLoading="tableLoading"
  />
  <n-modal v-model:show="showModal">
    <add-company @close="showModal = false" @addClicked="addClicked" />
  </n-modal>
  <n-modal v-model:show="deleteModal">
    <yes-no-popup
      @close="deleteModal = false"
      @yesClicked="deleteCompanyClicked"
    >
      Do you want to delete this Company?
    </yes-no-popup>
  </n-modal>
  <n-modal v-model:show="editModal">
    <edit-company
      @close="editModal = false"
      :data="currentCompany"
      @updateClicked="updateCompany"
    />
  </n-modal>
</template>
<script setup>
import { h, onMounted, ref } from "vue";
import DataTable from "@/components/datatable/DataTable.vue";
import { NModal, useMessage } from "naive-ui";
import PrimaryButton from "@/components/misc/PrimaryButton.vue";
import AddCompany from "./AddCompany.vue";

import DataTableActions from "@/components/misc/DataTableActions.vue";
import YesNoPopup from "@/components/misc/YesNoPopup.vue";
import EditCompany from "./EditCompany.vue";
import {
  getAllCompany,
  addCompany,
  updateCompanyService,
  deleteCompanyService,
} from "@/services/company/CompanyServices";

const currentCompany = ref(null);
const deleteModal = ref(false);
const editModal = ref(false);
const deleteClicked = (row) => {
  currentCompany.value = row;
  deleteModal.value = true;
};
const editClicked = (row) => {
  currentCompany.value = row;

  editModal.value = true;
};
const createColumns = ({ deleteClicked, editClicked }) => {
  return [
    {
      key: "sn",
      title: "S.N",
      defaultSortOrder: false,
      sorter: "default",
    },
    {
      key: "companyName",
      title: "Company Name",
      defaultSortOrder: false,
      sorter: "default",
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
const tableLoading = ref(true);
const data = ref([]);
const filteredData = ref([]);
let sn = 1;
const showModal = ref(false);
const columns = createColumns({ deleteClicked, editClicked });
const message = useMessage();
const mapCompany = async () => {
  data.value = [];
  filteredData.value = [];
  sn = 1;
  tableLoading.value = true;
  const res = await getAllCompany();

  res.map((company) => {
    data.value.push({
      sn: sn,
      companyName: company.companyName,
      id: company.id,
    });
    sn++;
  });
  filteredData.value = data.value;
  tableLoading.value = false;
};
onMounted(async () => {
  await mapCompany();
});
const addClicked = async (companyName) => {
  try {
    const res = await addCompany({ companyName: companyName });
    await mapCompany();
    sn++;
    message.success("Company Added");
    showModal.value = false;
  } catch (error) {
    message.error(error.response.data.message);
  }
};

const deleteCompanyClicked = async () => {
  try {
    const res = await deleteCompanyService(currentCompany.value.id);
    filteredData.value = data.value.filter(
      (company) => company.id !== currentCompany.value.id
    );
    currentCompany.value = null;
    message.success("Company Deleted Successfully");
    deleteModal.value = false;
  } catch (error) {
    message.error(error);
  }
};
const updateCompany = async (companyName) => {
  try {
    const tempData = { id: currentCompany.value.id, companyName: companyName };
    const res = await updateCompanyService(tempData);

    currentCompany.value = null;
    message.success("Company Updated Successfully");
    editModal.value = false;
    await mapCompany();
  } catch (error) {
    message.error(error);
  }
};

const search = (searchValue) => {
  tableLoading.value = true;
  filteredData.value = data.value.filter((company) =>
    company.companyName.includes(searchValue)
  );
  tableLoading.value = false;
};
</script>
