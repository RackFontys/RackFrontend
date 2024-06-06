<script setup>
import Navbar from "@/components/Navbar.vue";
</script>

<template>
  <div class="w-100 flex-fill">
    <navbar/>
  </div>
  <div class="container">
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped>

</style>
