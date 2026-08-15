<script setup lang="ts">
import SidebarNav from "@/components/SidebarNav.vue";
import TopBar from "@/components/TopBar.vue";
</script>

<style></style>

<template>
  <div class="app-shell">
    <SidebarNav />
    <TopBar />
    <router-view />
  </div>
</template>
