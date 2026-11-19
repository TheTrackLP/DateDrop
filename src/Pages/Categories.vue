<script setup>
import { supabase } from "@/Lib/supabase";
import { closeModal, openModal } from "@/Reuseables";
import { computed, onMounted, ref } from "vue";
import Swal from "sweetalert2";

const categoryFormModal = ref(null);
const categoryFormMode = ref("create");
const categoryForm = ref({
  name: "",
  icon: "",
  color: "",
  description: "",
});

const openFormModal = () => {
  openModal(categoryFormModal);
};

const closeFormModal = () => {
  closeModal(categoryFormModal);
  categoryForm.value = {
    name: "",
    icon: "",
    color: "",
    description: "",
    status: "",
  };
};

const categoriesList = ref([]);
const fetchCategories = async () => {
  const { data: categories, error } = await supabase
    .from("categories")
    .select("*");
  categoriesList.value = categories;
};

onMounted(fetchCategories);

const fetchCategoryData = async (row) => {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("id", row.id)
    .single();

  openFormModal(categoryFormModal);
  categoryForm.value = data;
  categoryFormMode.value = "edit";
};

const submitCategoryForm = async () => {
  if (categoryFormMode.value === "create") {
    categoryFormMode.value = "create";
    const { error } = await supabase.from("categories").insert({
      name: categoryForm.value.name,
      icon: categoryForm.value.icon,
      color: categoryForm.value.color,
      description: categoryForm.value.description,
      status: 1,
    });

    if (error) {
      Swal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
        timer: 2000,
      });
    }

    closeFormModal();
    await fetchCategories();

    Swal.fire({
      title: "Success",
      text: "Success, Category Added",
      icon: "success",
      timer: 2000,
    });
  } else {
    categoryFormMode.value = "edit";

    const { error } = await supabase
      .from("categories")
      .update({
        name: categoryForm.value.name,
        icon: categoryForm.value.icon,
        color: categoryForm.value.color,
        description: categoryForm.value.description,
      })
      .eq("id", categoryForm.value.id);

    if (error) {
      Swal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
        timer: 2000,
      });
    }

    closeFormModal();
    await fetchCategories();

    Swal.fire({
      title: "Success",
      text: "Success, Category Updated",
      icon: "success",
      timer: 2000,
    });
  }
};

const selectedText = ref("");
const filterText = computed(() => {
  const textQuery = selectedText.value.toLowerCase().trim();
  return categoriesList.value.filter((cat) => {
    const matchText = !textQuery || cat.name.toLowerCase().includes(textQuery);

    return matchText;
  });
});

const changedStatus = async (row) => {
  const newStatus = !row.status;

  const { error } = await supabase
    .from("categories")
    .update({ status: newStatus })
    .eq("id", row.id);

  row.status = newStatus;

  Swal.fire({
    title: "Success!",
    text: "Category Status Changed",
    icon: "success",
    timer: 1500,
    showConfirmButton: false,
  });
};
</script>

<style>
.table-responsive {
  height: 650px;
  overflow: auto;
}
.table-responsive th {
  position: sticky;
  top: 0;
}

.text-truncate-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>

<template>
  <div
    class="d-flex flex-wrap justify-content-between align-items-start gap-3 mb-4"
  >
    <div>
      <h1 class="h3 mb-1">Categories</h1>
      <p class="text-muted mb-0">
        Organize your places by type.
        <strong class="text-body">6</strong> categories in total.
      </p>
    </div>
    <button type="button" class="btn btn-rose" @click="openFormModal">
      <i class="fa-solid fa-plus"></i> Add category
    </button>
  </div>

  <div class="card shadow-sm">
    <div class="card-body">
      <div class="g-2 mb-3">
        <label for="fSearch" class="visually-hidden">Search categories</label>
        <div class="input-group">
          <span class="input-group-text bg-white"
            ><i class="fa-solid fa-magnifying-glass"></i></span
          ><input
            type="search"
            v-model="selectedText"
            class="form-control"
            placeholder="Search categories"
          />
        </div>
      </div>

      <div class="table-responsive" v-if="filterText.length > 0">
        <table class="table table-hover align-middle mb-0">
          <thead class="table-info">
            <tr>
              <th>Category</th>
              <th class="d-none d-md-table-cell">Description</th>
              <th>Used by</th>
              <th class="d-none d-sm-table-cell">Color</th>
              <th class="text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, index) in filterText" :key="index">
              <td>
                <div class="d-flex align-items-center gap-3">
                  <span
                    class="rounded text-white d-inline-flex align-items-center justify-content-center"
                    style="width: 40px; height: 40px"
                    :style="{ backgroundColor: row.color }"
                    >{{ row.icon }}</span
                  ><span class="fw-semibold">{{ row.name }}</span>
                </div>
              </td>
              <td class="d-none d-md-table-cell text-muted text-truncate-1">
                {{ row.description }}
              </td>
              <td>
                <span class="badge rounded-pill text-bg-light border"
                  >1 place</span
                >
              </td>
              <td class="d-none d-sm-table-cell">
                <span class="badge" :style="{ backgroundColor: row.color }">{{
                  row.name
                }}</span>
              </td>
              <td class="text-end text-nowrap">
                <div
                  class="btn-group btn-group-sm"
                  role="group"
                  aria-label="Actions for Beach"
                >
                  <button
                    type="button"
                    class="btn btn-outline-secondary"
                    @click="fetchCategoryData(row)"
                  >
                    <i class="fa-solid fa-pencil"></i>
                  </button>

                  <button
                    type="button"
                    class="btn btn-outline-success"
                    @click="changedStatus(row)"
                    v-if="row.status === true"
                  >
                    <i class="fa-solid fa-toggle-on"></i>
                  </button>
                  <button
                    type="button"
                    class="btn btn-outline-danger"
                    @click="changedStatus(row)"
                    v-else-if="row.status === false"
                  >
                    <i class="fa-solid fa-toggle-off"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="text-center py-5" role="status" v-else>
        <i class="bi bi-tags fs-1 text-muted"></i>
        <h2 class="h5 mt-3">No categories yet</h2>
        <p class="text-muted">
          Create a category to start grouping your places.
        </p>
      </div>
    </div>
  </div>

  <div
    class="modal fade"
    ref="categoryFormModal"
    tabindex="-1"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <form @submit.prevent="submitCategoryForm">
          <div class="modal-header">
            <h4 class="modal-title">Add Category</h4>
            <input type="text" v-model="categoryForm.id" />
          </div>
          <div class="modal-body">
            <div class="form-group mb-3">
              <label for="">Name</label>
              <input
                type="text"
                v-model="categoryForm.name"
                class="form-control"
              />
            </div>
            <div class="row">
              <div class="col-md-6 mb-3">
                <label for="">Icon</label>
                <input
                  type="text"
                  v-model="categoryForm.icon"
                  class="form-control"
                />
              </div>
              <div class="col-md-6 mb-3">
                <label for="">Color</label>
                <input
                  type="color"
                  v-model="categoryForm.color"
                  class="form-control"
                />
              </div>
            </div>
            <div class="form-group mb-3">
              <label for="">Description</label>
              <textarea
                v-model="categoryForm.description"
                class="form-control"
                rows="5"
              ></textarea>
            </div>
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-outline-secondary"
              type="button"
              @click="closeFormModal"
            >
              Cancel
            </button>
            <button class="btn btn-rose" type="submit">Add Category</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
