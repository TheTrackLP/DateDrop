<script setup>
const emit = defineEmits(["toggleSidebar"]);
</script>

<template>
  <nav class="navbar border-bottom px-3" style="background-color: #f8f9fa">
    <div class="ms-auto d-flex align-items-center gap-3">
      <button
        class="btn btn-light d-lg-none me-2"
        @click.prevent="emit('toggleSidebar')"
      >
        <i class="fa-solid fa-bars"></i>
      </button>
    </div>
  </nav>
</template>
