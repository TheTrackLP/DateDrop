<script setup>
import { supabase } from "@/Lib/supabase";
import { toggleDropdown } from "@/Reuseables";
import { ref } from "vue";
import { useRouter } from "vue-router";

const DropdownRef = ref(null);

const openDropdown = () => {
  toggleDropdown(DropdownRef);
};

const router = useRouter();
const handleLogout = async () => {
  await supabase.auth.signOut();
  router.push({ name: "Login" });
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
        data-bs-toggle="dropdown"
        type="button"
        aria-expanded="false"
        @click="openDropdown"
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
          <router-link class="dropdown-item" to="/admin/profile"
            >👤 Profile</router-link
          >
        </li>
        <li><hr class="dropdown-divider" /></li>
        <li>
          <button
            type="button"
            class="dropdown-item"
            href="#"
            @click="handleLogout"
          >
            🚪 Log out
          </button>
        </li>
      </ul>
    </div>
  </nav>
</template>
