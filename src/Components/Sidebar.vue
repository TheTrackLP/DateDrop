<script setup>
import { watch } from "vue";
import { useRoute } from "vue-router";
import { Offcanvas } from "bootstrap";

const route = useRoute();

watch(
  () => route.fullPath,
  () => {
    const el = document.getElementById("sidebar");
    if (el) Offcanvas.getOrCreateInstance(el)?.hide();
    document.querySelectorAll(".offcanvas-backdrop").forEach((b) => b.remove());
  },
);
</script>

<template>
  <aside
    id="sidebar"
    class="sidebar offcanvas-lg offcanvas-start bg-white border-end flex-shrink-0"
    tabindex="-1"
  >
    <div class="offcanvas-header border-bottom">
      <span class="fs-5 fw-bold text-white text-rose">
        <img
          src="/img/datedrop.png"
          class="avatar rounded-circle d-inline-flex align-items-center justify-content-center fw-bold mb-3"
          style="width: 40px; height: 40px"
        />
        DateDrop</span
      >
      <button
        class="btn-close"
        data-bs-dismiss="offcanvas"
        data-bs-target="#sidebar"
      ></button>
    </div>
    <div class="offcanvas-body d-block p-3">
      <div class="d-none d-lg-block fs-4 fw-bold text-white mb-4 px-2">
        <img
          src="/img/datedrop.png"
          class="avatar rounded-circle d-inline-flex align-items-center justify-content-center fw-bold mb-3"
          style="width: 40px; height: 40px"
        />
        DateDrop
      </div>
      <ul class="nav nav-pills flex-column gap-1">
        <li>
          <router-link
            to="/admin/dashboard"
            class="nav-link"
            exact-active-class="active"
            ><i class="fa-solid fa-gauge"></i> Dashboard</router-link
          >
        </li>
        <li>
          <router-link to="/admin/places" class="nav-link" active-class="active"
            ><i class="fa-solid fa-map-pin"></i> Places
          </router-link>
        </li>
        <li>
          <router-link to="/admin/maps" class="nav-link" active-class="active"
            ><i class="fa-solid fa-map"></i> Maps
          </router-link>
        </li>
        <li>
          <router-link
            to="/admin/categories"
            class="nav-link"
            active-class="active"
            ><i class="fa-solid fa-tags"></i> Categories
          </router-link>
        </li>
        <li>
          <router-link
            to="/admin/memories"
            class="nav-link"
            active-class="active"
            ><i class="fa-solid fa-book-journal-whills"></i>
            Memories</router-link
          >
        </li>
      </ul>
    </div>
  </aside>
</template>
