<script setup>
import { supabase } from "@/Lib/supabase";
import { formattedDate } from "@/Reuseables";
import { onMounted, ref } from "vue";

const memoriesList = ref([]);
const placesList = ref([]);
const categoriesList = ref([]);
const totalPlaces = ref(null);
const totalMemories = ref(null);

const fetchListings = async () => {
  const { data: places } = await supabase
    .from("places")
    .select(`*, categories (name, icon)`)
    .limit(4)
    .order("created_at", { ascending: true });

  const { count: placeCount } = await supabase
    .from("places")
    .select("*", { count: "exact", head: true });

  const { data: memories } = await supabase
    .from("memories")
    .select(`*, places (name)`)
    .limit(3)
    .order("created_at", { ascending: true });

  const { count: memoriesCount } = await supabase
    .from("memories")
    .select("*", { count: "exact", head: true });

  const { data: categories } = await supabase.from("categories").select("*");

  categoriesList.value = categories;
  totalPlaces.value = placeCount;
  totalMemories.value = memoriesCount;
  placesList.value = places;
  memoriesList.value = memories;
};

onMounted(fetchListings);
</script>
<style>
.category-response {
  height: 270px;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
<template>
  <section data-view="dashboard">
    <div class="row g-3 mb-4">
      <div class="col-6 col-xl-3">
        <div class="card h-100 shadow-sm">
          <div class="card-body d-flex align-items-center gap-3">
            <span
              class="stat-icon rounded d-inline-flex align-items-center justify-content-center"
              >📍</span
            >
            <div>
              <div class="text-muted small">Places saved</div>
              <div class="h4 mb-0">{{ totalPlaces }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-6 col-xl-3">
        <div class="card h-100 shadow-sm">
          <div class="card-body d-flex align-items-center gap-3">
            <span
              class="stat-icon rounded d-inline-flex align-items-center justify-content-center"
              >✅</span
            >
            <div>
              <div class="text-muted small">Visited</div>
              <div class="h4 mb-0">11</div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-6 col-xl-3">
        <div class="card h-100 shadow-sm">
          <div class="card-body d-flex align-items-center gap-3">
            <span
              class="stat-icon rounded d-inline-flex align-items-center justify-content-center"
              >⭐</span
            >
            <div>
              <div class="text-muted small">On the wishlist</div>
              <div class="h4 mb-0">14</div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-6 col-xl-3">
        <div class="card h-100 shadow-sm">
          <div class="card-body d-flex align-items-center gap-3">
            <span
              class="stat-icon rounded d-inline-flex align-items-center justify-content-center"
              >📸</span
            >
            <div>
              <div class="text-muted small">Memories</div>
              <div class="h4 mb-0">{{ totalMemories }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row g-3 mb-3">
      <!-- Places by category -->
      <div class="col-lg-7">
        <div class="card h-100 shadow-sm">
          <div
            class="card-header bg-white d-flex justify-content-between align-items-center"
          >
            <strong>Places by category</strong
            ><router-link
              to="/admin/categories"
              class="small text-rose text-decoration-none"
              >Manage categories</router-link
            >
          </div>
          <div class="category-response">
            <div class="card-body">
              <div
                class="mb-3"
                v-for="(category, index) in categoriesList"
                :key="index"
              >
                <div class="d-flex justify-content-between small mb-1">
                  <span>{{ category.icon }} {{ category.name }}</span
                  ><span class="text-muted">2 of 5 visited</span>
                </div>
                <div
                  class="progress"
                  style="height: 8px"
                  role="progressbar"
                  aria-label="Beach visited"
                  aria-valuenow="40"
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  <div
                    class="progress-bar"
                    style="width: 40%"
                    :style="{ backgroundColor: category.color }"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Where to next -->
      <div class="col-lg-5">
        <div class="card next-card h-100 shadow-sm border-0 btn-rose">
          <div class="card-body d-flex flex-column p-4">
            <div class="small text-uppercase opacity-75 mb-2">
              Where to next?
            </div>
            <div class="display-5 mb-2">🏖️</div>
            <h2 class="h4">Mantalinga Island</h2>
            <p class="mb-1 opacity-75">📍 Off Baybay Beach, Roxas City</p>
            <p class="opacity-75">
              Short boat ride from Baybay. Good for kayaking and sailing.
            </p>
            <div class="mt-auto d-flex flex-wrap gap-2">
              <a href="#" class="btn btn-light text-rose fw-semibold"
                >View place</a
              >
              <span
                class="badge rounded-pill bg-light text-body align-self-center"
                >Wishlist · ₱₱</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row g-3">
      <!-- Recently added places -->
      <div class="col-lg-6">
        <div class="card h-100 shadow-sm">
          <div
            class="card-header bg-white d-flex justify-content-between align-items-center"
          >
            <strong>Recently added places</strong
            ><router-link
              to="/admin/places"
              class="small text-rose text-decoration-none"
              >View all</router-link
            >
          </div>
          <ul class="list-group list-group-flush">
            <li
              class="list-group-item d-flex align-items-center gap-3 py-3"
              v-for="(place, index) in placesList"
              :key="index"
            >
              <span
                class="rounded d-inline-flex align-items-center justify-content-center fs-5"
                style="width: 40px; height: 40px"
                :style="{ backgroundColor: place.categories?.color }"
                >{{ place.categories?.icon }}</span
              >
              <div class="flex-grow-1 text-truncate">
                <div class="fw-semibold text-truncate">{{ place.name }}</div>
                <div class="small text-muted">{{ place.categories?.name }}</div>
              </div>
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
            </li>
          </ul>
        </div>
      </div>

      <!-- Recent memories -->
      <div class="col-lg-6">
        <div class="card h-100 shadow-sm">
          <div
            class="card-header bg-white d-flex justify-content-between align-items-center"
          >
            <strong>Recent memories</strong
            ><router-link
              to="/admin/memories"
              class="small text-rose text-decoration-none"
              >View all</router-link
            >
          </div>
          <ul class="list-group list-group-flush">
            <li
              class="list-group-item py-3"
              v-for="(memory, index) in memoriesList"
              :key="index"
            >
              <div class="d-flex justify-content-between gap-2">
                <span class="fw-semibold text-truncate">{{ memory.title }}</span
                ><small class="text-muted text-nowrap">{{
                  formattedDate(memory.date)
                }}</small>
              </div>
              <div class="small text-muted fst-italic text-truncate">
                “The whole city lit up below us.”
              </div>
              <div class="small mt-1">
                {{ memory.places?.name }} ·
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-decoration-none"
                  >Open on Facebook</a
                >
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
