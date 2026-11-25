<script setup>
import { supabase } from "@/Lib/supabase";
import { closeModal, formattedDate, openModal } from "@/Reuseables";
import Swal from "sweetalert2";
import { computed, onMounted, ref } from "vue";

const loading = ref(false);
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

const memoriesViewModal = ref(null);
const openViewModal = () => {
  openModal(memoriesViewModal);
};

const closeFormModal = () => {
  closeModal(memoriesFormModal);
  closeModal(memoriesViewModal);
  memoriesForm.value = {
    title: "",
    date: "",
    place_id: "",
    caption: "",
    notes: "",
    photo_link: "",
  };
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

const totalMemories = ref("");
const memoriesList = ref([]);
const fetchMemoriesInfo = async () => {
  try {
    const [memories, countMemories] = await Promise.all([
      supabase.from("memories").select(`*, places (name)`),

      supabase.from("memories").select("*", { count: "exact", head: true }),
    ]);

    const results = [memories, countMemories];

    const failed = results.find((result) => result.error);

    if (failed) throw failed.error;

    memoriesList.value = memories.data;
    totalMemories.value = countMemories.count;
  } catch (error) {
    console.error("Memories fetching error", error);
  } finally {
    loading.value = false;
  }
};

onMounted(async () => {
  await Promise.all([fetchPlacesList, fetchMemoriesInfo]);
});

const fetchMemoryData = async (memory) => {
  openModal(memoriesFormModal);
  memoriesFormMode.value = "edit";
  const { data: memories } = await supabase
    .from("memories")
    .select("*")
    .eq("id", memory.id)
    .single();

  memoriesForm.value = memories;
};

const handleFormSubmit = async () => {
  if (memoriesFormMode.value === "create") {
    try {
      memoriesFormMode.value = "create";

      const { data, error } = await supabase
        .from("memories")
        .insert(memoriesForm.value);

      if (error) throw error;
      Swal.fire({
        title: "Success",
        text: "Success, Memory Added!",
        icon: "success",
        timer: 1500,
      });

      closeFormModal();
      memoriesList.value.unshift(data);
      totalMemories.value++;
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    } finally {
      loading.value = false;
    }
  } else {
    try {
      emoriesFormMode.value = "edit";

      const { error } = await supabase
        .from("memories")
        .update(memoriesForm.value)
        .eq("id", memoriesForm.value.id);

      if (error) throw error;
      Swal.fire({
        title: "Success",
        text: "Success, Memory Updated!",
        icon: "success",
        timer: 1500,
      });
      closeFormModal();
      await fetchMemoriesInfo();
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    } finally {
      loading.value = false;
    }
  }
};

const clearFilters = () => {
  selectedPlaces.value = "";
  selectedTextQuery.value = "";
};

const selectedTextQuery = ref("");
const selectedPlaces = ref("");
const filterMemory = computed(() => {
  const textQuery = selectedTextQuery.value.toLowerCase().trim();
  const placeQuery = selectedPlaces.value;

  return memoriesList.value.filter((m) => {
    const matchText =
      !textQuery ||
      m.title.toLowerCase().includes(textQuery) ||
      m.notes.toLowerCase().includes(textQuery);
    const matchPlace = !placeQuery || m.place_id === placeQuery;

    return matchText && matchPlace;
  });
});
</script>

<style>
.card-responsive {
  height: 600px;
  overflow-y: auto;
  overflow-x: hidden;
}
.card-responsive .t-truncate {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
<template>
  <div class="d-flex flex-wrap justify-content-between align-items-start mb-4">
    <div>
      <h1 class="h3 mb-1">Memories</h1>
      <p class="text-muted mb-0">
        Moments worth keeping.
        <strong class="text-body">{{ totalMemories }}</strong> memories so far.
      </p>
    </div>
    <button type="button" class="btn btn-rose" @click="openFormModal">
      <i class="fa-solid fa-plus"></i> New memory
    </button>
  </div>

  <!-- Filters -->
  <div class="card mb-4">
    <div class="card-body">
      <div class="row g-2">
        <div class="col-12 col-md-4">
          <div class="input-group">
            <span class="input-group-text bg-white"
              ><i class="fa-solid fa-magnifying-glass"></i></span
            ><input
              type="search"
              class="form-control"
              placeholder="Search by title or notes"
              v-model="selectedTextQuery"
            />
          </div>
        </div>
        <div class="col-6 col-md-3">
          <label for="fPlace" class="visually-hidden">Place</label>
          <v-select
            :options="placesOptions"
            placeholder="All Places"
            v-model="selectedPlaces"
          ></v-select>
        </div>
        <div class="col-6 col-md-auto ms-auto text-end">
          <button
            type="reset"
            class="btn btn-outline-secondary px-5"
            aria-label="Clear filters"
            @click="clearFilters"
          >
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Memories grid -->
  <div class="card-responsive" v-if="filterMemory.length > 0">
    <div class="row g-3">
      <div
        class="col-md-6 col-xl-4"
        v-for="(memory, index) in filterMemory"
        :key="index"
      >
        <article class="card h-100 shadow-sm">
          <div
            class="d-flex justify-content-between align-items-center px-3 py-2 rounded-top"
            style="background: #e0577a; color: #fff"
          >
            <span class="fw-semibold">{{ memory.places?.name }}</span>
            <span class="badge text-bg-light border text-body">{{
              formattedDate(memory.date)
            }}</span>
          </div>
          <div class="card-body">
            <h2 class="h5 mb-1">{{ memory.title }}</h2>
            <p class="fst-italic text-muted mb-2 t-truncate">
              {{ memory.caption }}
            </p>
            <p class="small mb-0 text-break t-truncate">
              {{ memory.notes }}
            </p>
          </div>
          <div
            class="card-footer bg-white d-flex flex-wrap justify-content-between align-items-center gap-2"
          >
            <a
              :href="memory.photo_link"
              class="btn btn-sm btn-outline-secondary"
              target="_blank"
              rel="noopener noreferrer"
              ><i class="fa-solid fa-camera"></i> Open
            </a>
            <div
              class="btn-group btn-group-sm"
              role="group"
              aria-label="Actions for Sunset at Café Terraza"
            >
              <button
                type="button"
                class="btn btn-outline-secondary"
                @click="openViewModal(memory)"
                aria-label="View Sunset at Café Terraza"
              >
                <i class="fa-solid fa-eye"></i>
              </button>
              <button
                type="button"
                class="btn btn-outline-secondary"
                @click="fetchMemoryData(memory)"
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

  <div class="text-center py-5" role="status" v-else>
    <div class="display-4">💕</div>
    <h2 class="h5 mt-3">No memories yet</h2>
    <p class="text-muted">
      After a date, save a few words and a link to your photos.
    </p>
  </div>

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
        <form @submit.prevent="handleFormSubmit">
          <div class="modal-header">
            <h4 class="modal-title">New Memory</h4>
            <button
              type="button"
              class="btn-close"
              @click="closeFormModal"
              aria-label="Close"
            ></button>
            <input type="hidden" v-model="memoriesForm.id" />
          </div>
          <div class="modal-body">
            <div class="row mb-3">
              <div class="col-md-8">
                <label for="">Title</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="e.g. Baybay Beach Walk"
                  v-model="memoriesForm.title"
                />
              </div>
              <div class="col-md-4">
                <label for="">Date</label>
                <input
                  type="date"
                  class="form-control"
                  v-model="memoriesForm.date"
                />
              </div>
            </div>
            <div class="form-group mb-3">
              <label for="">Place</label>
              <v-select
                :options="placesOptions"
                placeholder="Choose a visited place..."
                v-model="memoriesForm.place_id"
              ></v-select>
              <small>Only places marked as Visited should appear here. </small>
            </div>
            <div class="form-group mb-3">
              <label for="">Caption</label>
              <input
                type="text"
                class="form-control"
                v-model="memoriesForm.caption"
              />
            </div>
            <div class="form-group mb-3">
              <label for="">Notes</label>
              <textarea
                class="form-control"
                rows="3"
                placeholder="One line you'd say out loud..."
                v-model="memoriesForm.notes"
              ></textarea>
            </div>
            <div class="form-group mb-3">
              <label for="">Photo Link</label>
              <input
                type="text"
                class="form-control"
                placeholder="https://www.faceboo.com/..."
                v-model="memoriesForm.photo_link"
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
            <button type="submit" class="btn btn-rose">Save Memory</button>
          </div>
        </form>
      </div>
    </div>
  </div>

  <!-- View Modal -->
  <div
    class="modal fade"
    ref="memoriesViewModal"
    tabindex="-1"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
  >
    <div
      class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down"
    >
      <div class="modal-content">
        <div class="modal-header align-items-start">
          <div class="flex-grow-1 text-break">
            <span class="badge mb-1" style="background: #92400e"
              >☕ Café Terraza</span
            >
            <h2 class="modal-title h5 mb-0" id="viewModalLabel">
              Sunset at Café Terraza
            </h2>
            <small class="text-muted">October 5, 2026</small>
          </div>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <blockquote class="fst-italic text-muted border-start border-3 ps-3">
            “The whole city lit up below us.”
          </blockquote>
          <p class="text-break mb-0">
            We got the corner table, ordered too much, and stayed until the
            lights came on across the city.
          </p>
        </div>
        <div class="modal-footer d-grid d-sm-flex">
          <a
            href="#"
            class="btn btn-outline-secondary"
            target="_blank"
            rel="noopener noreferrer"
            >📷 Open on Facebook</a
          >
          <button
            type="button"
            class="btn btn-rose"
            data-bs-dismiss="modal"
            data-bs-toggle="modal"
            data-bs-target="#memoryModal"
          >
            ✏️ Edit
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
