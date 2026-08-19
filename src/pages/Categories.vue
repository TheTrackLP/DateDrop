<script setup>
import { supabase } from "@/lib/supabase";
import Swal from "sweetalert2";

import { Modal } from "bootstrap";
import { computed, nextTick, onMounted, ref } from "vue";

const slugify = (value) => {
  return value
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");
};

const categoryFormMode = ref("create");
const modalRef = ref(null);
let modalInstance = null;
const openCategoryFormModal = () => {
  nextTick(() => {
    modalInstance = new Modal(modalRef.value);
    modalInstance.show();
  });
};

const openCategoryForm = () => {
  categoryFormMode.value = "create";
  openCategoryFormModal();
};

const closeProductModalForm = () => {
  modalInstance?.hide();
};

const categoryForm = ref({
  name: "",
  emoji: "",
  color: "#000000",
});

async function submitCategory() {
  if (categoryFormMode.value === "create") {
    categoryFormMode.value = "create";

    const { data, error } = await supabase.from("category").insert({
      name: categoryForm.value.name,
      slug: slugify(categoryForm.value.name),
      emoji: categoryForm.value.emoji,
      color: categoryForm.value.color,
    });

    if (error) {
      const resultError = await Swal.fire({
        title: "Error!",
        text: "Error, Try Again inserting into Forms!",
        icon: "error",
        timer: 1500,
        showConfirmButton: false,
      });
      return;
    }

    const resultSuccess = await Swal.fire({
      title: "Success!",
      text: "Success, Category Added!",
      icon: "success",
      timer: 1250,
      showConfirmButton: false,
    });

    categoryFormMode.value = "create";
    categoryForm.value = {
      name: "",
      emoji: "",
      color: "#000000",
    };
    closeProductModalForm();
  } else {
    categoryFormMode.value = "edit";

    const { data, error } = await supabase
      .from("category")
      .update({
        name: categoryForm.value.name,
        slug: slugify(categoryForm.value.name),
        emoji: categoryForm.value.emoji,
        color: categoryForm.value.color,
      })
      .eq("id", categoryForm.value.id);

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
      text: "Success, Category Updated!",
      icon: "success",
      timer: 1250,
      showConfirmButton: false,
    });

    categoryFormMode.value = "create";
    categoryForm.value = {
      name: "",
      emoji: "",
      color: "#000000",
    };
    closeProductModalForm();
  }
}

const countCategories = ref(null);
const categoryLists = ref([]);
async function fetchCategoryLists() {
  const { data, error } = await supabase.from("category").select("*");
  categoryLists.value = data;

  const { count } = await supabase
    .from("category")
    .select("*", { count: "exact", head: true });
  countCategories.value = count;
}
onMounted(fetchCategoryLists);

async function fetchCategory(row) {
  openCategoryForm();
  categoryFormMode.value = "edit";

  const { data, error } = await supabase
    .from("category")
    .select("*")
    .eq("id", row.id)
    .single();
  categoryForm.value = data;
}
</script>
<style scoped>
.card {
  border-radius: 15px;
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
.cat-swatch {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  flex: 0 0 auto;
}
</style>

<template>
  <div class="content-body">
    <div class="mb-4">
      <button class="btn btn-coral float-end" @click="openCategoryForm">
        <i class="fa-solid fa-plus"></i> Add Category
      </button>
      <h4 class="fw-bold mb-0">Categories</h4>
      <p class="text-muted small mb-0">
        {{ countCategories }} categories · used to tag and filter your saved
        spots
      </p>
    </div>
    <hr />
    <div class="row">
      <div class="col-md-4 g-3 mb-1" v-for="(row, index) in categoryLists">
        <div class="card" @click="fetchCategory(row)">
          <div class="card-body">
            <div class="input-group">
              <a
                href="#"
                class="list-group-item list-group-item-action d-flex gap-3 align-items-center"
              >
                <div class="cat-swatch" style="background: #fef6e7">
                  {{ row.emoji }}
                </div>
                <div>
                  <div class="fw-semibold">{{ row.name }}</div>
                  <p class="text-muted">4 places</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="modal fade" ref="modalRef" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <form @submit.prevent="submitCategory">
          <div class="modal-header">
            <h3>
              {{
                categoryFormMode === "create"
                  ? "Add Category"
                  : "Change Category"
              }}
            </h3>
          </div>
          <div class="modal-body">
            <div class="container-fluid">
              <input type="hidden" v-model="categoryForm.id" />
              <div class="form-group">
                <label for="">Name</label>
                <input
                  type="text"
                  class="form-control mb-4"
                  placeholder="e.g. Fast Foods"
                  v-model="categoryForm.name"
                />
              </div>
              <div class="form-group mb-4">
                <label for="">Emoji</label>
                <div class="input-group mb-3">
                  <span class="input-group-text" id="basic-addon1">😃</span>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="e.g. 😃"
                    v-model="categoryForm.emoji"
                  />
                </div>
              </div>
              <div class="form-group">
                <label for="">Color</label>
                <input
                  type="color"
                  class="form-control mb-4"
                  v-model="categoryForm.color"
                />
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-danger">Delete</button>
            <button class="btn btn-secondary" @click="closeProductModalForm">
              Close
            </button>
            <button type="submit" class="btn btn-coral">
              {{
                categoryForm.processing
                  ? "Saving..."
                  : categoryFormMode === "create"
                    ? "Add Category"
                    : "Save Changes"
              }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
