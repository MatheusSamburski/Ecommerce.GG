import { ModalState } from "@/types/Modal";
import {
  OPEN_MODAL,
  CLOSE_MODAL,
  OPEN_MODAL_CART,
  CLOSE_MODAL_CART,
} from "../actions/actions";

const initialState: ModalState = {
  isModalOpen: false,
  isModalCartOpen: false
};

const modalReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case OPEN_MODAL:
      return {
        ...state,
        isModalOpen: true,
      };
    case CLOSE_MODAL:
      return {
        ...state,
        isModalOpen: false,
      };
    case OPEN_MODAL_CART:
      return {
        ...state,
        isModalCartOpen: true,
      };
    case CLOSE_MODAL_CART:
      return {
        ...state,
        isModalCartOpen: false,
      };
    default:
      return state;
  }
};

export default modalReducer;
