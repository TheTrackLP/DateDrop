<script setup>
import { openDropdown, closeDropdown } from "@/Reuseables";
import { ref } from "vue";

const DropdownRef = ref(null);

const openDropdownRef = () => {
  openDropdown(DropdownRef);
};

const closeDropdownRef = () => {
  closeDropdown(DropdownRef);
};
</script>

<template>
  <nav class="navbar bg-white border-bottom sticky-top px-3">
    <button
      type="button"
      class="btn btn-light d-lg-none"
      data-bs-toggle="offcanvas"
      data-bs-target="#sidebar"
    >
      ☰
    </button>
    <div class="ms-auto dropdown">
      <button
        ref="DropdownRef"
        class="btn dropdown-toggle"
        type="button"
        aria-expanded="false"
        @click="openDropdownRef"
      >
        <span
          class="rounded-circle bg-danger-subtle d-inline-flex align-items-center justify-content-center me-2"
          style="width: 34px; height: 34px"
          >👫</span
        >
        <span class="d-none d-sm-inline small fw-semibold">Alex &amp; Sam</span>
      </button>
      <ul class="dropdown-menu dropdown-menu-end">
        <li>
          <a class="dropdown-item" href="#" @click="closeDropdownRef"
            >👤 Profile</a
          >
        </li>
        <li><hr class="dropdown-divider" /></li>
        <li>
          <a class="dropdown-item" href="#" @click="closeDropdownRef"
            >🚪 Log out</a
          >
        </li>
      </ul>
    </div>
  </nav>
</template>
