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

<style scoped>
.btn-coral {
  background: var(--coral);
  color: #fff;
}
.btn-coral:hover {
  background: var(--coral);
  color: black;
}
.btn-outline-coral {
  border-color: var(--coral);
}
.btn-outline-coral:hover {
  background-color: var(--coral);
  color: #fff;
}
.border-coral:hover {
  border-color: var(--coral);
}
</style>

<template>
  <div class="app">
    <!-- Icon rail -->

    <div class="content">
      <!-- Top bar -->
      <nav
        class="navbar navbar-expand navbar-light bg-white border-bottom px-3"
      >
        <span class="navbar-brand fw-bold">📍 DateDrop</span>

        <ul class="navbar-nav me-auto ms-4 d-none d-md-flex">
          <li class="nav-item"><a class="nav-link active" href="#">Map</a></li>
          <li class="nav-item"><a class="nav-link" href="#">List</a></li>
          <li class="nav-item"><a class="nav-link" href="#">Saved</a></li>
          <li class="nav-item"><a class="nav-link" href="#">Tags</a></li>
        </ul>

        <button class="btn btn-primary btn-sm me-3">+ Add place</button>
        <img
          src="https://i.pravatar.cc/40?img=12"
          class="rounded-circle"
          width="32"
          height="32"
        />
      </nav>

      <main>
        <section class="list-pane p-3">
          <div class="mb-3 d-flex flex-wrap gap-2">
            <button class="btn btn-sm btn-primary rounded-pill">
              All (12)
            </button>
            <button class="btn btn-sm btn-outline-secondary rounded-pill">
              🏝️ Resorts
            </button>
            <button class="btn btn-sm btn-outline-secondary rounded-pill">
              🍽️ Restaurants
            </button>
            <button class="btn btn-sm btn-outline-secondary rounded-pill">
              🍔 Fast Food
            </button>
            <button class="btn btn-sm btn-outline-secondary rounded-pill">
              🏊 Pools
            </button>
          </div>

          <div class="d-flex justify-content-between align-items-baseline mb-2">
            <span class="fw-bold">Our spots</span>
            <small class="text-muted">Sorted by recent</small>
          </div>

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
        </section>

        <section class="map-pane">
          <div
            id="map"
            style="height: 600px; width: 100%; border-radius: 16px"
          ></div>
          <button
            class="btn btn-primary rounded-circle position-absolute"
            style="right: 20px; bottom: 20px; width: 52px; height: 52px"
          >
            +
          </button>
          <div class="map-popup">
            <img
              src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&amp;h=200&amp;fit=crop"
              alt=""
            />
            <div class="body">
              <div class="place-name">Bohol Bee Farm Resort</div>
              <div class="place-meta mb-1">
                <span class="tag">Resort</span>
                <span class="badge-visited">Visited</span>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Perspiciatis a voluptatem dolor molestias illum tempora
                  architecto illo impedit similique? Ipsum molestias unde
                  blanditiis provident! Pariatur, ex. Rem iure iusto sint? Lorem
                  ipsum dolor, sit amet consectetur adipisicing elit. Saepe
                  dolore quidem sequi ab accusamus minus unde error, sint
                  ducimus omnis distinctio nisi autem adipisci, odio quisquam
                  laboriosam earum quasi ad. Lorem ipsum dolor sit, amet
                  consectetur adipisicing elit. Corrupti mollitia dicta eos
                  vitae odio ratione illum debitis ad aspernatur quibusdam
                  voluptatem iste voluptatum totam, tempora natus consequatur
                  ipsam rem quia!
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>
