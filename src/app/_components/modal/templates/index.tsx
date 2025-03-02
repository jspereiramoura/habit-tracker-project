import { ReactNode } from "react";
import { ModalBodyTypes } from "../enum";
import AddHabitModalBody from "./addHabitModalBody";
import DefaultModalBody from "./default";

export const modalBodyMap: Record<ModalBodyTypes, ReactNode> = {
  [ModalBodyTypes.DEFAULT]: <DefaultModalBody />,
  [ModalBodyTypes.ADD_HABIT]: <AddHabitModalBody />
};
