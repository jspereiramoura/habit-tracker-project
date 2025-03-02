import { ModalProps } from "../../../redux/slices/modalSlice";
import Button from "../button";

const Modal = ({
  title,
  description,
  open,
  handleCloseModal
}: ModalProps & { handleCloseModal: VoidFunction }) => {
  return (
    <div className="z-10 bg-overlay w-dvw h-dvh flex items-center fixed inset-0">
      <dialog
        open={open}
        aria-modal="true"
        aria-labelledby="dialog__label"
        aria-describedby={description ? "dialog__description" : undefined}
        className="mx-auto min-w-[280px] p-5 rounded-lg flex flex-col bg-white items-center"
      >
        <h2 id="dialog__label" className="text-lg font-bold font-montserrat mb-2">
          {title}
        </h2>
        {description && <p id="dialog__description">{description}</p>}
        <Button
          onClick={handleCloseModal}
          className="w-full mt-6 bg-black! h-10! leading-10!"
        >
          Fechar Modal
        </Button>
      </dialog>
    </div>
  );
};

export default Modal;
