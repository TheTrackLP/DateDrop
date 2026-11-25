<script setup>
import { supabase } from "@/Lib/supabase";
import { formattedDate } from "@/Reuseables";
import { onMounted, ref } from "vue";

const memoriesList = ref([]);
const placesList = ref([]);
const categoriesList = ref([]);
const totalPlaces = ref(0);
const totalMemories = ref(0);
const totalWishlist = ref(0);
const totalVisited = ref(0);

const loading = ref(false);
const fetchListings = async () => {
  loading.value = true;

  try {
    const [
      places,
      placeCount,
      wishlistCount,
      visitCount,
      memories,
      memoriesCount,
      categories,
    ] = await Promise.all([
      supabase
        .from("places")
        .select(`*, categories (name, icon)`)
        .limit(4)
        .order("created_at", { ascending: true }),

      supabase.from("places").select("id", { count: "exact", head: true }),

      supabase
        .from("places")
        .select("id", { count: "exact", head: true })
        .eq("status", "Wishlist"),

      supabase
        .from("places")
        .select("id", { count: "exact", head: true })
        .eq("status", "Visited"),

      supabase
        .from("memories")
        .select(`*, places (name)`)
        .limit(3)
        .order("created_at", { ascending: true }),

      supabase.from("memories").select("*", { count: "exact", head: true }),

      supabase
        .from("categories")
        .select(
          `*,
              total:places(count),
              visited:places!left(count)
          `,
        )
        .eq("visited.status", "Visited"),
    ]);

    const results = [
      categories,
      placeCount,
      memoriesCount,
      wishlistCount,
      visitCount,
      places,
      memories,
    ];

    const failed = results.find((result) => result.error);

    if (failed) throw failed.error;

    categoriesList.value = categories.data;
    placesList.value = places.data;
    memoriesList.value = memories.data;
    totalPlaces.value = placeCount.count;
    totalWishlist.value = wishlistCount.count;
    totalMemories.value = memoriesCount.count;
    totalVisited.value = visitCount.count;
  } catch (error) {
    console.error("Dashboard fetching error:", error);
  } finally {
    loading.value = false;
  }
};

onMounted(fetchListings);

const progressBarPresent = (c) => {
  const total = c.total?.[0]?.count ?? 0;
  const visited = c.visited?.[0]?.count ?? 0;
  return total ? Math.round((visited / total) * 100) : 0;
};
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
              <div class="h4 mb-0">{{ totalVisited }}</div>
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
              <div class="h4 mb-0">{{ totalWishlist }}</div>
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
          <div class="category-response" v-if="categoriesList.length > 0">
            <div class="card-body">
              <div
                class="mb-3"
                v-for="(category, index) in categoriesList"
                :key="index"
              >
                <div class="d-flex justify-content-between small mb-1">
                  <span>{{ category.icon }} {{ category.name }}</span>

                  <span class="text-muted"
                    >{{ category.visited?.[0]?.count }} of
                    {{ category.total?.[0]?.count }} visited</span
                  >
                </div>
                <div class="progress" style="height: 8px" role="progressbar">
                  <div
                    class="progress-bar"
                    :style="{
                      backgroundColor: category.color,
                      width: progressBarPresent(category) + '%',
                    }"
                  ></div>
                </div>
              </div>
            </div>
          </div>
          <div class="text-center py-5" role="status" v-else>
            <i class="bi bi-tags fs-1 text-muted"></i>
            <h2 class="h5 mt-3">No categories yet</h2>
            <p class="text-muted">
              Create a category to start grouping your places.
            </p>
            <router-link class="btn btn-rose" to="/admin/categories">
              Add Categories
            </router-link>
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
          <ul class="list-group list-group-flush" v-if="placesList.length > 0">
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
                v-if="place.status === 'wisited'"
                >Visited</span
              >
              <span
                class="badge rounded-pill text-bg-warning"
                v-else-if="place.status === 'wishlist'"
                >Wishlist</span
              >
            </li>
          </ul>
          <ul v-else>
            <div class="text-center py-5" role="status">
              <i class="bi bi-geo-alt fs-1 text-muted"></i>
              <h2 class="h5 mt-3">No places yet</h2>
              <p class="text-muted">Add your first place to start planning.</p>
              <router-link class="btn btn-rose" to="/admin/places">
                Add place
              </router-link>
            </div>
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
          <ul
            class="list-group list-group-flush"
            v-if="memoriesList.length > 0"
          >
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
          <ul v-else>
            <div class="text-center py-5" role="status">
              <i class="bi bi-tags fs-1 text-muted"></i>
              <h2 class="h5 mt-3">No memories yet</h2>
              <p class="text-muted">
                After a date, save a few words and a link to your photos.
              </p>
              <router-link class="btn btn-rose" to="/admin/memories">
                Add Memories
              </router-link>
            </div>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
