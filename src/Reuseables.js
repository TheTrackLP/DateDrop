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

export const formattedDate = (dateFormate) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateFormate).toLocaleDateString("en-US", options);
};
