"use client";
import Modal from ".";
import { closeModal } from "../../../redux/slices/modalSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/store";

const ModalContainer = () => {
  const { open, title, description } = useAppSelector(state => state.modal);
  const dispatch = useAppDispatch();

  return open ? (
    <Modal
      open={open}
      title={title}
      handleCloseModal={() => {
        dispatch(closeModal());
      }}
      description={description}
    />
  ) : null;
};

export default ModalContainer;
