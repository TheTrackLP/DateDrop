<template>
  asd
  <section data-view="dashboard">
    <div
      class="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-4"
    >
      <div>
        <h1 class="h3 mb-1">Good evening, Alex &amp; Sam 💕</h1>
        <p class="text-muted mb-0">
          Here's what's happening with your adventures.
        </p>
      </div>
      <div class="d-flex gap-2">
        <button
          class="btn btn-rose"
          data-bs-toggle="modal"
          data-bs-target="#m-dates"
        >
          <i class="bi bi-plus-lg me-1"></i>New Date
        </button>
        <button
          class="btn btn-outline-secondary"
          data-bs-toggle="modal"
          data-bs-target="#m-places"
        >
          <i class="bi bi-geo-alt me-1"></i>Add Place
        </button>
      </div>
    </div>
    <div class="row g-3 mb-4">
      <div class="col-6 col-xl-3">
        <div class="card h-100">
          <div class="card-body d-flex align-items-center gap-3">
            <i class="bi bi-calendar-heart fs-3 text-rose"></i>
            <div>
              <div class="text-muted small">Planned Dates</div>
              <div class="h4 mb-0">12</div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-6 col-xl-3">
        <div class="card h-100">
          <div class="card-body d-flex align-items-center gap-3">
            <i class="bi bi-check2-circle fs-3 text-rose"></i>
            <div>
              <div class="text-muted small">Places Visited</div>
              <div class="h4 mb-0">27</div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-6 col-xl-3">
        <div class="card h-100">
          <div class="card-body d-flex align-items-center gap-3">
            <i class="bi bi-airplane fs-3 text-rose"></i>
            <div>
              <div class="text-muted small">Upcoming</div>
              <div class="h4 mb-0">4</div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-6 col-xl-3">
        <div class="card h-100">
          <div class="card-body d-flex align-items-center gap-3">
            <i class="bi bi-wallet2 fs-3 text-rose"></i>
            <div>
              <div class="text-muted small">Total Expenses</div>
              <div class="h4 mb-0">₱48,250</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row g-3">
      <div class="col-lg-7">
        <div class="card h-100">
          <div class="card-header bg-white fw-semibold">Upcoming Dates</div>
          <ul class="list-group list-group-flush">
            <li
              class="list-group-item d-flex justify-content-between align-items-center py-3"
            >
              <div>
                <div class="fw-semibold">Sunset Dinner</div>
                <small class="text-muted"
                  >Nov 14 · 6:30 PM · Skyline Cafe</small
                >
              </div>
              <span class="badge text-bg-primary">Planned</span>
            </li>
            <li
              class="list-group-item d-flex justify-content-between align-items-center py-3"
            >
              <div>
                <div class="fw-semibold">Beach Day</div>
                <small class="text-muted">Nov 22 · 9:00 AM · Pearl Cove</small>
              </div>
              <span class="badge text-bg-primary">Planned</span>
            </li>
            <li
              class="list-group-item d-flex justify-content-between align-items-center py-3"
            >
              <div>
                <div class="fw-semibold">Weekend Getaway</div>
                <small class="text-muted">Dec 5 · 8:00 AM · Baguio City</small>
              </div>
              <span class="badge text-bg-primary">Planned</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="col-lg-5">
        <div class="card h-100">
          <div class="card-header bg-white fw-semibold">
            Recently Added Places
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">
              <div class="fw-semibold">Skyline Cafe</div>
              <small class="text-muted">Cafe · Wishlist</small>
            </li>
            <li class="list-group-item">
              <div class="fw-semibold">Pearl Cove Beach</div>
              <small class="text-muted">Beach · Wishlist</small>
            </li>
            <li class="list-group-item">
              <div class="fw-semibold">Rosewood Park</div>
              <small class="text-muted">Park · Visited</small>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
