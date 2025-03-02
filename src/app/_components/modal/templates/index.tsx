import { ReactNode } from "react";
import AddHabitModalBody from "./addHabitModalBody";
import DefaultModalBody from "./default";

export enum ModalBodyTypes {
  DEFAULT = 1,
  ADD_HABIT = 2
}

export const modalBodyMap: Record<ModalBodyTypes, ReactNode> = {
  [ModalBodyTypes.DEFAULT]: <DefaultModalBody />,
  [ModalBodyTypes.ADD_HABIT]: <AddHabitModalBody />
};
