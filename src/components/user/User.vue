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

  <div class="w-full flex justify-center">
    <button
      type="button"
      class="mt-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
      @click.stop="getMoreUsers"
    >
      <svg
        v-if="loadingMore"
        role="status"
        class="inline w-4 h-4 mr-3 text-white animate-spin"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="#E5E7EB"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentColor"
        />
      </svg>
      <span v-if="loadingMore">Loading more...</span>
      <span v-else>Load more</span>
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive, onBeforeMount, onUnmounted } from "vue";
import { userStore } from "../../store/user";
import LoadingSpinner from "../LoadingSpinner.vue";
import ModalProfile from "./ModalProfile.vue";
import { formatDate } from "../../helpers";
import { useRoute, useRouter } from "vue-router";

const users = ref([]);
const loadingMore = ref(false);
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
  store.getUserList(store.page).then(() => {
    users.value = store.users;
    if (event.target.value !== "all") {
      const filter = users.value.filter(
        (user) => user.gender === event.target.value
      );
      users.value = filter;
    }
  });
};
const getMoreUsers = () => {
  loadingMore.value = true;
  store.page = store.page + 1;
  store.getUserList(store.page).then(() => {
    users.value = store.users;
    loadingMore.value = false;
  });
};
</script>

<style scoped></style>
