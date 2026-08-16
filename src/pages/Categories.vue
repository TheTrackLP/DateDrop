<script setup>
import { Modal } from "bootstrap";
import { nextTick, ref } from "vue";

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
</style>

<template>
  <div class="content-body">
    <div class="mb-4">
      <button class="btn btn-coral float-end" @click="openCategoryForm">
        <i class="fa-solid fa-plus"></i> Add Category
      </button>
      <h4 class="fw-bold mb-0">Categories</h4>
      <p class="text-muted small mb-0">
        6 categories · used to tag and filter your saved spots
      </p>
    </div>
    <hr />
    <div class="row">
      <div class="col-md-4 g-3 mb-1" v-for="value in 10">
        <div class="card">
          <div class="card-body">
            <div class="input-group">
              <a
                href="#"
                class="list-group-item list-group-item-action d-flex gap-3 align-items-center"
              >
                <img
                  src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=100&h=100&fit=crop"
                  class="rounded"
                  width="56"
                  height="56"
                />
                <div>
                  <div class="fw-semibold">Bohol Bee Farm Resort</div>
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
        <div class="modal-header"><h3>Add Category</h3></div>
        <div class="modal-body">
          <div class="container-fluid">
            <div class="form-group">
              <label for="">Name</label>
              <input
                type="text"
                class="form-control mb-4"
                placeholder="e.g. Fast Foods"
              />
            </div>
            <div class="form-group mb-4">
              <label for="">Emoji</label>
              <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1">😃</span>
                <input type="text" class="form-control" placeholder="e.g. 😃" />
              </div>
            </div>
            <div class="form-group">
              <label for="">Color</label>
              <input
                type="color"
                class="form-control mb-4"
                placeholder="e.g. 😃"
              />
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-danger">Delete</button>
          <button class="btn btn-secondary" @click="closeProductModalForm">
            Close
          </button>
          <button class="btn btn-coral">Save Category</button>
        </div>
      </div>
    </div>
  </div>
</template>
