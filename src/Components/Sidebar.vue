<template>
  <aside
    id="sidebar"
    class="sidebar offcanvas-lg offcanvas-start bg-white border-end flex-shrink-0"
    tabindex="-1"
  >
    <div class="offcanvas-header border-bottom">
      <span class="fs-5 fw-bold text-rose"
        ><i class="fa-solid fa-bars"></i>DateDrop</span
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
          <a
            href="#"
            class="nav-link active"
            data-go="dashboard"
            data-bs-dismiss="offcanvas"
            data-bs-target="#sidebar"
            ><i class="fa-solid fa-gauge"></i> Dashboard</a
          >
        </li>
        <li>
          <a
            href="#"
            class="nav-link"
            data-go="dates"
            data-bs-dismiss="offcanvas"
            data-bs-target="#sidebar"
            ><i class="fa-solid fa-calendar-days"></i> Date Planner</a
          >
        </li>
        <li>
          <a
            href="#"
            class="nav-link"
            data-go="places"
            data-bs-dismiss="offcanvas"
            data-bs-target="#sidebar"
            ><i class="fa-solid fa-map-pin"></i> Destinations</a
          >
        </li>
        <li>
          <a
            href="#"
            class="nav-link"
            data-go="itinerary"
            data-bs-dismiss="offcanvas"
            data-bs-target="#sidebar"
            ><i class="fa-solid fa-signs-post"></i> Itinerary</a
          >
        </li>
        <li>
          <a
            href="#"
            class="nav-link"
            data-go="wishlist"
            data-bs-dismiss="offcanvas"
            data-bs-target="#sidebar"
            ><i class="fa-solid fa-star"></i> Wishlist</a
          >
        </li>
        <li>
          <a
            href="#"
            class="nav-link"
            data-go="budget"
            data-bs-dismiss="offcanvas"
            data-bs-target="#sidebar"
            ><i class="fa-solid fa-wallet"></i> Budget &amp; Expenses</a
          >
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
        <li>
          <a
            href="#"
            class="nav-link"
            data-go="settings"
            data-bs-dismiss="offcanvas"
            data-bs-target="#sidebar"
            ><i class="fa-solid fa-gear"></i> Settings</a
          >
        </li>
      </ul>
    </div>
  </aside>
</template>
