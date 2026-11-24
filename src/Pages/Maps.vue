<script setup>
import "leaflet/dist/leaflet.css";
import {
  LMap,
  LTileLayer,
  LMarker,
  LPopup,
  LIcon,
} from "@vue-leaflet/vue-leaflet";
import { onMounted, ref } from "vue";
import { supabase } from "@/Lib/supabase";

const placesList = ref([]);
const fetchPlaceLists = async () => {
  const { data: places } = await supabase
    .from("places")
    .select(`*, categories (color, icon)`)
    .limit(1);
  placesList.value = places;
};

onMounted(fetchPlaceLists);
</script>

<style>
.map-wrap {
  position: relative;
  height: calc(100vh - 57px);
  height: calc(100dvh - 57px);
  overflow: hidden;
}
#map {
  position: absolute;
  inset: 0;
  background-color: #f2efe9;
  background-image:
    linear-gradient(90deg, rgba(255, 255, 255, 0.8) 2px, transparent 2px),
    linear-gradient(rgba(255, 255, 255, 0.8) 2px, transparent 2px);
  background-size: 90px 90px;
}
.sea {
  position: absolute;
  inset: 0 auto 0 0;
  width: 30%;
  background: #aad3df;
  clip-path: polygon(0 0, 100% 0, 70% 35%, 85% 70%, 60% 100%, 0 100%);
}
.placeholder-tag {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
}
.overlay-top {
  position: absolute;
  top: 0.75rem;
  left: 0.75rem;
  right: 0.75rem;
  z-index: 5;
}
.chips {
  overflow-x: auto;
  white-space: nowrap;
  scrollbar-width: none;
}
.chips::-webkit-scrollbar {
  display: none;
}
.pin {
  --c: #0284c7;
  position: absolute;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  border: 3px solid var(--c);
  background: #fff;
  padding: 0;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
}
.pin.visited {
  background: var(--c);
  border-color: #fff;
}
.pin.active {
  transform: translate(-50%, -50%) scale(1.2);
  z-index: 3;
  outline: 3px solid rgba(224, 87, 122, 0.45);
}
.map-controls {
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  z-index: 5;
}
.place-card {
  position: absolute;
  left: 50%;
  bottom: 1.5rem;
  transform: translateX(-50%);
  width: min(380px, calc(100% - 1.5rem));
  z-index: 5;
}
.attribution {
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: 4;
  font-size: 0.7rem;
  background: rgba(255, 255, 255, 0.8);
  padding: 0 0.4rem;
}
.legend {
  position: absolute;
  left: 0.75rem;
  bottom: 1.5rem;
  z-index: 4;
}
.places-panel {
  width: 340px !important;
}
.places-list {
  overflow-y: auto;
}
@media (max-width: 991.98px) {
  .legend {
    display: none;
  }
}
</style>

