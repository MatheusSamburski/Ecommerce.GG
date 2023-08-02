export const OPEN_MODAL = "OPEN_MODAL";
export const CLOSE_MODAL = "CLOSE_MODAL";
export const OPEN_MODAL_CART = "OPEN_MODAL_CART";
export const CLOSE_MODAL_CART = "CLOSE_MODAL_CART";

export const openModal = () => ({
  type: OPEN_MODAL,
});

export const closeModal = () => ({
  type: CLOSE_MODAL,
});

export const openModalCart = () => ({
  type: OPEN_MODAL_CART,
});

export const closeModalCart = () => ({
  type: CLOSE_MODAL_CART,
});
