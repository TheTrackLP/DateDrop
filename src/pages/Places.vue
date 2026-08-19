<script setup>
import { nextTick, onMounted, ref } from "vue";
import { Modal } from "bootstrap";
import { supabase } from "@/lib/supabase";
import Swal from "sweetalert2";

const placesFormMode = ref("create");
const previewMap = ref("");

const placesForm = ref({
  name: "",
  category_id: "",
  lat: "",
  lng: "",
  address: "",
  price_range: "",
  notes: "",
  map_url: "",
});

const modalRef = ref(null);
let modalInstance = null;

const openPlacesModalForm = () => {
  nextTick(() => {
    modalInstance = new Modal(modalRef.value);
    modalInstance.show();
  });
};

const openPlaceForm = () => {
  placesFormMode.value = "create";
  openPlacesModalForm();
};

const closeProductModalForm = () => {
  modalInstance?.hide();
};

async function submitPlacesForm() {
  if (placesFormMode.value === "create") {
    const { error } = await supabase.from("places").insert({
      name: placesForm.value.name,
      category_id: placesForm.value.category_id,
      lat: placesForm.value.lat,
      lng: placesForm.value.lng,
      address: placesForm.value.address,
      price_range: placesForm.value.price_range,
      notes: placesForm.value.notes,
      map_url: placesForm.value.map_url,
    });

    if (error) {
      const resultError = await Swal.fire({
        title: "Error!",
        text: error.message,
        icon: "error",
        timer: 1500,
        showConfirmButton: false,
      });
      return;
    }
    const resultSuccess = await Swal.fire({
      title: "Success!",
      text: "Success, Place Added!",
      icon: "success",
      timer: 1500,
      showConfirmButton: false,
    });

    placesFormMode.value = "create";
    placesForm.value = {
      name: "",
      category_id: "",
      lat: "",
      lng: "",
      address: "",
      price_range: "",
      notes: "",
      map_url: "",
    };
    closeProductModalForm();
  }
}

const fetchCategory = ref([]);
const fetchPlaces = ref([]);
async function fetchData() {
  const { data: category, error } = await supabase.from("category").select("*");
  fetchCategory.value = category;

  const { data: places } = await supabase.from("places").select(`
  *,
  category(name, color)
  `);
  fetchPlaces.value = places;
}
onMounted(fetchData);
</script>

<style scoped>
.place-image {
  width: 150px;
  height: 100px;
  object-fit: cover;
  border-radius: 7px;
}
.place-name {
  font-size: 16px;
  font-weight: 500;
  color: #212529;
}
.card:hover {
  border-color: #e8536b;
}
.btn-coral {
  background: #e8536b;
  color: #fff;
  border-radius: 10px;
}
.btn-coral:hover {
  background: #fff;
  color: #e8536b;
  border-radius: 10px;
}
.modal-content {
  border-radius: 20px;
}
@media (max-width: 768px) {
  .place-image {
    width: 75px;
    height: 60px;
  }
}
</style>