<template>
  <div class="d-flex">
    <!-- ============ MAP AREA ============ -->
    <section class="map-wrap flex-grow-1" aria-label="Places map">
      <!-- Leaflet will render into #map. Everything inside it is a static preview. -->
      <div id="map">
        ,
        <l-map :zoom="12" :center="[11.442920744150456, 122.75913187334166]">
          <l-tile-layer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <l-marker
            v-for="row in placesList"
            :key="row.id"
            :lat-lng="[row.lat, row.lng]"
          >
            <l-icon>
              <button
                type="button"
                class="pin visited"
                :style="{ backgroundColor: row.categories?.color }"
                aria-label="Timplado, visited"
              >
                {{ row.categories?.icon }}
              </button>
            </l-icon>

            <l-popup>
              <strong>{{ row.name }}</strong
              ><br />
              {{ row.address }}
            </l-popup>
          </l-marker>
        </l-map>
      </div>
    </section>

    <!-- ============ PLACES PANEL (side panel on desktop, drawer on tablet/mobile) ============ -->
    <aside
      id="placesPanel"
      class="places-panel offcanvas-lg offcanvas-end bg-white border-start flex-shrink-0"
      tabindex="-1"
      aria-labelledby="placesPanelLabel"
      style="height: calc(100vh - 57px)"
    >
      <div class="offcanvas-header border-bottom">
        <h2 class="offcanvas-title h6 mb-0" id="placesPanelLabel">
          📍 Places <span class="badge text-bg-light border">25</span>
        </h2>
        <button
          type="button"
          class="btn-close d-lg-none"
          data-bs-dismiss="offcanvas"
          data-bs-target="#placesPanel"
          aria-label="Close places list"
        ></button>
      </div>
      <div class="offcanvas-body d-flex flex-column p-0">
        <div class="p-3 border-bottom">
          <div class="row g-2">
            <div class="col-6">
              <label for="pStatus" class="visually-hidden">Status</label
              ><select id="pStatus" class="form-select form-select-sm">
                <option>Any status</option>
                <option>Visited</option>
                <option>Wishlist</option>
              </select>
            </div>
            <div class="col-6">
              <label for="pSort" class="visually-hidden">Sort</label
              ><select id="pSort" class="form-select form-select-sm">
                <option>Name A–Z</option>
                <option>Newest first</option>
              </select>
            </div>
          </div>
        </div>
        <div class="list-group list-group-flush places-list flex-grow-1">
          <button
            type="button"
            class="list-group-item list-group-item-action d-flex align-items-center gap-3 py-3 active"
            style="background: #fde8ee; border-color: #f1dfe3; color: inherit"
          >
            <span class="fs-4">☕</span
            ><span class="flex-grow-1 text-start text-truncate"
              ><span class="d-block fw-semibold text-truncate"
                >Café Terraza</span
              ><small class="text-muted">Cafe · Lawa-an</small></span
            ><span class="badge rounded-pill text-bg-success">Visited</span>
          </button>
          <button
            type="button"
            class="list-group-item list-group-item-action d-flex align-items-center gap-3 py-3"
          >
            <span class="fs-4">🏖️</span
            ><span class="flex-grow-1 text-start text-truncate"
              ><span class="d-block fw-semibold text-truncate"
                >Baybay Beach</span
              ><small class="text-muted">Beach · Baybay</small></span
            ><span class="badge rounded-pill text-bg-success">Visited</span>
          </button>
          <button
            type="button"
            class="list-group-item list-group-item-action d-flex align-items-center gap-3 py-3"
          >
            <span class="fs-4">🏖️</span
            ><span class="flex-grow-1 text-start text-truncate"
              ><span class="d-block fw-semibold text-truncate"
                >Mantalinga Island</span
              ><small class="text-muted">Beach · Off Baybay</small></span
            ><span class="badge rounded-pill text-bg-warning">Wishlist</span>
          </button>
          <button
            type="button"
            class="list-group-item list-group-item-action d-flex align-items-center gap-3 py-3"
          >
            <span class="fs-4">🍽️</span
            ><span class="flex-grow-1 text-start text-truncate"
              ><span class="d-block fw-semibold text-truncate">Timplado</span
              ><small class="text-muted">Food · Baybay</small></span
            ><span class="badge rounded-pill text-bg-success">Visited</span>
          </button>
          <button
            type="button"
            class="list-group-item list-group-item-action d-flex align-items-center gap-3 py-3"
          >
            <span class="fs-4">🍽️</span
            ><span class="flex-grow-1 text-start text-truncate"
              ><span class="d-block fw-semibold text-truncate"
                >Villa Consorcia Resort and Restaurant</span
              ><small class="text-muted">Food · Roxas City</small></span
            ><span class="badge rounded-pill text-bg-warning">Wishlist</span>
          </button>
          <button
            type="button"
            class="list-group-item list-group-item-action d-flex align-items-center gap-3 py-3"
          >
            <span class="fs-4">🏨</span
            ><span class="flex-grow-1 text-start text-truncate"
              ><span class="d-block fw-semibold text-truncate"
                >San Antonio Resort</span
              ><small class="text-muted">Staycation · Baybay</small></span
            ><span class="badge rounded-pill text-bg-warning">Wishlist</span>
          </button>
          <button
            type="button"
            class="list-group-item list-group-item-action d-flex align-items-center gap-3 py-3"
          >
            <span class="fs-4">⛪</span
            ><span class="flex-grow-1 text-start text-truncate"
              ><span class="d-block fw-semibold text-truncate"
                >Old Capiz Bridge</span
              ><small class="text-muted">Heritage · Arsobispo St.</small></span
            ><span class="badge rounded-pill text-bg-success">Visited</span>
          </button>
          <button
            type="button"
            class="list-group-item list-group-item-action d-flex align-items-center gap-3 py-3"
          >
            <span class="fs-4">⛪</span
            ><span class="flex-grow-1 text-start text-truncate"
              ><span class="d-block fw-semibold text-truncate"
                >Roxas City Plaza</span
              ><small class="text-muted">Heritage · Roxas City</small></span
            ><span class="badge rounded-pill text-bg-success">Visited</span>
          </button>
        </div>
      </div>
    </aside>
  </div>
</template>
