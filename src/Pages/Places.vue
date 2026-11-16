<template>
  <div
    class="d-flex flex-wrap justify-content-between align-items-start gap-3 mb-4"
  >
    <div>
      <h1 class="h3 mb-2">Places</h1>
      <div class="d-flex flex-wrap gap-3 text-muted small">
        <span><strong class="text-body">6</strong> saved</span>
        <span><strong class="text-body">3</strong> visited</span>
        <span><strong class="text-body">3</strong> on the wishlist</span>
      </div>
    </div>
    <button
      type="button"
      class="btn btn-rose"
      data-bs-toggle="modal"
      data-bs-target="#placeModal"
    >
      <i class="bi bi-plus-lg me-1"></i>Add place
    </button>
  </div>

  <!-- Filters -->
  <div class="card mb-4">
    <div class="card-body">
      <form class="row g-2" onsubmit="return false;">
        <div class="col-12 col-md-5">
          <label for="fSearch" class="visually-hidden">Search places</label>
          <div class="input-group">
            <span class="input-group-text bg-white"
              ><i class="bi bi-search"></i></span
            ><input
              type="search"
              id="fSearch"
              class="form-control"
              placeholder="Search by name or area"
            />
          </div>
        </div>
        <div class="col-6 col-md-2">
          <label for="fCategory" class="visually-hidden">Category</label
          ><select id="fCategory" class="form-select">
            <option value="">All categories</option>
            <option>Beach</option>
            <option>Cafe</option>
            <option>Food</option>
            <option>Staycation</option>
            <option>Nature</option>
          </select>
        </div>
        <div class="col-6 col-md-2">
          <label for="fStatus" class="visually-hidden">Status</label
          ><select id="fStatus" class="form-select">
            <option value="">Any status</option>
            <option>Wishlist</option>
            <option>Visited</option>
          </select>
        </div>
        <div class="col-8 col-md-2">
          <label for="fSort" class="visually-hidden">Sort by</label
          ><select id="fSort" class="form-select">
            <option>Newest first</option>
            <option>Name A–Z</option>
            <option>Name Z–A</option>
          </select>
        </div>
        <div class="col-4 col-md-1 d-grid">
          <button
            type="reset"
            class="btn btn-outline-secondary"
            aria-label="Clear filters"
          >
            <i class="bi bi-x-lg"></i>
          </button>
        </div>
      </form>
    </div>
  </div>
  <div class="row g-3">
    <div class="col-md-6 col-xl-4">
      <article class="card h-100 shadow-sm">
        <div
          class="bg-info-subtle text-info-emphasis d-flex justify-content-between align-items-center px-3 py-2 rounded-top"
        >
          <span class="fw-semibold"><i class="bi bi-water me-1"></i>Beach</span>
          <button
            type="button"
            class="btn btn-sm btn-link text-danger p-0"
            aria-pressed="true"
            aria-label="Favorite Baybay Sunset Walk"
          >
            <i class="fa-regular fa-heart"></i>
          </button>
        </div>
        <div class="card-body">
          <h2 class="h5 mb-1">Baybay Sunset Walk</h2>
          <p class="small text-muted mb-2">
            <i class="fa-solid fa-location-dot"></i> Baybay Beach, Roxas City
          </p>
        </div>
        <div
          class="card-footer bg-white d-flex justify-content-between align-items-center"
        >
          <span class="badge rounded-pill text-bg-warning">Wishlist</span>
          <div
            class="btn-group btn-group-sm"
            role="group"
            aria-label="Actions for Baybay Sunset Walk"
          >
            <a
              class="btn btn-outline-secondary"
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open Baybay Sunset Walk on map"
              ><i class="fa-solid fa-map"></i
            ></a>
            <button
              type="button"
              class="btn btn-outline-secondary"
              aria-label="Edit Baybay Sunset Walk"
              data-bs-toggle="modal"
              data-bs-target="#placeModal"
            >
              <i class="fa-solid fa-pencil"></i>
            </button>
            <button
              type="button"
              class="btn btn-outline-danger"
              aria-label="Delete Baybay Sunset Walk"
              data-bs-toggle="modal"
              data-bs-target="#deleteModal"
            >
              <i class="fa-solid fa-toggle-on"></i>
            </button>
          </div>
        </div>
      </article>
    </div>
  </div>
  <!-- Empty state (swap in when there are no places) -->
  <!--
      <div class="text-center py-5" role="status">
        <i class="bi bi-geo-alt fs-1 text-muted"></i>
        <h2 class="h5 mt-3">No places yet</h2>
        <p class="text-muted">Add your first place to start planning.</p>
        <button type="button" class="btn btn-rose" data-bs-toggle="modal" data-bs-target="#placeModal">Add place</button>
      </div>
      -->
</template>
