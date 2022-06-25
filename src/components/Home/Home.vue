<template>
  <div>
    <h1>teste</h1>
  </div>
</template>

<script setup>
import { userStore } from "../../store/user";
const user = userStore();
console.log(user);
</script>

<style scoped></style>
