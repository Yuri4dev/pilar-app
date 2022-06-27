<template>
  <div
    v-if="users.length"
    class="relative overflow-x-auto shadow-md rounded-lg w-full mt-10"
  >
    <table class="w-full text-sm text-left text-gray-500">
      <thead class="text-xs text-gray-700 uppercase bg-gray-100">
        <tr>
          <th scope="col" class="px-6 py-3">Name</th>
          <th scope="col" class="px-6 py-3">
            <select
              @change="filterByGender"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all" selected>Gender</option>
              <option value="male">male</option>
              <option value="female">female</option>
            </select>
          </th>
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
import { ref, onMounted, reactive, onBeforeMount, onUnmounted } from "vue";
import { userStore } from "../../store/user";
import LoadingSpinner from "../LoadingSpinner.vue";
import ModalProfile from "./ModalProfile.vue";
import { formatDate } from "../../helpers";
import { useRoute, useRouter } from "vue-router";

const users = ref([]);
const modalProfileOptions = reactive({
  show: false,
  user: {},
});
const store = userStore();
const route = useRoute();
const router = useRouter();

onBeforeMount(() => {
  if (!!route.query.user) {
    const url = new URL(window.location.href);
    modalProfileOptions.user = JSON.parse(url.searchParams.get("user"));
    modalProfileOptions.show = true;
  }
});
onMounted(async () => {
  await store.getUserList();
  users.value = store.users;
});
onUnmounted(() => {
  router.replace({ path: "/", query: {} });
});

const openUserProfile = (user) => {
  modalProfileOptions.user = user;
  modalProfileOptions.show = true;
};
const hideModalProfile = () => {
  modalProfileOptions.user = {};
  modalProfileOptions.show = false;
};
const filterByGender = (event) => {
  store.getUserList().then(() => {
    users.value = store.users;
    if (event.target.value !== "all") {
      const filter = users.value.filter(
        (user) => user.gender === event.target.value
      );
      users.value = filter;
    }
  });
};
</script>

<style scoped></style>
