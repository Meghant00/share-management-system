<template>
  <div class="flex flex-row items-center justify-end py-4">
    <primary-button @click="showModal = true"> Add New Boid </primary-button>
  </div>
  <data-table
    :columns="columns"
    :data="filteredData"
    @search="search"
    :tableLoading="tableLoading"
  />
  <n-modal v-model:show="showModal">
    <add-boid @close="showModal = false" @addClicked="addClicked" />
  </n-modal>
  <n-modal v-model:show="deleteModal">
    <yes-no-popup @yesClicked="deleteBoidClicked" @close="deleteModal = false">
      Do you want to delete this Boid?
    </yes-no-popup>
  </n-modal>
  <n-modal v-model:show="editModal">
    <edit-boid
      @close="editModal = false"
      :data="currentBoid"
      @updateClicked="updateBoid"
    />
  </n-modal>
</template>
<script setup>
import { h, onMounted, ref } from "vue";
import DataTable from "@/components/datatable/DataTable.vue";
import { getAllBoid } from "@/services/boid/BoidServices";
import { NModal, useMessage } from "naive-ui";
import PrimaryButton from "@/components/misc/PrimaryButton.vue";
import AddBoid from "./AddBoid.vue";
import {
  addBoid,
  deleteBoidService,
  updateBoidService,
} from "@/services/boid/BoidServices";
import DataTableActions from "@/components/misc/DataTableActions.vue";
import YesNoPopup from "@/components/misc/YesNoPopup.vue";
import EditBoid from "./EditBoid.vue";

const currentBoid = ref(null);
const deleteModal = ref(false);
const editModal = ref(false);
const deleteClicked = (row) => {
  currentBoid.value = row;
  deleteModal.value = true;
};
const editClicked = (row) => {
  currentBoid.value = row;

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
      key: "boid",
      title: "Boid",
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
const mapBoid = async () => {
  data.value = [];
  filteredData.value = [];
  sn = 1;
  tableLoading.value = true;
  const res = await getAllBoid();

  res.map((boid) => {
    data.value.push({ sn: sn, boid: boid.boid, id: boid.id });
    sn++;
  });
  filteredData.value = data.value;
  tableLoading.value = false;
};
onMounted(async () => {
  await mapBoid();
});
const addClicked = async (boid) => {
  try {
    const res = await addBoid({ boid: boid });
    await mapBoid();
    sn++;
    message.success("Boid Added");
    showModal.value = false;
  } catch (error) {
    message.error("Boid Not Added");
  }
};

const deleteBoidClicked = async () => {
  try {
    const res = await deleteBoidService(currentBoid.value.id);
    filteredData.value = data.value.filter(
      (boid) => boid.id !== currentBoid.value.id
    );
    currentBoid.value = null;
    message.success("Boid Deleted Successfully");
    deleteModal.value = false;
  } catch (error) {
    message.error(error);
  }
};
const updateBoid = async (boid) => {
  try {
    const tempData = { id: currentBoid.value.id, boid: boid };
    const res = await updateBoidService(tempData);

    currentBoid.value = null;
    message.success("Boid Updated Successfully");
    editModal.value = false;
    await mapBoid();
  } catch (error) {
    message.error(error);
  }
};

const search = (searchValue) => {
  tableLoading.value = true;
  filteredData.value = data.value.filter((boid) =>
    boid.boid.toString().includes(searchValue)
  );
  tableLoading.value = false;
};
</script>
