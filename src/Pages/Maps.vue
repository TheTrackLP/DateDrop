<script setup>
import "leaflet/dist/leaflet.css";
import {
  LMap,
  LTileLayer,
  LMarker,
  LPopup,
  LIcon,
} from "@vue-leaflet/vue-leaflet";
import { computed, onMounted, ref } from "vue";
import { supabase } from "@/Lib/supabase";
const loading = ref(false);
const placesList = ref([]);
const categoriesList = ref([]);
const fetchModulesData = async () => {
  loading.value = true;
  try {
    const [places, categories] = await Promise.all([
      supabase.from("places").select(`*, categories (name, color, icon)`),

      supabase.from("categories").select("*"),
    ]);
    const results = [places, categories];

    const failed = results.find((result) => result.error);

    if (failed) throw failed.error;

    placesList.value = places.data;
    categoriesList.value = categories.data;
  } catch (error) {
    console.error("Fetching data error", error);
  } finally {
    loading.value = false;
  }
};

const categoriesOptions = computed(() => {
  return categoriesList.value.map((m) => ({ label: m.name, value: m.id }));
});

onMounted(fetchModulesData);

const selectedStatus = ref("");
const selectedCategory = ref("");
const selectedPlaceName = ref("");
const filteredPlaces = computed(() => {
  const statusQuery = selectedStatus.value;
  const categoryQuery = selectedCategory.value;
  const placeNameQuery = selectedPlaceName.value.toLowerCase().trim();

  return placesList.value.filter((p) => {
    const matchStatus = !statusQuery || p.status === statusQuery;
    const matchCategory = !categoryQuery || p.category_id === categoryQuery;
    const matchPlaceName =
      !placeNameQuery || p.name.toLowerCase().includes(placeNameQuery);

    return matchPlaceName && matchCategory && matchStatus;
  });
});
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
.pin {
  position: absolute;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  border: 1px solid black;
  background: #fff;
  padding: 0;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
}
.pin.visited {
  background: var(--c);
  border-color: #fff;
}
.places-panel {
  width: 340px !important;
}
.places-list {
  overflow-y: auto;
}
.filters {
  position: relative;
  z-index: 1000;
}
.place-card {
  position: absolute;
  left: 50%;
  bottom: 1.5rem;
  transform: translateX(-50%);
  width: min(380px, calc(100% - 1.5rem));
  z-index: 5;
}
.overlay-top {
  position: relative;
  transform: translateY(50%);
  padding-left: -2rem;
  z-index: 1020;
}
.leaflet-control-zoom {
  position: relative;
  transform: translateY(300%);
  z-index: 1000;
}
.card-responsive {
  height: 640px;
  overflow-y: auto;
  overflow-x: hidden;
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
      <div class="overlay-top">
        <div class="d-flex gap-2 mb-2">
          <div class="input-group shadow-sm">
            <span class="input-group-text bg-white border-end-0"
              ><i class="fa-solid fa-magnifying-glass"></i
            ></span>
            <input
              type="search"
              class="form-control border-start-0"
              placeholder="Search places on the map"
              aria-label="Search places on the map"
              v-model="selectedPlaceName"
            />
          </div>
        </div>
      </div>
      <div id="map">
        <l-map :zoom="12" :center="[11.442920744150456, 122.75913187334166]">
          <l-tile-layer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <l-marker
            v-for="row in filteredPlaces"
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
              <div
                class="d-flex justify-content-between align-items-start gap-2"
              >
                <div class="text-break">
                  <span
                    class="badge mb-1"
                    :style="{ backgroundColor: row.categories?.color }"
                    >{{ row.categories?.icon }} {{ row.categories?.name }}</span
                  >
                  <h2 class="h6 mb-1">{{ row.name }}</h2>
                  <p class="small text-muted mb-2">📍 {{ row.address }}</p>
                </div>
              </div>
              <div class="d-flex flex-wrap gap-2 align-items-center">
                <span
                  class="badge rounded-pill text-bg-success"
                  v-if="row.status === 'Visited'"
                  >Visited</span
                >
                <span
                  class="badge rounded-pill text-bg-warning"
                  v-else-if="row.status === 'Wishlist'"
                  >Wishlist</span
                >
                <span class="small text-muted"
                  >{{ row.price_range }} · {{ row.hours }}</span
                >
              </div>
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
          <div class="row filters g-2">
            <div class="col-6">
              <select id="pStatus" class="form-select" v-model="selectedStatus">
                <option value="">Any status</option>
                <option value="Visited">Visited</option>
                <option value="Wishlist">Wishlist</option>
              </select>
            </div>
            <div class="col-6">
              <v-select
                :options="categoriesOptions"
                v-model="selectedCategory"
                placeholder="All Places"
              ></v-select>
            </div>
          </div>
        </div>
        <div class="card-responsive" v-if="filteredPlaces.length > 0">
          <div class="list-group list-group-flush places-list flex-grow-1">
            <button
              type="button"
              class="list-group-item list-group-item-action d-flex align-items-center gap-3 py-3"
              active-class="active"
              style="border-color: #f1dfe3; color:"
              v-for="(place, index) in filteredPlaces"
              :key="index"
            >
              <span class="fs-4">{{ place.categories?.icon }}</span
              ><span class="flex-grow-1 text-start text-truncate"
                ><span class="d-block fw-semibold text-truncate">{{
                  place.name
                }}</span
                ><small class="text-muted"
                  >{{ place.categories?.name }} · {{ place.address }}</small
                ></span
              >
              <span
                class="badge rounded-pill text-bg-success"
                v-if="place.status === 'Visited'"
                >Visited</span
              >
              <span
                class="badge rounded-pill text-bg-warning"
                v-else-if="place.status === 'Wishlist'"
                >Wishlist</span
              >
            </button>
          </div>
        </div>
        <div class="text-center py-5" role="status" v-else>
          <i class="bi bi-geo-alt fs-1 text-muted"></i>
          <h2 class="h5 mt-3">No places yet</h2>
          <p class="text-muted">Add your first place to start planning.</p>
          <router-link class="btn btn-rose" to="/admin/places">
            Add place
          </router-link>
        </div>
      </div>
    </aside>
  </div>
</template>
