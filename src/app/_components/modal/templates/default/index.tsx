import { closeModal } from "../../../../../redux/slices/modalSlice";
import { useAppDispatch } from "../../../../../redux/store";
import Button from "../../../button";

export default function DefaultModalBody() {
  const dispatch = useAppDispatch();

  return (
    <Button
      onClick={() => dispatch(closeModal())}
      className="w-full mt-6 bg-black! h-10! leading-10!"
    >
      Fechar Modal
    </Button>
  );
}
