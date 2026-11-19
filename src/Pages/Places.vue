<script setup>
import { supabase } from "@/Lib/supabase";
import { closeModal, openModal } from "@/Reuseables";
import Swal from "sweetalert2";
import { computed, onMounted, ref } from "vue";
import VueSelect from "vue3-select-component";

const placeFormMode = ref("create");
const placeFormModal = ref(null);
const placeForm = ref({
  name: "",
  category_id: "",
  address: "",
  map_link: "",
  price_range: "",
  hours: "",
  link: "",
  notes: "",
  status: "",
});

const openFormModal = () => {
  openModal(placeFormModal);
  placeFormMode.value = "create";
};

const getplaceCategoryName = ref("");
const getplaceCategoryIcon = ref("");
const getplaceCategoryColor = ref("");
const getPlaceName = ref("");
const getPlaceMap = ref("");
const getPlaceStatus = ref("");
const getPlacenotes = ref("");
const getPlaceAddress = ref("");
const getPlacePrice = ref("");
const getPlaceHours = ref("");
const getPlaceContact = ref("");
const placeViewModal = ref(null);
const openViewModal = (place) => {
  openModal(placeViewModal);

  getPlaceName.value = place.name;
  getPlaceMap.value = place.map_link;
  getPlaceStatus.value = place.status;
  getPlacenotes.value = place.notes;
  getPlaceAddress.value = place.address;
  getPlacePrice.value = place.price_range;
  getPlaceHours.value = place.hours;
  getPlaceContact.value = place.link;
  getplaceCategoryName.value = place.categories?.name;
  getplaceCategoryIcon.value = place.categories?.icon;
  getplaceCategoryColor.value = place.categories?.color;
};

const closeFormModal = () => {
  closeModal(placeFormModal);
  placeFormMode.value = "create";

  placeForm.value = {
    name: "",
    category_id: "",
    address: "",
    map_link: "",
    price_range: "",
    hours: "",
    link: "",
    notes: "",
    status: "",
  };
};

const categoriesList = ref([]);
const fetchCategories = async () => {
  const { data, error } = await supabase.from("categories").select("*");
  categoriesList.value = data;
};
const categoryOptions = computed(() =>
  categoriesList.value.map((c) => ({ label: c.name, value: c.id })),
);

onMounted(fetchCategories);

const placesList = ref([]);
const fetchPlacesList = async () => {
  const { data, error } = await supabase
    .from("places")
    .select(`*, categories (name, icon, color)`);
  placesList.value = data;
};

onMounted(fetchPlacesList);

const placeFormSubmit = async () => {
  if (placeFormMode.value === "create") {
    placeFormMode.value = "create";

    const { error } = await supabase.from("places").insert({
      name: placeForm.value.name,
      category_id: placeForm.value.category_id,
      address: placeForm.value.address,
      map_link: placeForm.value.map_link,
      price_range: placeForm.value.price_range,
      hours: placeForm.value.hours,
      link: placeForm.value.link,
      notes: placeForm.value.notes,
      status: placeForm.value.status,
    });

    if (error) {
      Swal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
      });
    }
    closeFormModal();
    await fetchPlacesList();
    Swal.fire({
      title: "Success",
      text: "Success, Place Added",
      icon: "success",
      timer: 2000,
    });
  } else {
    placeFormMode.value = "edit";

    const { error } = await supabase
      .from("places")
      .update({
        name: placeForm.value.name,
        category_id: placeForm.value.category_id,
        address: placeForm.value.address,
        map_link: placeForm.value.map_link,
        price_range: placeForm.value.price_range,
        hours: placeForm.value.hours,
        link: placeForm.value.link,
        notes: placeForm.value.notes,
        status: placeForm.value.status,
      })
      .eq("id", placeForm.value.id);

    if (error) {
      Swal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
      });
    }
    closeFormModal();
    await fetchPlacesList();
    Swal.fire({
      title: "Success",
      text: "Success, Place Updated",
      icon: "success",
      timer: 2000,
    });
  }
};

const fetchPlaceInfo = async (place) => {
  const { data, error } = await supabase
    .from("places")
    .select("*")
    .eq("id", place.id)
    .single();

  openModal(placeFormModal);
  placeFormMode.value = "edit";
  placeForm.value = data;
};

