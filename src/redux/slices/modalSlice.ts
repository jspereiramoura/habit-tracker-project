import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ModalProps = {
  title: string;
  open: boolean;
  description?: string;
};

const initialState: ModalProps = {
  title: "",
  open: false,
  description: ""
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal(state, { payload }: PayloadAction<ModalProps>) {
      state.open = true;
      state.title = payload.title;
      state.description = payload.description;
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
