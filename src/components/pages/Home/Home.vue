<template>
  <HomeLayout>
    <SearchUserInput />
    <UserList />
  </HomeLayout>
</template>

<script setup>
import HomeLayout from "../../layouts/HomeLayout.vue";
import SearchUserInput from "../../user/SearchUserInput.vue";
import UserList from "../../user/User.vue";
import { userStore } from "../../../store/user";
</script>

<style scoped></style>
