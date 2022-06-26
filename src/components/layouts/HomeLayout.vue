<template>
  <main>
    <TheHeader />
    <section
      class="2xl:px-40 xl:px-40 lg:px-20 md:px-20 sm:px-10 px-5 py-5 flex-1"
    >
      <slot />
    </section>
    <TheFooter />
  </main>
</template>

<script setup>
import TheHeader from "../pages/Home/Header/TheHeader.vue";
import TheFooter from "../pages/Home/Footer/TheFooter.vue";
</script>

<style scoped></style>
