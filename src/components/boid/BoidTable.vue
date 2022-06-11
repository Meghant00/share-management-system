<template>
  <div class="flex flex-row items-center justify-end py-4">
    <primary-button @click="showModal = true"> Add New Boid </primary-button>
  </div>
  <data-table :columns="columns" :data="data" />
  <n-modal v-model:show="showModal">
    <add-boid @close="showModal = false" @addClicked="addClicked" />
  </n-modal>
  <n-modal v-model:show="deleteModal">
    <delete-boid
      @noClicked="deleteModal = false"
      @yesClicked="deleteBoidClicked"
    />
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
import BoidActions from "./BoidActions.vue";
import DeleteBoid from "./DeleteBoid.vue";
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
        return h(BoidActions, {
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
let sn = 1;
const showModal = ref(false);
const columns = createColumns({ deleteClicked, editClicked });
const message = useMessage();
const mapBoid = async () => {
  data.value = [];
  sn = 1;
  const res = await getAllBoid();

  res.map((boid) => {
    data.value.push({ sn: sn, boid: boid.boid, id: boid.id });
    sn++;
  });
};
onMounted(async () => {
  await mapBoid();
});
const addClicked = async (boid) => {
  try {
    const res = await addBoid({ boid: boid });
    data.value.push({ sn: sn, boid: boid });
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
    data.value = data.value.filter((boid) => boid.id !== currentBoid.value.id);
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
</script>