const selectedText = ref("");
const selectedCategory = ref("");
const selectedStatus = ref("");
const filteredPlaces = computed(() => {
  const textQuery = selectedText.value.toLowerCase().trim();
  const categoryQuery = selectedCategory.value;
  const statusQuery = selectedStatus.value;

  return placesList.value.filter((p) => {
    const matchText = !textQuery || p.name.toLowerCase().includes(textQuery);
    const matchCategory = !categoryQuery || p.category_id === categoryQuery;
    const matchStatus = !statusQuery || p.status === statusQuery;

    return matchText && matchCategory && matchStatus;
  });
});
</script>
<style>
.card-responsive {
  height: 600px;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
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
    <button type="button" class="btn btn-rose" @click="openFormModal">
      <i class="fa-solid fa-plus"></i> Add place
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
              ><i class="fa-solid fa-magnifying-glass"></i></span
            ><input
              type="search"
              id="fSearch"
              class="form-control"
              placeholder="Search by name or area"
              v-model="selectedText"
            />
          </div>
        </div>
        <div class="col-6 col-md-2">
          <label for="fCategory" class="visually-hidden">Category</label>
          <VueSelect
            :options="categoryOptions"
            placeholder="Select Category"
            v-model="selectedCategory"
          />
        </div>
        <div class="col-6 col-md-2">
          <label for="fStatus" class="visually-hidden">Status</label
          ><select id="fStatus" v-model="selectedStatus" class="form-select">
            <option value="">Any status</option>
            <option>Wishlist</option>
            <option>Visited</option>
          </select>
        </div>

        <div class="col-4 col-md-1 d-grid">
          <button
            type="reset"
            class="btn btn-outline-secondary px-5"
            aria-label="Clear filters"
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  </div>
  <div class="card-responsive">
    <div class="row g-3">
      <div
        class="col-md-6 col-xl-3"
        v-for="(place, index) in filteredPlaces"
        :key="index"
      >
        <article class="card h-100 shadow-sm">
          <div
            class="text-white d-flex justify-content-between align-items-center px-3 py-2 rounded-top"
            :style="{ backgroundColor: place.categories?.color }"
          >
            <span class="fw-semibold"
              >{{ place.categories?.icon }} {{ place.categories?.name }}</span
            >
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
            <h2 class="h5 mb-1">{{ place.name }}</h2>
            <p class="small text-muted mb-2">
              <i class="fa-solid fa-location-dot"></i> {{ place.address }}
            </p>
          </div>
          <div
            class="card-footer bg-white d-flex justify-content-between align-items-center"
          >
            <span
              class="badge rounded-pill text-bg-warning"
              v-if="place.status === 'wishlist'"
              >Wishlist</span
            >
            <span
              class="badge rounded-pill text-bg-success"
              v-else-if="place.status === 'visited'"
              >Visited</span
            >
            <div
              class="btn-group btn-group-sm"
              role="group"
              aria-label="Actions for Baybay Sunset Walk"
            >
              <button
                type="button"
                class="btn btn-outline-secondary"
                aria-label="Edit Baybay Sunset Walk"
                @click="openViewModal(place)"
              >
                <i class="fa-solid fa-eye"></i>
              </button>
              <button
                type="button"
                class="btn btn-outline-secondary"
                aria-label="Edit Baybay Sunset Walk"
                @click="fetchPlaceInfo(place)"
              >
                <i class="fa-solid fa-pencil"></i>
              </button>
            </div>
          </div>
        </article>
      </div>
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

  <!-- Add or Edit Places -->
  <div
    class="modal fade"
    ref="placeFormModal"
    tabindex="-1"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <form @submit.prevent="placeFormSubmit">
          <div class="modal-header">
            <h4 class="modal-title">
              {{ placeFormMode === "create" ? "Add" : "Update" }} Place
            </h4>
            <input type="text" v-model="placeForm.id" />
          </div>
          <div class="modal-body">
            <div class="form-group mb-3">
              <label for="">Name</label>
              <input
                type="text"
                class="form-control"
                placeholder="e.g. Baybay"
                v-model="placeForm.name"
              />
            </div>
            <div class="form-group mb-3">
              <label for="">Category</label>
              <VueSelect
                :options="categoryOptions"
                placeholder="Select a category"
                v-model="placeForm.category_id"
              />
            </div>
            <div class="form-group mb-3">
              <label for="">Address/ Area</label>
              <input
                type="text"
                class="form-control"
                placeholder="Street, Barangay. City"
                v-model="placeForm.address"
              />
            </div>
            <div class="form-group mb-3">
              <label for="">Contact</label>
              <input
                type="text"
                class="form-control"
                placeholder="Phone or Social Link"
              />
            </div>
            <div class="form-group mb-3">
              <label for="">Map Link</label>
              <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1"
                  ><i class="fa-solid fa-map-pin"></i
                ></span>
                <input
                  type="text"
                  class="form-control"
                  placeholder="https://maps.google.com/..."
                  v-model="placeForm.map_link"
                />
              </div>
            </div>
            <div class="row">
              <div class="col-md-6 mb-3">
                <label for="">Status</label>
                <select v-model="placeForm.status" class="form-select">
                  <option value="wishlist">Wishlist</option>
                  <option value="visited">Visited</option>
                </select>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6 mb-3">
                <label for="">Price Range</label>
                <select v-model="placeForm.price_range" class="form-control">
                  <option value="free">Free</option>
                  <option value="₱">₱</option>
                  <option value="₱₱">₱₱</option>
                  <option value="₱₱₱">₱₱₱</option>
                </select>
              </div>
              <div class="col-md-6 mb-3">
                <label for="">Hours</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="9 AM - 9 PM"
                  v-model="placeForm.hours"
                />
              </div>
              <div class="form-group mb-3">
                <label for="">Notes</label>
                <textarea
                  v-model="placeForm.notes"
                  class="form-control"
                  rows="3"
                ></textarea>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-secondary"
              @click="closeFormModal"
            >
              Cancel
            </button>
            <button type="submit" class="btn btn-rose">Save Place</button>
          </div>
        </form>
      </div>
    </div>
  </div>

  <!-- View Place Info -->
  <div
    class="modal fade"
    ref="placeViewModal"
    tabindex="-1"
    aria-labelledby="viewModalLabel"
    aria-hidden="true"
  >
    <div
      class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg modal-fullscreen-sm-down"
    >
      <div class="modal-content">
        <div class="modal-header align-items-start">
          <div class="flex-grow-1 text-break">
            <span
              class="badge mb-1"
              :style="{ backgroundColor: getplaceCategoryColor }"
            >
              <i class="bi me-1" :class="getplaceCategoryIcon"></i
              >{{ getplaceCategoryName }}
            </span>
            <h2 class="modal-title h5 mb-0" id="viewModalLabel">
              {{ getPlaceName }}
            </h2>
          </div>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>

        <div class="modal-body">
          <div class="d-flex flex-wrap gap-2 mb-3">
            <span
              v-if="getPlaceStatus === 'visited'"
              class="badge rounded-pill text-bg-success"
              >Visited</span
            >
            <span
              v-else-if="getPlaceStatus === 'wishlist'"
              class="badge rounded-pill text-bg-warning"
              >Wishlist</span
            >
          </div>

          <p v-if="getPlacenotes" class="text-muted mb-3 text-break">
            {{ getPlacenotes }}
          </p>

          <ul class="list-unstyled mb-0 small">
            <li class="row mb-2">
              <span class="col-5 col-sm-4 text-muted"
                ><i class="bi bi-geo-alt me-1"></i>Address</span
              >
              <span class="col-7 col-sm-8 text-break">{{
                getPlaceAddress || "—"
              }}</span>
            </li>
            <li class="row mb-2">
              <span class="col-5 col-sm-4 text-muted"
                ><i class="bi bi-cash me-1"></i>Price</span
              >
              <span class="col-7 col-sm-8">{{ getPlacePrice || "—" }}</span>
            </li>
            <li class="row mb-2">
              <span class="col-5 col-sm-4 text-muted"
                ><i class="bi bi-clock me-1"></i>Hours</span
              >
              <span class="col-7 col-sm-8">{{ getPlaceHours || "—" }}</span>
            </li>
            <li class="row">
              <span class="col-5 col-sm-4 text-muted"
                ><i class="bi bi-telephone me-1"></i>Contact</span
              >
              <span class="col-7 col-sm-8 text-break">{{
                getPlaceContact || "—"
              }}</span>
            </li>
          </ul>

          <div
            v-if="getPlaceMap"
            class="ratio ratio-16x9 mt-3 rounded overflow-hidden border"
            v-html="getPlaceMap"
          ></div>
        </div>

        <!-- <div class="modal-footer d-grid d-sm-flex">
          <a
            :href="getPlaceMapUrl || undefined"
            class="btn btn-outline-secondary"
            :class="{ disabled: !getPlaceMapUrl }"
            :aria-disabled="!getPlaceMapUrl"
            :tabindex="getPlaceMapUrl ? undefined : -1"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i class="bi bi-map me-1"></i>Open map
          </a>
          <button
            type="button"
            class="btn btn-rose"
            data-bs-dismiss="modal"
            data-bs-toggle="modal"
            data-bs-target="#placeModal"
          >
            <i class="bi bi-pencil me-1"></i>Edit
          </button>
        </div> -->
      </div>
    </div>
  </div>
</template>
