import { useState } from "react";
import Checkbox from "../../../../_components/checkbox";
import TrashIcon from "../../../../_components/icons/TrashIcon";

type HabitCardProps = {
  name: string;
  tags: string[];
  completed: boolean;
  className?: string;
  onDelete?: () => void;
  onChangeStatus?: (completed: boolean) => void;
};

// TODO: Adicionar a funcionalidade de editar tags

const HabitCard = ({
  name,
  tags,
  completed = false,
  className,
  onDelete,
  onChangeStatus
}: HabitCardProps) => {
  const [currentTags] = useState(tags);
  const [isCompleted, setIsCompleted] = useState(completed);

  const handleChangeStatus = (status: boolean) => {
    setIsCompleted(status);
    onChangeStatus?.(status);
  };

  return (
    <label
      htmlFor={name}
      className={`
        ${className ?? ""}
        flex items-center gap-8 p-4 rounded-lg bg-gray-50
        cursor-pointer hover:shadow-md select-none focus:outline-primary
     `}
      tabIndex={0}
      aria-checked={isCompleted}
      onKeyDown={({ key, currentTarget }) => {
        if (key === "Enter" && document.activeElement === currentTarget)
          handleChangeStatus(!isCompleted);
      }}
    >
      <Checkbox
        id={name}
        tabIndex={-1}
        checked={isCompleted}
        aria-labelledby={`${name}-label`}
        onChange={({ target }) => handleChangeStatus(target.checked)}
      />
      <div className="flex flex-col gap-1">
        <h2 id={`${name}-label`} className="text-lg">
          {name}
        </h2>
        <ul aria-live="polite" className="flex space-x-2">
          {currentTags.map(tag => (
            <li
              key={tag}
              aria-label={`Tag: ${tag}`}
              className="text-xs p-1 rounded-sm bg-red-100 text-primary font-mono"
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
      <section aria-label={`Ações do Hábito ${name}`} className="ml-auto">
        <button
          onClick={onDelete}
          className="cursor-pointer group"
          aria-label={`Deletar Hábito ${name}`}
        >
          <TrashIcon
            aria-hidden
            className="text-primary size-6 hover:text-primary--hovered hover:stroke-2"
          />
        </button>
      </section>
    </label>
  );
};

export default HabitCard;
