import { ReactNode } from "react";
import NextItemIcon from "../../../../_components/icons/NextItemIcon";
import PreviousItemIcon from "../../../../_components/icons/PreviousItemIcon";
import AddIcon from "../../../../_components/icons/AddIcon";
import Tooltip from "../../../../_components/tooltip";

const Button = ({
  children,
  onClick,
  supportText,
  disabled
}: {
  onClick?: VoidFunction;
  supportText: string;
  children: React.ReactNode;
  disabled?: boolean;
}) => (
  <Tooltip text={supportText}>
    <button
      onClick={onClick}
      aria-label={supportText}
      className="group p-1 rounded-lg bg-primary text-white cursor-pointer hover:bg-primary--hovered relative disabled:bg-gray-300 disabled:cursor-auto"
      disabled={disabled}
    >
      {children}
    </button>
  </Tooltip>
);

type Direction = "NEXT" | "PREVIOUS";

export default function ChangeDateControls({
  className,
  currentDate,
  onChangeDate,
  addNewHabit
}: {
  className?: string;
  currentDate: Date;
  onChangeDate: (newDate: Date) => void;
  addNewHabit?: VoidFunction;
}) {
  const buttonIcons: Record<Direction, ReactNode> = {
    NEXT: <NextItemIcon />,
    PREVIOUS: <PreviousItemIcon />
  };

  const handleChangeDate = (direction: Direction) => {
    const parsedDirection = direction === "NEXT" ? 1 : -1;

    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + parsedDirection);

    onChangeDate(newDate);
  };

  return (
    <section
      aria-label="Controles de Hábitos"
      className={`flex gap-1 ${className}`}
    >
      <Button
        onClick={() => handleChangeDate("PREVIOUS")}
        supportText="Ir para o dia anterior"
      >
        {buttonIcons.PREVIOUS}
      </Button>
      <Button onClick={addNewHabit} supportText="Adicionar novo hábito">
        <AddIcon />
      </Button>
      <Button
        supportText="Ir para o próximo dia"
        onClick={() => {
          handleChangeDate("NEXT");
        }}
        disabled={currentDate.getDate() >= new Date().getDate()}
      >
        {buttonIcons.NEXT}
      </Button>
    </section>
  );
}