<template>
  <div class="content-body mt-4">
    <div
      class="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4"
    >
      <div>
        <h3 class="mb-1">Places</h3>
        <p class="text-muted mb-0">
          Manage and keep track of places you have visited or want to visit.
        </p>
      </div>
      <button class="btn btn-coral px-4" @click="openPlaceForm">
        <i class="fa-solid fa-plus"></i> Add Place
      </button>
    </div>
    <!-- Statistics -->
    <div class="row g-3 mb-4">
      <div class="col-md-3">
        <div class="card shadow-sm">
          <div class="card-body">
            <div class="text-muted small">Total Places</div>
            <h4 class="mb-0 mt-1">48</h4>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card shadow-sm">
          <div class="card-body">
            <div class="text-muted small">Visited</div>
            <h4 class="mb-0 mt-1">21</h4>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card shadow-sm">
          <div class="card-body">
            <div class="text-muted small">Want to Go</div>
            <h4 class="mb-0 mt-1">19</h4>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card shadow-sm">
          <div class="card-body">
            <div class="text-muted small">Planned</div>
            <h4 class="mb-0 mt-1">8</h4>
          </div>
        </div>
      </div>
    </div>
    <!-- Filters -->
    <div class="card shadow-sm border-0 mb-3">
      <div class="card-body">
        <div class="row g-2">
          <!-- Search -->
          <div class="col-lg-4">
            <div class="input-group">
              <span class="input-group-text bg-white"> 🔍 </span>
              <input
                type="text"
                class="form-control"
                placeholder="Search places..."
              />
            </div>
          </div>
          <!-- Category -->
          <div class="col-md-4 col-lg-2">
            <select class="form-select">
              <option selected>All Categories</option>
              <option>Resort</option>
              <option>Restaurant</option>
              <option>Cafe</option>
              <option>Beach</option>
              <option>Pool</option>
              <option>Fast Food</option>
              <option>Tourist Spot</option>
            </select>
          </div>
          <!-- Status -->
          <div class="col-md-4 col-lg-2">
            <select class="form-select">
              <option selected>All Status</option>
              <option>Visited</option>
              <option>Want to go</option>
              <option>Planned</option>
            </select>
          </div>
        </div>
      </div>
    </div>
    <!-- Places List -->
    <div class="card shadow-sm border-0">
      <div
        class="card-header bg-white d-flex justify-content-between align-items-center"
      >
        <div>
          <strong>All Places</strong>
          <span class="text-muted ms-2">48 places</span>
        </div>
        <button class="btn btn-sm btn-outline-secondary">Clear Filters</button>
      </div>
    </div>
    <div class="card" v-for="value in fetchPlaces">
      <div class="card-body py-3">
        <div class="d-flex align-items-center gap-3">
          <img
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=200"
            class="place-image"
            alt="Bohol Bee Farm Resort"
          />
          <div class="flex-grow-1">
            <div class="place-name mb-1 uppercase">{{ value.name }}</div>
            <div class="d-flex flex-wrap gap-1 mb-1">
              <span
                class="badge rounded-pill"
                :class="`text-bg-${value.category?.color}`"
              >
                {{ value.category?.name }}
              </span>
              <span class="badge rounded-pill text-bg-primary"> Visited </span>
            </div>
            <div class="place-meta">📍 Panglao, Bohol</div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="modal fade" ref="modalRef" tabindex="-1">
    <div class="modal-dialog modal-xl">
      <form @submit.prevent="submitPlacesForm">
        <div class="modal-content">
          <div class="modal-header text-white" style="background: #e8536b">
            <h2>Add Place</h2>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-6 mb-4">
                <div class="col-12 mb-4">
                  <div class="form-group">
                    <label for="">Name</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="e.g. Jollibee"
                      required
                      v-model="placesForm.name"
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="col-6 mb-4">
                    <div class="form-group">
                      <label for="">Lat</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Copy from Google Maps"
                        required
                        v-model="placesForm.lat"
                      />
                    </div>
                  </div>
                  <div class="col-6 mb-4">
                    <div class="form-group">
                      <label for="">Lng</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Copy from Google Maps"
                        required
                        v-model="placesForm.lng"
                      />
                    </div>
                  </div>
                  <div class="col-6 mb-4">
                    <div class="form-group">
                      <label for="">Category</label>
                      <select
                        class="form-select"
                        required
                        v-model="placesForm.category_id"
                      >
                        <option
                          :value="value.id"
                          v-for="(value, index) in fetchCategory"
                        >
                          {{ value.name }}
                        </option>
                      </select>
                    </div>
                  </div>
                  <div class="col-6 mb-4">
                    <div class="form-group">
                      <label for="">Price Range</label>
                      <input
                        type="text"
                        class="form-control"
                        required
                        v-model="placesForm.price_range"
                      />
                    </div>
                  </div>
                  <div class="col-12 mb-4">
                    <div class="form-group">
                      <label for="">Address</label>
                      <input
                        type="text"
                        class="form-control"
                        required
                        v-model="placesForm.address"
                      />
                    </div>
                  </div>
                  <div class="col-12 mb-4">
                    <div class="form-group">
                      <label for="">Notes</label>
                      <textarea
                        class="form-control"
                        rows="4"
                        v-model="placesForm.notes"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-6 mb-4">
                <div class="form-group mb-4">
                  <label for="">Map Url</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="placesForm.map_url"
                  />
                </div>
                <div class="form-group mb-4">
                  <label for="">Preview Map</label>
                  <iframe
                    :src="placesForm.map_url"
                    width="500"
                    height="450"
                    style="border: 0"
                    allowfullscreen=""
                    loading="lazy"
                    referrerpolicy="strict-origin-when-cross-origin"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-danger px-4" @click="closeProductModalForm">
              Close
            </button>
            <button class="btn btn-success px-4">Save</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
