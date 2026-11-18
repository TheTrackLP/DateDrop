<script setup>
import { supabase } from "@/Lib/supabase";
import { closeModal, openModal } from "@/Reuseables";
import { computed, onMounted, ref } from "vue";

const memoriesFormMode = ref("create");
const memoriesForm = ref({
  title: "",
  date: "",
  place_id: "",
  caption: "",
  notes: "",
  photo_link: "",
});

const memoriesFormModal = ref(null);
const openFormModal = () => {
  openModal(memoriesFormModal);
  memoriesFormMode.value = "create";
};

const closeFormModal = () => {
  closeModal(memoriesFormModal);
};

const placeLists = ref([]);
const fetchPlacesList = async () => {
  const { data, error } = await supabase
    .from("places")
    .select(`*, categories (name, icon, color)`);
  placeLists.value = data;
};
const placesOptions = computed(() =>
  placeLists.value.map((c) => ({ label: `${c.name}`, value: c.id })),
);

onMounted(fetchPlacesList);

const handleFormSubmit = async () => {
  if(memoriesFormMode.value === 'create'){
    memor
  }
}
</script>

<style>
.card-responsive {
  height: 600px;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
<template>
  <div class="d-flex flex-wrap justify-content-between align-items-start mb-4">
    <div>
      <h1 class="h3 mb-1">Memories</h1>
      <p class="text-muted mb-0">
        Moments worth keeping. <strong class="text-body">6</strong> memories so
        far.
      </p>
    </div>
    <button type="button" class="btn btn-rose" @click="openFormModal">
      <i class="fa-solid fa-plus"></i> New memory
    </button>
  </div>

  <!-- Filters -->
  <div class="card mb-4">
    <div class="card-body">
      <form class="row g-2" onsubmit="return false;">
        <div class="col-12 col-md-4">
          <label for="fSearch" class="visually-hidden">Search places</label>
          <div class="input-group">
            <span class="input-group-text bg-white"
              ><i class="fa-solid fa-magnifying-glass"></i></span
            ><input
              type="search"
              id="fSearch"
              class="form-control"
              placeholder="Search by title or notes"
            />
          </div>
        </div>
        <div class="col-6 col-md-3">
          <label for="fPlace" class="visually-hidden">Place</label>
          <v-select
            :options="placesOptions"
            placeholder="All Places"
          ></v-select>
        </div>
        <div class="col-6 col-md-2">
          <label for="fPlatform" class="visually-hidden">Platform</label
          ><select id="fPlatform" class="form-select">
            <option value="">Any link</option>
            <option>Facebook</option>
            <option>Instagram</option>
          </select>
        </div>

        <div class="col-4 col-md-1 d-grid">
          <button
            type="reset"
            class="btn btn-outline-secondary"
            aria-label="Clear filters"
          >
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
      </form>
    </div>
  </div>

  <!-- Memories grid -->
  <div class="card-responsive">
    <div class="row g-3">
      <div class="col-md-6 col-xl-4" v-for="value in 20">
        <article class="card h-100 shadow-sm">
          <div
            class="d-flex justify-content-between align-items-center px-3 py-2 rounded-top"
            style="background: #92400e1a; color: #92400e"
          >
            <span class="fw-semibold">☕ Café Terraza</span>
            <span class="badge text-bg-light border text-body"
              >Oct 5, 2026</span
            >
          </div>
          <div class="card-body">
            <h2 class="h5 mb-1">Sunset at Café Terraza</h2>
            <p class="fst-italic text-muted mb-2">
              “The whole city lit up below us.”
            </p>
            <p class="small mb-0 text-break">
              We got the corner table, ordered too much, and stayed until the
              lights came on across the city.
            </p>
          </div>
          <div
            class="card-footer bg-white d-flex flex-wrap justify-content-between align-items-center gap-2"
          >
            <a
              href="#"
              class="btn btn-sm btn-outline-secondary"
              target="_blank"
              rel="noopener noreferrer"
              ><i class="fa-solid fa-camera"></i> Open on
              <span class="badge text-bg-primary" style="">Facebook</span></a
            >
            <div
              class="btn-group btn-group-sm"
              role="group"
              aria-label="Actions for Sunset at Café Terraza"
            >
              <button
                type="button"
                class="btn btn-outline-secondary"
                data-bs-toggle="modal"
                data-bs-target="#viewModal"
                aria-label="View Sunset at Café Terraza"
              >
                <i class="fa-solid fa-eye"></i>
              </button>
              <button
                type="button"
                class="btn btn-outline-secondary"
                data-bs-toggle="modal"
                data-bs-target="#memoryModal"
                aria-label="Edit Sunset at Café Terraza"
              >
                <i class="fa-solid fa-pencil"></i>
              </button>
            </div>
          </div>
        </article>
      </div>
    </div>
  </div>

  <!-- Empty state (swap in when there are no memories)
      <div class="text-center py-5" role="status">
        <div class="display-4">💕</div>
        <h2 class="h5 mt-3">No memories yet</h2>
        <p class="text-muted">After a date, save a few words and a link to your photos.</p>
        <button type="button" class="btn btn-rose" data-bs-toggle="modal" data-bs-target="#memoryModal">New memory</button>
      </div>
      -->

  <!-- Add/Edit Memories -->
  <div
    class="modal fade"
    ref="memoriesFormModal"
    tabindex="-1"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
  >
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">New Memory</h4>
          <button
            type="button"
            class="btn-close"
            @click="closeFormModal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row mb-3">
            <div class="col-md-8">
              <label for="">Title</label>
              <input
                type="text"
                class="form-control"
                placeholder="e.g. Baybay Beach Walk"
              />
            </div>
            <div class="col-md-4">
              <label for="">Date</label>
              <input type="date" class="form-control" />
            </div>
          </div>
          <div class="form-group mb-3">
            <label for="">Place</label>
            <v-select
              :options="placesOptions"
              placeholder="Choose a visited place..."
            ></v-select>
            <small>Only places marked as Visited should appear here. </small>
          </div>
          <div class="form-group mb-3">
            <label for="">Caption</label>
            <input type="text" class="form-control" />
          </div>
          <div class="form-group mb-3">
            <label for="">Notes</label>
            <textarea
              name=""
              class="form-control"
              rows="3"
              placeholder="One line you'd say out loud..."
            ></textarea>
          </div>
          <div class="form-group mb-3">
            <label for="">Photo Link</label>
            <input
              type="text"
              class="form-control"
              placeholder="https://www.faceboo.com/..."
            />
            <small
              >Paste one Facebook or Instagram link. Photos open there, not on
              this page.
            </small>
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
          <button type="button" class="btn btn-rose">Save Memory</button>
        </div>
      </div>
    </div>
  </div>
</template>
