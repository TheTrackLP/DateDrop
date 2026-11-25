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
  categoryFormMode.value = "create";
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

const loading = ref(false);

const totalCategories = ref(0);
const categoriesList = ref([]);
const fetchCategories = async () => {
  loading.value = true;
  try {
    const [categories, countCategory] = await Promise.all([
      supabase.from("categories").select("*").order("id", { ascending: true }),

      supabase.from("categories").select("*", { count: "exact", head: true }),
    ]);

    totalCategories.value = countCategory.count;
    categoriesList.value = categories.data;
  } catch (error) {
    Swal.fire({
      title: "Error",
      text: "Categories fetching error" + error.message,
      icon: "error",
      timer: 2000,
    });
  } finally {
    loading.value = false;
  }
};

onMounted(fetchCategories);

const fetchCategoryData = async (row) => {
  openFormModal(categoryFormModal);
  categoryFormMode.value = "edit";

  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("id", row.id)
    .single();

  categoryForm.value = data;
};

const submitCategoryForm = async () => {
  if (categoryFormMode.value === "create") {
    loading.value = true;
    try {
      categoryFormMode.value = "create";
      const { data, error } = await supabase
        .from("categories")
        .insert(categoryForm.value)
        .select()
        .single();

      if (error) throw error;
      Swal.fire({
        title: "Success",
        text: "Success, Category Added",
        icon: "success",
        timer: 1500,
      });
      closeFormModal();

      categoriesList.value.unshift(data);
      totalCategories.value++;
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    } finally {
      loading.value = false;
    }
  } else {
    try {
      categoryFormMode.value = "edit";

      const { error } = await supabase
        .from("categories")
        .update(categoryForm.value)
        .eq("id", categoryForm.value.id);

      if (error) throw error;
      Swal.fire({
        title: "Success",
        text: "Success, Category Updated",
        icon: "success",
        timer: 1500,
      });

      closeFormModal();
      await fetchCategories();
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    } finally {
      loading.value = false;
    }
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
        <strong class="text-body">{{ totalCategories }}</strong> categories in
        total.
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
            <h4 class="modal-title">
              {{ categoryFormMode === "create" ? "Add" : "Update" }} Category
            </h4>
            <input type="hidden" v-model="categoryForm.id" />
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
            <button class="btn btn-rose" type="submit">
              {{ categoryFormMode === "create" ? "Add" : "Update" }} Category
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
