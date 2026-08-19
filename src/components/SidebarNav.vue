<script setup lang="ts">
defineProps<{ isOpen: boolean }>();
</script>
<template>
  <aside class="sidebar py-3" :class="{ open: isOpen }">
    <div class="px-3 mb-3 d-flex align-items-center gap-2">
      <span class="fw-bold">📍 DateDrop</span>
    </div>
    <hr />
    <nav class="nav flex-column">
      <router-link
        to="/main"
        class="nav-link"
        active-class="active"
        exact-active-class="active"
      >
        <i class="fa-solid fa-gauge"></i>Dashboard
      </router-link>
      <a href="#" class="nav-link d-flex align-items-center gap-2 py-2 px-3">
        <i class="fa-solid fa-map-location-dot"></i> Map
      </a>
      <router-link
        to="/places-list"
        class="nav-link d-flex align-items-center gap-2 py-2 px-3"
      >
        <i class="fa-solid fa-list"></i> List
      </router-link>
      <router-link
        to="/categories"
        class="nav-link d-flex align-items-center gap-2 py-2 px-3"
        active-class="active"
      >
        <i class="fa-solid fa-layer-group"></i> Categories
      </router-link>
    </nav>
  </aside>
</template>
