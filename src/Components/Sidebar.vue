<template>
  <aside
    id="sidebar"
    class="sidebar offcanvas-lg offcanvas-start bg-white border-end flex-shrink-0"
    tabindex="-1"
  >
    <div class="offcanvas-header border-bottom">
      <span class="fs-5 fw-bold text-rose"
        ><i class="bi bi-heart-fill me-2"></i>DateDrop</span
      >
      <button
        class="btn-close"
        data-bs-dismiss="offcanvas"
        data-bs-target="#sidebar"
      ></button>
    </div>
    <div class="offcanvas-body d-block p-3">
      <div class="d-none d-lg-block fs-4 fw-bold text-white mb-4 px-2">
        <i class="bi bi-heart-fill me-2"></i>DateDrop
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
          <router-link
            to="/admin/categories"
            class="nav-link"
            active-class="active"
            ><i class="fa-solid fa-tags"></i> Categories
          </router-link>
        </li>
        <li>
          <a
            href="#"
            class="nav-link"
            data-go="memories"
            data-bs-dismiss="offcanvas"
            data-bs-target="#sidebar"
            ><i class="fa-solid fa-book-journal-whills"></i> Memories</a
          >
        </li>
      </ul>
    </div>
  </aside>
</template>
