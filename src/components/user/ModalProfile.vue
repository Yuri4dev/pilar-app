<template>
  <div
    tabindex="-1"
    aria-hidden="true"
    class="overflow-hidden fixed top-0 left-0 z-50 w-full h-full md:inset-0 h-modal md:h-full backdrop-brightness-50"
  >
    <div class="relative p-4 w-full max-w-2xl h-full md:h-auto mx-auto mt-10">
      <div class="relative bg-white rounded-lg 0">
        <button class="absolute top-0 right-0 m-1" @click="hideModalProfile">
          <img src="../../assets/images/x-circle.svg" width="30" />
        </button>
        <figure class="rounded-xl p-8">
          <img
            class="w-24 h-24 rounded-full mx-auto -mt-16 border-4 border-white"
            :src="userDetails.picture.large"
            :alt="userDetails.name.first"
            :title="userDetails.name.first"
          />
          <div class="pt-6 text-center space-y-4">
            <h1 class="text-lg font-medium">
              {{ userDetails.name.title }} {{ userDetails.name.first }}
              {{ userDetails.name.last }}, {{ userDetails.dob.age }}
            </h1>
            <em>{{ userDetails.email }}</em>
            <p>
              {{ userDetails.gender }}, {{ formatDate(userDetails.dob.date) }}
            </p>
            <address>
              {{ userDetails.location.street.name }},
              {{ userDetails.location.street.number }} -
              {{ userDetails.location.city }}/{{ userDetails.location.state }} -
              {{ userDetails.nat }}
            </address>
            <div class="flex gap-3 justify-center">
              <img src="../../assets/images/phone-call.svg" />
              <a href="" class="underline">{{ userDetails.phone }}</a>
            </div>
            <div>
              <p class="mt-10 font-medium text-xs">Share Link</p>
              <div class="w-1/2 gap-1 mx-auto md:flex">
                <input
                  type="text"
                  id="link"
                  disabled
                  class="block p-2 w-full text-gray-900 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 focus:ring-blue-500 focus:border-blue-500"
                  :value="'http://localhost:3000/?' + inputLinkForShare"
                />
                <button
                  type="button"
                  class="flex items-center py-2 px-4 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:bg-green-600 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
                  @click="copyLinkToClipboard"
                >
                  <svg
                    class="mr-2 w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    ></path>
                  </svg>
                  <span class="copy-text">Copy</span>
                </button>
              </div>
            </div>
          </div>
        </figure>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { useRouter, useRoute } from "vue-router";
import { formatDate } from "../../helpers";
import qs from "qs";
import { onMounted } from "@vue/runtime-core";

const props = defineProps({
  userDetails: Object,
});
const inputLinkForShare = ref();
const router = useRouter();
const route = useRoute();

const emit = defineEmits(["hideModalProfile"]);
const hideModalProfile = () => {
  emit("hideModalProfile");
};
const copyLinkToClipboard = (event) => {
  const link = document.getElementById("link").value;
  event.target.innerText = "Copied";
  navigator.clipboard.writeText(link);
};

onMounted(() => {
  const query = qs.stringify(props.userDetails);
  inputLinkForShare.value = query;
  router.push({ query: { query } });
});
</script>

<style scoped></style>
