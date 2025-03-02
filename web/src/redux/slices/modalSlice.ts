import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ModalBodyTypes } from "../../app/_components/modal/enum";

export type ModalProps = {
  title: string;
  open: boolean;
  description?: string;
  modalType: ModalBodyTypes;
};

const initialState: ModalProps = {
  title: "",
  open: false,
  description: "",
  modalType: ModalBodyTypes.DEFAULT
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal(
      state,
      {
        payload
      }: PayloadAction<
        Omit<ModalProps, "open" | "modalType"> & { modalType?: ModalBodyTypes }
      >
    ) {
      state.open = true;
      state.title = payload.title;
      state.description = payload.description;
      state.modalType = payload.modalType ?? ModalBodyTypes.DEFAULT;
    },
    closeModal(state) {
      state.open = false;
    },
    resetModal() {
      return initialState;
    }
  }
});

export const { closeModal, openModal, resetModal } = modalSlice.actions;
export default modalSlice.reducer;
