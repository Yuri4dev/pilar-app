<template>
  <div
    v-if="users.length"
    class="relative overflow-x-auto shadow-md rounded-lg w-full mt-10"
  >
    <table class="w-full text-sm text-left text-gray-500">
      <thead class="text-xs text-gray-700 uppercase bg-gray-100">
        <tr>
          <th scope="col" class="px-6 py-3">Name</th>
          <th scope="col" class="px-6 py-3">Gender</th>
          <th scope="col" class="px-6 py-3">Birth</th>
          <th scope="col" class="px-6 py-3">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="bg-white border-b hover:bg-gray-50 hover:bg-gray-200"
          v-for="user in users"
          :key="user.login.uuid"
        >
          <td
            class="flex items-center gap-2 px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
          >
            <img
              class="w-10 h-10 rounded"
              :src="user.picture.thumbnail"
              alt="Default avatar"
            />
            {{ user.name.first }} {{ user.name.last }}
          </td>
          <td class="px-6 py-4 text-gray-900">{{ user.gender }}</td>
          <td class="px-6 py-4 text-gray-900">
            {{ formatDate(user.dob.date) }}
          </td>
          <td class="px-6 py-4 text-gray-900">
            <a
              href="#"
              class="font-medium text-blue-600 hover:underline"
              @click="openUserProfile(user)"
              >Details</a
            >
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <LoadingSpinner v-else />

  <ModalProfile
    v-if="modalProfileOptions.user && modalProfileOptions.show"
    :user-details="modalProfileOptions.user"
    @hide-modal-profile="hideModalProfile"
  />
</template>

<script setup>
import { ref, onMounted, reactive, onBeforeMount } from "vue";
import { userStore } from "../../store/user";
import LoadingSpinner from "../LoadingSpinner.vue";
import ModalProfile from "./ModalProfile.vue";
import { formatDate } from "../../helpers";
import { useRoute } from "vue-router";
import qs from "qs";

const users = ref([]);
const modalProfileOptions = reactive({
  show: false,
  user: {},
});
const store = userStore();
const route = useRoute();

onBeforeMount(() => {
  if (!!route.query) {
    modalProfileOptions.user = qs.parse(route.query);
    modalProfileOptions.show = true;
  }
});
onMounted(async () => {
  await store.getUserList();
  users.value = store.users;
});

const openUserProfile = (user) => {
  modalProfileOptions.user = user;
  modalProfileOptions.show = true;
};
const hideModalProfile = () => {
  modalProfileOptions.user = {};
  modalProfileOptions.show = false;
};
</script>

<style scoped></style>
