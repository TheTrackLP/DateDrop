<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Example places — swap this with your Supabase fetch later
const places = ref([
  { id: 1, name: "Bohol Bee Farm Resort", lat: 9.5825, lng: 123.8517 },
  { id: 2, name: "Loboc River Grill", lat: 9.6337, lng: 124.0333 },
  { id: 3, name: "Buzz Cafe, Tagbilaran", lat: 9.6474, lng: 123.8547 },
]);

let map = null;

onMounted(() => {
  // Step 3: initialize the map, centered on Tagbilaran
  map = L.map("map").setView([11.586276705834775, 122.75390511153525], 11);

  // Step 4: add the OSM tile layer
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors",
  }).addTo(map);

  // Step 5: loop through places and drop a marker for each
  places.value.forEach((place) => {
    L.marker([place.lat, place.lng])
      .addTo(map)
      .bindPopup(`<b>${place.name}</b>`);
  });
});

onUnmounted(() => {
  // Step 6: clean up so the map doesn't leak memory on page navigation
  if (map) {
    map.remove();
    map = null;
  }
});
</script>

<template>
  <div class="content-body">
    <div class="mb-4">
      <h4 class="fw-bold mb-0">Dashboard</h4>
      <p class="text-muted small mb-0"></p>
    </div>
    <hr />

    <!-- Summary cards -->
    <div class="row g-3 mb-3">
      <div class="col-6 col-md-3">
        <div class="card border-0 shadow-sm">
          <div class="card-body">
            <div class="text-muted small">Total Locations</div>
            <div class="fs-4 fw-bold" id="statTotal">0</div>
          </div>
        </div>
      </div>
      <div class="col-6 col-md-3">
        <div class="card border-0 shadow-sm">
          <div class="card-body">
            <div class="text-muted small">Total Categories</div>
            <div class="fs-4 fw-bold text-primary" id="statScheduled">0</div>
          </div>
        </div>
      </div>
      <div class="col-6 col-md-3">
        <div class="card border-0 shadow-sm">
          <div class="card-body">
            <div class="text-muted small">Completed</div>
            <div class="fs-4 fw-bold text-success" id="statCompleted">0</div>
          </div>
        </div>
      </div>
      <div class="col-6 col-md-3">
        <div class="card border-0 shadow-sm">
          <div class="card-body">
            <div class="text-muted small">Pending</div>
            <div class="fs-4 fw-bold text-warning" id="statPending">0</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Map + List -->
    <div class="split">
      <div class="map-col">
        <div class="card border-0 shadow-sm">
          <div class="card-body p-2">
            <div id="map" style="width: 100%; border-radius: 16px"></div>
          </div>
        </div>
      </div>

      <div class="list-col">
        <div class="card border-0 shadow-sm h-100">
          <div
            class="card-header bg-white d-flex justify-content-between align-items-center"
          >
            <span class="fw-semibold small">Locations / Events</span>
            <span class="text-muted small" id="listCount">0 items</span>
          </div>
          <div class="card-body p-2 location-list" id="locationList">
            <div class="list-group">
              <a
                href="#"
                class="list-group-item list-group-item-action d-flex gap-3 align-items-center"
              >
                <img
                  src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=100&h=100&fit=crop"
                  class="rounded"
                  width="56"
                  height="56"
                />
                <div>
                  <div class="fw-semibold">Bohol Bee Farm Resort</div>
                  <span class="badge bg-success-subtle text-success-emphasis"
                    >Resort</span
                  >
                  <span class="badge bg-danger-subtle text-danger-emphasis"
                    >Visited</span
                  >
                </div>
              </a>

              <a
                href="#"
                class="list-group-item list-group-item-action d-flex gap-3 align-items-center"
              >
                <img
                  src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=100&h=100&fit=crop"
                  class="rounded"
                  width="56"
                  height="56"
                />
                <div>
                  <div class="fw-semibold">Buzz Cafe, Tagbilaran</div>
                  <span class="badge bg-success-subtle text-success-emphasis"
                    >Cafe</span
                  >
                  <span class="badge bg-warning-subtle text-warning-emphasis"
                    >Want to go</span
                  >
                </div>
              </a>

              <a
                href="#"
                class="list-group-item list-group-item-action d-flex gap-3 align-items-center"
              >
                <img
                  src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=100&h=100&fit=crop"
                  class="rounded"
                  width="56"
                  height="56"
                />
                <div>
                  <div class="fw-semibold">Loboc River Grill</div>
                  <span class="badge bg-success-subtle text-success-emphasis"
                    >Restaurant</span
                  >
                  <span class="badge bg-danger-subtle text-danger-emphasis"
                    >Visited</span
                  >
                </div>
              </a>

              <a
                href="#"
                class="list-group-item list-group-item-action d-flex gap-3 align-items-center"
              >
                <img
                  src="https://images.unsplash.com/photo-1601918774946-25832a4be0d6?w=100&h=100&fit=crop"
                  class="rounded"
                  width="56"
                  height="56"
                />
                <div>
                  <div class="fw-semibold">Mocha Jack's Poolside</div>
                  <span class="badge bg-success-subtle text-success-emphasis"
                    >Pool</span
                  >
                  <span class="badge bg-warning-subtle text-warning-emphasis"
                    >Want to go</span
                  >
                </div>
              </a>

              <a
                href="#"
                class="list-group-item list-group-item-action d-flex gap-3 align-items-center"
              >
                <img
                  src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=100&h=100&fit=crop"
                  class="rounded"
                  width="56"
                  height="56"
                />
                <div>
                  <div class="fw-semibold">Jollibee, Island City Mall</div>
                  <span class="badge bg-success-subtle text-success-emphasis"
                    >Fast Food</span
                  >
                  <span class="badge bg-danger-subtle text-danger-emphasis"
                    >Visited</span
                  >
                </div>
              </a>

              <!-- extra items to prove the list can grow long without pushing the map -->
              <a
                href="#"
                class="list-group-item list-group-item-action d-flex gap-3 align-items-center"
              >
                <img
                  src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=100&h=100&fit=crop"
                  class="rounded"
                  width="56"
                  height="56"
                />
                <div>
                  <div class="fw-semibold">Alona Beach Sunset Bar</div>
                  <span class="badge bg-success-subtle text-success-emphasis"
                    >Resort</span
                  >
                  <span class="badge bg-warning-subtle text-warning-emphasis"
                    >Want to go</span
                  >
                </div>
              </a>

              <a
                href="#"
                class="list-group-item list-group-item-action d-flex gap-3 align-items-center"
              >
                <img
                  src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=100&h=100&fit=crop"
                  class="rounded"
                  width="56"
                  height="56"
                />
                <div>
                  <div class="fw-semibold">Panglao Grill House</div>
                  <span class="badge bg-success-subtle text-success-emphasis"
                    >Restaurant</span
                  >
                  <span class="badge bg-danger-subtle text-danger-emphasis"
                    >Visited</span
                  >
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
