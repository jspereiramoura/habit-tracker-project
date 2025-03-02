"use client";
import { useAppSelector } from "../../../redux/store";
import { modalBodyMap } from "./templates";

const Modal = () => {
  const { open, title, description, modalType } = useAppSelector(
    state => state.modal
  );
  return open ? (
    <div className="z-10 bg-overlay w-dvw h-dvh flex items-center fixed inset-0">
      <dialog
        open={open}
        aria-modal="true"
        aria-labelledby="dialog__label"
        aria-describedby={description ? "dialog__description" : undefined}
        className="mx-auto min-w-[280px] max-w-[320px] p-5 rounded-lg flex flex-col bg-white items-center"
      >
        <h2
          id="dialog__label"
          className="text-lg font-bold font-montserrat mb-2"
        >
          {title}
        </h2>
        {description && <p id="dialog__description">{description}</p>}
        {modalBodyMap[modalType]}
      </dialog>
    </div>
  ) : null;
};

export default Modal;
