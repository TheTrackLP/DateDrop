<script setup>
import Navbar from "@/Components/Navbar.vue";
import Sidebar from "@/Components/Sidebar.vue";
</script>

<style>
body {
  --sb-bg: linear-gradient(180deg, #f67280, #c06c84);
  --sb-text: #fff;
  --sb-hover: rgba(255, 255, 255, 0.15);
  --sb-active-bg: rgba(255, 255, 255, 0.28);
  --sb-active-text: #fff;
  --close: invert(1);
  --page: #fff8f5;
  --line: #f1dfe3;
  --nb-bg: #fff;
  --nb-text: #3a2f33;
  --brand: #e0577a;
  background: var(--page);
}

.sidebar {
  width: 230px !important;
  min-height: 100vh;
  background-image: var(--sb-bg);
  color: var(--sb-text);
}

.sidebar .nav-link {
  color: var(--sb-text);
  border-radius: 0.5rem;
  padding: 0.6rem 0.9rem;
}

.sidebar .nav-link:hover {
  background: var(--sb-hover);
}

.sidebar .nav-link.active {
  background: var(--sb-active-bg);
  color: var(--sb-active-text);
  font-weight: 600;
}

.sidebar .btn-close {
  filter: var(--close);
}

.text-rose {
  color: #e0577a;
}
.bg-rose-soft {
  background: #fde8ee;
}

.btn-rose {
  background: #e0577a;
  border-color: #e0577a;
  color: #fff;
}
.btn-rose:hover {
  background: #c9456a;
  color: #fff;
}

.main {
  min-width: 0;
}
</style>

<template>
  <div class="d-flex">
    <!-- ============ SIDEBAR ============ -->
    <Sidebar />

    <div class="main flex-grow-1">
      <!-- ============ TOP NAVBAR ============ -->
      <Navbar />

      <main class="p-3 p-md-4">
        <router-view />
      </main>
    </div>
  </div>
</template>
