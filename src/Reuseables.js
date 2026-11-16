import { Modal } from "bootstrap";
import { nextTick } from "vue";

let modalInstance = null;
export const openModal = (modalRef) => {
  if (!modalRef) return;
  nextTick(() => {
    modalInstance = new Modal(modalRef.value);
    modalInstance.show();
  });
};

export const closeModal = (modalRef) => {
  nextTick(() => {
    if (!modalRef) return;
    modalInstance?.hide();
  });
};
