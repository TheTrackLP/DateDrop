<script setup lang="ts">
import SidebarNav from "@/components/SidebarNav.vue";
import TopBar from "@/components/TopBar.vue";
import { ref } from "vue";

const isSidebarOpen = ref(false);

function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value;
}
</script>
<style>
html,
body {
  height: 100%;
  margin: 0;
  background: #f4f5f7;
}

.app {
  display: flex;
  height: 100vh;
}

.sidebar {
  width: 240px;
  flex: 0 0 auto;
  background: #1f2a33;
  color: #fff;
  border-right: 1px solid #e5e7eb;
  font-size: 25px;
}
.sidebar .nav-link {
  color: #fff;
  border-radius: 8px;
  margin: 5px 10px;
  font-size: 1rem;
}
.sidebar .nav-link.active {
  background: #e8536b;
  color: #fff;
  font-weight: 600;
}
.sidebar .nav-link:hover:not(.active) {
  background: #e8536b;
}

.content {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  min-width: 0;
}
.content-body {
  flex: 1 1 auto;
  overflow-y: auto;
  padding: 1.25rem 1.5rem;
}

.split {
  display: flex;
  gap: 1rem;
  min-height: 0;
}
.split .map-col {
  flex: 1 1 60%;
  min-width: 0;
}
.split .list-col {
  flex: 1 1 38%;
  min-width: 280px;
}

#map {
  height: 520px;
  border-radius: 10px;
}

.location-list {
  max-height: 520px;
  overflow-y: auto;
}
.location-item {
  cursor: pointer;
  border-radius: 8px;
  transition:
    background 0.12s ease,
    border-color 0.12s ease;
}
.location-item:hover {
  background: #f9fafb;
}
.location-item.active {
  background: #eef2ff;
  border-color: #c7d2fe !important;
}

label {
  font-weight: bold;
}

@media (max-width: 991.98px) {
  .sidebar {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    z-index: 1050;
    transform: translateX(-100%);
    transition: transform 0.2s ease;
  }
  .sidebar.open {
    transform: translateX(0);
    box-shadow: 0 0 24px rgba(0, 0, 0, 0.15);
  }

  .sidebar-backdrop {
    display: none;
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.35);
    z-index: 1040;
  }
  .sidebar-backdrop.show {
    display: block;
  }

  .split {
    flex-direction: column;
  }
  #map {
    height: 340px;
  }
}
</style>
<template>
  <div class="app">
    <SidebarNav :is-open="isSidebarOpen" />

    <div class="content">
      <TopBar @toggleSidebar="toggleSidebar" />

      <router-view />
    </div>
  </div>
</template>
