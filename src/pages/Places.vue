<script setup>
import { computed, nextTick, onMounted, ref } from "vue";
import { Modal } from "bootstrap";
import { supabase } from "@/lib/supabase";
import Swal from "sweetalert2";

const placesFormMode = ref("create");
const previewMap = ref("");

const placesForm = ref({
  name: "",
  category_id: "",
  pinpoint: "",
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

const latPoint = ref("");
const lngPoint = ref("");

async function submitPlacesForm() {
  const [lat, lng] = placesForm.value.pinpoint.split(/[ ,]+/);
  latPoint.value = lat;
  lngPoint.value = lng;
  if (placesFormMode.value === "create") {
    const { error } = await supabase.from("places").insert({
      name: placesForm.value.name,
      category_id: placesForm.value.category_id,
      lat: lat,
      lng: lng,
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
      pinpoint: "",
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
.map-embed :deep(iframe) {
  width: 100% !important;
  height: 100%;
  border: 0;
}
.map-embed {
  aspect-ratio: 16 / 9;
  overflow: auto;
  border-radius: 8px;
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
              <option
                :value="row.id"
                v-for="(row, index) in fetchCategory"
                :key="index"
              >
                {{ row.name }}
              </option>
            </select>
          </div>
          <div class="col-md-4 col-lg-2">
            <select class="form-select">
              <option selected>All Status</option>
              <option value="1">Visited</option>
              <option value="2">Want to go</option>
              <option value="3">Planned</option>
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
        <button class="btn btn-coral px-4" @click="openPlaceForm">
          <i class="fa-solid fa-plus"></i> Add Place
        </button>
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
                :style="{ backgroundColor: value.category?.color }"
              >
                {{ value.category?.name }}
              </span>

              <span
                class="badge bg-danger-subtle text-danger-emphasis"
                v-if="value.status === 1"
                >Visited</span
              >

              <span
                class="badge bg-warning-subtle text-warning-emphasis"
                v-else-if="value.status === 2"
                >Want to go</span
              >
              <span
                class="badge bg-success-subtle text-success-emphasis"
                v-else-if="value.status === 3"
                >Planning</span
              >
            </div>
            <div class="place-meta">📍 Panglao, Bohol</div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="modal fade" ref="modalRef" tabindex="-1">
    <div class="modal-dialog modal-xl modal-dialog-scrollable">
      <form @submit.prevent="submitPlacesForm">
        <div class="modal-content">
          <div class="modal-header text-white" style="background: #e8536b">
            <h2 class="fs-5 mb-0">Add Place</h2>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-12 col-md-5 mb-4">
                <div class="mb-3">
                  <label class="form-label">Name</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="e.g. Jollibee"
                    required
                    v-model="placesForm.name"
                  />
                </div>

                <div class="row">
                  <div class="col-12 mb-4">
                    <label class="form-label">Lat</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Copy the Lat and Lng from the Google Maps"
                      required
                      v-model="placesForm.pinpoint"
                    />
                  </div>
                  <div class="col-6 mb-4">
                    <label class="form-label">Category</label>
                    <select
                      class="form-select"
                      required
                      v-model="placesForm.category_id"
                    >
                      <option
                        :value="value.id"
                        v-for="(value, index) in fetchCategory"
                        :key="index"
                      >
                        {{ value.name }}
                      </option>
                    </select>
                  </div>
                  <div class="col-6 mb-4">
                    <label class="form-label">Price Range</label>
                    <input
                      type="text"
                      class="form-control"
                      required
                      v-model="placesForm.price_range"
                    />
                  </div>
                  <div class="col-12 mb-4">
                    <label class="form-label">Address</label>
                    <input
                      type="text"
                      class="form-control"
                      required
                      v-model="placesForm.address"
                    />
                  </div>
                  <div class="col-12 mb-3">
                    <label class="form-label">Notes</label>
                    <textarea
                      class="form-control"
                      rows="4"
                      v-model="placesForm.notes"
                    ></textarea>
                  </div>
                </div>
              </div>

              <div class="col-12 col-md-7 mb-4">
                <div class="mb-3">
                  <label class="form-label">Map Url</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="placesForm.map_url"
                  />
                </div>
                <div class="mb-3">
                  <label class="form-label">Preview Map</label>
                  <div class="ratio ratio-4x3">
                    <p v-html="placesForm.map_url"></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-danger px-4"
              @click="closeProductModalForm"
            >
              Close
            </button>
            <button type="submit" class="btn btn-success px-4">Save</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
